export class Settings {
	firebaseConfig: string = $state("");

	plannerDisplayedDays: number = $state(7);

	toJSON(): object {
		return {
			firebaseConfig: this.firebaseConfig,
			plannerDisplayedDays: this.plannerDisplayedDays
		};
	}
	fromJSON(obj: any) {
		if (obj == null) return;
		if (obj.firebaseConfig != undefined) this.firebaseConfig = obj.firebaseConfig;
		if (obj.plannerDisplayedDays != undefined) this.plannerDisplayedDays = obj.plannerDisplayedDays;
	}
}

const settings: Settings = $state(new Settings());
export default settings;
