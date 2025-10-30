import { Plan, plans } from "./plan.svelte";
import settings from "./settings.svelte";
import { loadData } from "./sync.svelte";

export function loadAndSetData(ignoreTimestamp = false) {
	loadData(ignoreTimestamp).then((x) => {
		if (x.plans)
			plans.splice(0, plans.length, ...x.plans.map((y: object) => new Plan().fromJSON(y)));
		if (x.settings) settings.fromJSON(x.settings);
	});
}
