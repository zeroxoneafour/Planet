export class Settings {
	firebaseConfig: string = $state("");

	plannerDisplayedDays: number = $state(7);
	plannerNoTimeOver: boolean = $state(false);

	toJSON(): object {
		return {
			firebaseConfig: this.firebaseConfig,
			plannerDisplayedDays: this.plannerDisplayedDays,
			plannerNoTimeOver: this.plannerNoTimeOver
		};
	}
	fromJSON(obj: any) {
		if (obj == null) return;
		if (obj.firebaseConfig != undefined) this.firebaseConfig = obj.firebaseConfig;
		if (obj.plannerDisplayedDays != undefined) this.plannerDisplayedDays = obj.plannerDisplayedDays;
		if (obj.plannerNoTimeOver != undefined) this.plannerNoTimeOver = obj.plannerNoTimeOver;
	}
}

const settings: Settings = $state(new Settings());
export default settings;
