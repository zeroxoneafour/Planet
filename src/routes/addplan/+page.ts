import { plans } from "$lib/plan.svelte.js";

export function load({ params, url }) {
	let date = url.searchParams.get("date");
	let name = url.searchParams.get("name");
	let description = url.searchParams.get("desc");
	let priority = url.searchParams.get("prio");
	return {
		date: date !== null ? new Date(Number(date)) : null,
		name: name,
		description: description,
		priority: priority !== null ? Number(priority) : null
	};
}
