<script lang="ts">
	import { fromDateString, toDateString } from "$lib/datetime";
	import { Plan, planPriorityOrder, plans } from "$lib/plan.svelte";
	import settings from "$lib/settings.svelte";
	import { saveData as saveDataFunction } from "$lib/sync.svelte";
	import { Popover } from "@skeletonlabs/skeleton-svelte";
	import { resolve } from "$app/paths";
	import { SvelteDate } from "svelte/reactivity";

	import { ChevronLeft, ChevronRight, PencilIcon, XIcon, TrashIcon } from "@lucide/svelte";

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
	let displayedDaysCount = $derived(settings.plannerDisplayedDays);

	function orderPlans(plans: Plan[]): Plan[] {
		console.log(plans.length);
		const categorized: Plan[][] = plans.reduce(
			(arrs: Plan[][], p: Plan) => {
				let idx = planPriorityOrder.findIndex((x) => x.priority === p.priority)! * 2;
				// arrays go exact time first then regular
				if (!p.exactTime) idx += 1;
				arrs[idx].push(p);
				return arrs;
			},
			Array.from({ length: planPriorityOrder.length * 2 }, () => [])
		);
		const sorted = [];
		for (let i = 0; i < categorized.length; i += 2) {
			// sort timed by time
			categorized[i].sort((a, b) => a.date.getTime() - b.date.getTime());
			if (settings.plannerNoTimeOver) {
				sorted.push(...categorized[i + 1]);
				sorted.push(...categorized[i]);
			} else {
				sorted.push(...categorized[i]);
				sorted.push(...categorized[i + 1]);
			}
		}
		return sorted;
	}

	let days: Day[] = $derived.by(() => {
		let ret: Day[] = [];
		for (let i = 0; i < displayedDaysCount; i += 1) {
			let tmpDate = new Date(displayDate.getTime());
			tmpDate.setDate(tmpDate.getDate() + i);
			ret.push({
				date: new Date(tmpDate),
				plans: orderPlans(plansByDay.get(tmpDate.toDateString()) ?? [])
			});
		}
		return ret;
	});

	let daysRowCutoff = $derived.by(() => {
		if (displayedDaysCount < 5) {
			return "md:flex-row";
		} else if (displayedDaysCount < 7) {
			return "lg:flex-row";
		} else {
			return "xl:flex-row";
		}
	});

	function saveData(func: () => void): () => void {
		return () => {
			func();
			saveDataFunction({ plans: plans });
		};
	}

	const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
</script>

<svelte:head>
	<title>Planet</title>
</svelte:head>

<div class="relative flex size-full max-h-full min-h-0 flex-col gap-5 overflow-auto p-5">
	<h1 class="m-auto text-2xl font-bold">Planner</h1>
	<div class="flex shrink grow flex-col gap-5 {daysRowCutoff}">
		{#each days as day}
			<div
				class="flex size-full min-w-30 flex-col items-center gap-5 card preset-outlined-surface-500 p-3"
			>
				<a
					class="flex w-full flex-col items-center card p-2 {day.date.toDateString() ==
					new Date().toDateString()
						? 'preset-filled-surface-200-800'
						: 'preset-tonal'}"
					href={resolve("/addplan") + "?date=" + day.date.getTime()}
				>
					<p>{daysOfWeek[day.date.getDay()]}</p>
					<p>{day.date.toLocaleDateString()}</p>
				</a>
				{#each day.plans as plan}
					<Popover positioning={{ offset: { mainAxis: 12 } }}>
						<div
							class="flex w-full flex-row items-center gap-2 card preset-filled-surface-100-900 p-2"
						>
							<Popover.Trigger class="grow flex-col">
								<p class="text-center">{plan.name}</p>
								{#if plan.exactTime}
									<p class="text-center">{plan.date.toLocaleTimeString()}</p>
								{/if}
							</Popover.Trigger>
							<input
								class="checkbox"
								type="checkbox"
								checked={plan.checkedOff}
								onclick={saveData(() => (plan.checkedOff = !plan.checkedOff))}
							/>
						</div>
						<Popover.Positioner>
							<Popover.Content
								class="flex max-w-md flex-row gap-4 card bg-surface-100-900 p-4 shadow-xl"
							>
								<div class="flex h-auto grow flex-col items-center gap-2">
									<Popover.Title class="grow-0 font-bold">{plan.name}</Popover.Title>
									{#if plan.exactTime}
										<p class="grow-0">At {plan.date.toLocaleTimeString()}</p>
									{/if}
									<Popover.Description
										class="flex grow items-center break-all {plan.description === ''
											? 'italic'
											: ''}"
									>
										{plan.description !== "" ? plan.description : "No description set"}
									</Popover.Description>
								</div>
								<div class="flex flex-col gap-2">
									<a
										class="btn-icon preset-tonal"
										href={resolve("/editplan") + "?plan=" + plans.indexOf(plan)}
										><PencilIcon></PencilIcon></a
									>
									<Popover.CloseTrigger
										class="btn-icon preset-tonal"
										onclick={saveData(() => plans.splice(plans.indexOf(plan), 1))}
									>
										<TrashIcon></TrashIcon>
									</Popover.CloseTrigger>
									<Popover.CloseTrigger class="btn-icon preset-tonal"
										><XIcon></XIcon></Popover.CloseTrigger
									>
								</div>
								<Popover.Arrow
									style="--arrow-size: calc(var(--spacing) * 2); --arrow-background: var(--color-surface-100-900);"
								>
									<Popover.ArrowTip />
								</Popover.Arrow>
							</Popover.Content>
						</Popover.Positioner>
					</Popover>
				{/each}
			</div>
		{/each}
	</div>
	<div class="sticky bottom-5 flex w-full shrink-0 grow-0 flex-row justify-center gap-2 pt-10">
		<button
			class="btn-icon border border-surface-200-800 bg-surface-50-950"
			onclick={() => displayDate.setDate(displayDate.getDate() - displayedDaysCount)}
			><ChevronLeft /></button
		>
		<input
			type="date"
			class="input w-50 bg-surface-50-950"
			bind:value={
				() => toDateString(displayDate), (v) => displayDate.setTime(fromDateString(v).getTime())
			}
		/>
		<button
			class="btn-icon border border-surface-200-800 bg-surface-50-950"
			onclick={() => displayDate.setDate(displayDate.getDate() + displayedDaysCount)}
			><ChevronRight /></button
		>
	</div>
</div>
