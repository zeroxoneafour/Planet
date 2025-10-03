export class Plan {
	name: string = $state("");
	description: string = $state("");

	checkedOff: boolean = $state(false);
	timed: boolean = $state(false);
	exactTime: boolean = $state(false);
	date: Date = $state(new Date());
	endDate: Date | null = $state(null);

	completed: boolean = $derived.by(() => {
		if (this.checkedOff || !this.timed) return this.checkedOff;
		else if (this.endDate == null) return this.date.getDate() > Date.now();
		else return this.endDate.getDate() > Date.now();
	});

	toJSON(): object {
		return {
			name: this.name,
			checkedOff: this.checkedOff,
			timed: this.timed,
			exactTime: this.exactTime,
			date: this.date,
			endDate: this.endDate
		};
	}

	fromJSON(json: any): Plan {
		if (json.name !== undefined) this.name = json.name;
		if (json.checkedOff !== undefined) this.checkedOff = json.checkedOff;
		if (json.timed !== undefined) this.timed = json.timed;
		if (json.exactTime !== undefined) this.exactTime = json.exactTime;
		if (json.date !== undefined) this.date = json.date;
		if (json.endDate !== undefined) this.endDate = json.endDate;
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
