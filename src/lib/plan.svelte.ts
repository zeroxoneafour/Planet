import { SvelteDate } from "svelte/reactivity";

export enum PlanPriority {
	Normal = 0,
	High,
	Low
}

export const planPriorityOrder = [
	{ priority: PlanPriority.High, color: "", name: "High Priority" },
	{ priority: PlanPriority.Normal, color: "", name: "Normal Priority" },
	{ priority: PlanPriority.Low, color: "", name: "Low Priority" }
];

export type PlanJson = {
	name: string;
	description: string;
	priority: number;

	checkedOff: boolean;

	exactTime: boolean;
	date: number;
};

export class Plan {
	name: string = $state("");
	description: string = $state("");
	priority: PlanPriority = $state(PlanPriority.Normal);

	checkedOff: boolean = $state(false);

	exactTime: boolean = $state(false);
	date: Date = new SvelteDate();

	constructor(j?: PlanJson | null | undefined) {
		if (j == null) return;
		if (j.name !== undefined) this.name = j.name;
		if (j.description !== undefined) this.description = j.description;
		if (j.priority !== undefined) this.priority = j.priority;
		if (j.checkedOff !== undefined) this.checkedOff = j.checkedOff;
		if (j.exactTime !== undefined) this.exactTime = j.exactTime;
		if (j.date !== undefined) this.date.setTime(j.date);
	}

	toJSON(): PlanJson {
		return {
			name: this.name,
			description: this.description,
			priority: this.priority,
			checkedOff: this.checkedOff,
			exactTime: this.exactTime,
			date: this.date.getTime()
		};
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
	const ret: Plan[] = (JSON.parse(json) as PlanJson[]).map((x) => new Plan(x));
	plans.splice(0, plans.length, ...ret);
}

export function writePlans() {
	localStorage.setItem("planet_timestamp", Date.now().toString());
	localStorage.setItem("planet_plans", JSON.stringify(plans));
}
