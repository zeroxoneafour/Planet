import { plans } from "$lib/plan.svelte.js";

export function load({ params, url }) {
	let planIdx = url.searchParams.get("plan");
	return { plan: plans.at(Number(planIdx)) };
}
