export class Plan {
	name: string = $state("");
	description: string = $state("");

	checkedOff: boolean = $state(false);
	exactTime: boolean = $state(false);
	date: Date = $state(new Date());

	toJSON(): object {
		return {
			name: this.name,
			description: this.description,
			checkedOff: this.checkedOff,
			exactTime: this.exactTime,
			date: this.date
		};
	}

	fromJSON(json: any): Plan {
		if (json.name !== undefined) this.name = json.name;
		if (json.description !== undefined) this.description = json.description;
		if (json.checkedOff !== undefined) this.checkedOff = json.checkedOff;
		if (json.exactTime !== undefined) this.exactTime = json.exactTime;
		if (json.date !== undefined) this.date = new Date(json.date);
		return this;
	}
}

export const plans: Plan[] = $state([]);

export function readPlans(x?: Plan[]) {
	if (x != undefined) {
		plans.splice(0, plans.length, ...x);
		return;
	}
	const json = localStorage.getItem("planet_plans");
	if (json == undefined) return;
	const ret: Plan[] = (JSON.parse(json) as any[]).map((x) => new Plan().fromJSON(x));
	plans.splice(0, plans.length, ...ret);
}

export function writePlans() {
	localStorage.setItem("planet_timestamp", Date.now().toString());
	localStorage.setItem("planet_plans", JSON.stringify(plans));
}
