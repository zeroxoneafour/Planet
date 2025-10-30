<script lang="ts">
	import { fromDateString, toDateString } from "$lib/datetime";
	import { Plan, plans } from "$lib/plan.svelte";
	import { ChevronLeft, ChevronRight } from "@lucide/svelte";
	import { SvelteDate } from "svelte/reactivity";

	type Day = { date: Date; plans: Plan[] };

	let plansByDay: Map<string, Plan[]> = $derived(
		plans.reduce((m, p) => {
			let d = p.date.toDateString();
			if (m.has(d)) {
				let arr = m.get(d)!;
				arr.push(p);
				m.set(d, arr);
			} else {
				m.set(d, [p]);
			}
			return m;
		}, new Map<string, Plan[]>())
	);

	let displayDate = new SvelteDate();

	let days: Day[] = $derived.by(() => {
		let ret: Day[] = [];
		for (let i = 0; i < 7; i += 1) {
			let tmpDate = new Date(displayDate.getTime());
			tmpDate.setDate(tmpDate.getDate() + i);
			ret.push({
				date: new Date(tmpDate),
				plans: plansByDay.get(tmpDate.toDateString()) ?? []
			});
		}
		return ret;
	});
</script>

<svelte:head>
	<title>Planet</title>
</svelte:head>

<div class="grid size-full gap-5 overflow-scroll p-10 max-sm:grid-rows-7 sm:grid-cols-7">
	{#each days as day}
		<div class="flex size-full flex-col items-center card preset-outlined-surface-500">
			<p>{day.date.toLocaleDateString()}</p>
			{#each day.plans as plan}
				<div>
					<p>{plan.name}</p>
				</div>
			{/each}
		</div>
	{/each}
</div>

<div class="absolute bottom-10 flex w-full flex-row justify-center gap-2">
	<button
		class="btn-icon preset-tonal"
		onclick={() => displayDate.setDate(displayDate.getDate() - 7)}><ChevronLeft /></button
	>
	<input
		type="date"
		class="input w-50"
		bind:value={
			() => toDateString(displayDate), (v) => displayDate.setTime(fromDateString(v).getTime())
		}
	/>
	<button
		class="btn-icon preset-tonal"
		onclick={() => displayDate.setDate(displayDate.getDate() + 7)}><ChevronRight /></button
	>
</div>
