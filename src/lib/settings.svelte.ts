export class Settings {
	firebaseConfig: string = $state("");

	toJSON(): object {
		return {
			firebaseConfig: this.firebaseConfig
		};
	}
	fromJSON(obj: any) {
		if (obj == null) return;
		if (obj.firebaseConfig != undefined) this.firebaseConfig = obj.firebaseConfig;
	}
}

const settings: Settings = $state(new Settings());
export default settings;
