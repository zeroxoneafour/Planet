import { initializeApp, type FirebaseApp } from "firebase/app";
import {
	browserLocalPersistence,
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	setPersistence,
	signInWithEmailAndPassword,
	type Auth,
	type User
} from "firebase/auth";
import {
	getDatabase,
	ref as dbRef,
	update as dbUpdate,
	get as dbGet,
	set as dbSet,
	Database
} from "firebase/database";
import { Settings } from "./settings.svelte";
import { Plan } from "./plan.svelte";

export interface SyncData {
	plans?: Plan[];
	settings?: Settings;
}

function syncDataToJSON(data: SyncData): any {
	let object: any = { timestamp: Date.now() };
	if (data.plans) object.plans = data.plans?.map((x) => x.toJSON());
	if (data.settings) object.settings = data.settings?.toJSON();
	return object;
}

class FirebaseManager {
	app: FirebaseApp | null = $state(null);
	auth: Auth | null = $state(null);
	database: Database | null = $state(null);
	user: User | null = $state(null);
	dbPath = $derived(this.user ? "planet/" + this.user.uid : "");

	loadDataFunction: (() => void) | null = null;

	initializeFirebase(config: string) {
		if (config == "") return;
		try {
			let a = JSON.parse(config);
			this.app = initializeApp(a);
		} catch (e) {
			return;
		}

		this.auth = getAuth(this.app);
		onAuthStateChanged(this.auth, (user) => {
			this.user = user;
			if (this.user != null && this.loadDataFunction != null) this.loadDataFunction();
			loadData();
		});

		this.database = getDatabase(this.app);
	}

	async logInOrSignUp(email: string, password: string) {
		if (!this.auth) return false;
		setPersistence(this.auth, browserLocalPersistence);
		try {
			await signInWithEmailAndPassword(this.auth, email, password);
		} catch (e) {
			try {
				await createUserWithEmailAndPassword(this.auth, email, password);
			} catch (e) {}
		}
	}

	async logOut() {
		if (this.auth == null) return;
		this.auth.signOut();
		this.user = null;
	}

	async saveData(data: any, overrideCloud = false) {
		if (this.user == null || this.auth == null || this.database == null) return;
		let ref = dbRef(this.database, this.dbPath);
		if (overrideCloud) {
			await dbSet(ref, data);
		} else {
			await dbUpdate(ref, data);
		}
	}

	async loadData(): Promise<any> {
		if (this.user == null || this.auth == null || this.database == null) return null;
		return (await dbGet(dbRef(this.database, this.dbPath))).val();
	}
}

export function saveData(inData: SyncData, overrideCloud = false) {
	let data = syncDataToJSON(inData);
	if (data.settings) {
		localStorage.setItem("planet_settings", JSON.stringify(data.settings));
	}
	if (data.plans) {
		localStorage.setItem("planet_plans", JSON.stringify(data.plans));
	}
	localStorage.setItem("planet_timestamp", JSON.stringify(data.timestamp));
	firebaseManager.saveData(data, overrideCloud);
}

export async function loadData(ignoreTimestamp = false): Promise<any> {
	let ret: any = {};
	try {
		ret.timestamp = JSON.parse(localStorage.getItem("planet_timestamp")!);
		ret.settings = JSON.parse(localStorage.getItem("planet_settings")!);
		ret.plans = JSON.parse(localStorage.getItem("planet_plans")!);
	} catch (_) {}
	let cloudData = await firebaseManager.loadData();
	if (cloudData != null && (ignoreTimestamp || cloudData.timestamp > ret.timestamp))
		return cloudData;
	return ret;
}

const firebaseManager = $state(new FirebaseManager());
export default firebaseManager;
