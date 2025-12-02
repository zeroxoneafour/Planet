import { SvelteDate, SvelteMap } from "svelte/reactivity";
import { Plan, type PlanJson } from "./plan.svelte";
import { beginningOfDay } from "./datetime";

export interface DayJson {
	date: number;
	plans: PlanJson[];
}

export class Day {
	date: Date = new SvelteDate(beginningOfDay(new Date()));
	plans: Plan[] = $state([]);
	constructor(j?: DayJson | undefined | null) {
		if (j == undefined) return;
		if (j.date !== undefined) this.date.setTime(j.date);
		if (j.plans !== undefined) this.plans = j.plans.map((p) => new Plan(p));
	}
	toJSON(): DayJson {
		return {
			date: this.date.getTime(),
			plans: this.plans.map((p) => p.toJSON())
		};
	}
}

export class Days {
	private dayMap: SvelteMap<number, Day> = new SvelteMap();
	getOrNull(day: number): Day | null {
		return this.dayMap.get(day) ?? null;
	}
	getAndCreate(day: number): Day {
		if (!this.dayMap.has(day)) {
			const d = new Day({ date: day, plans: [] });
			this.dayMap.set(day, d);
			return d;
		}
		return this.dayMap.get(day)!;
	}
}
