import { loadAndSetData } from "$lib";
import firebaseManager from "$lib/sync.svelte";

export const prerender = true;
export const trailingSlash = "always";
export const ssr = false;

// get firebase config first
let firebaseConfig = JSON.parse(
	localStorage.getItem("planet_settings") ?? '{"firebaseConfig": ""}'
).firebaseConfig;
if (firebaseConfig != null) firebaseManager.initializeFirebase(firebaseConfig);

firebaseManager.loadDataFunction = loadAndSetData;
loadAndSetData();
