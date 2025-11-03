<script lang="ts">
	import { Plan, PlanPriority, planPriorityOrder } from "$lib/plan.svelte";
	import {
		toDateString,
		fromDateString,
		toDateTimeString,
		fromDateTimeString
	} from "$lib/datetime";
	let { plan }: { plan: Plan } = $props();
</script>

<form class="space-y-4" novalidate>
	<label class="label">
		<span class="label-text">Plan Name</span>
		<input
			type="text"
			class="input"
			bind:value={plan.name}
			placeholder="You must name your plan!"
		/>
	</label>
	<label class="label">
		<span class="label-text">Plan {plan.exactTime ? "Time" : "Date"}</span>
		<div class="input-group grid-cols-[1fr_auto] max-sm:grid-cols-1">
			{#if plan.exactTime}
				<input
					type="datetime-local"
					class="max-sm:input sm:ig-input"
					bind:value={() => toDateTimeString(plan.date), (v) => (plan.date = fromDateTimeString(v))}
				/>
			{:else}
				<input
					type="date"
					class="max-sm:input sm:ig-input"
					bind:value={() => toDateString(plan.date), (v) => (plan.date = fromDateString(v))}
				/>
			{/if}
			<button
				class="max-sm:input sm:ig-btn"
				type="button"
				onclick={() => (plan.exactTime = !plan.exactTime)}
				title="Add hour/minute"
			>
				{plan.exactTime ? "Use Only Date" : "Use Exact Time"}
			</button>
		</div>
	</label>
	<label class="label">
		<span class="label-text">Plan Description</span>
		<textarea class="textarea" bind:value={plan.description} placeholder="Add a description"
		></textarea>
	</label>
	<label class="label">
		<span class="label-text">Plan Priority</span>
		<select class="input" bind:value={plan.priority}>
			{#each planPriorityOrder as priorty}
				<option value={priorty.priority}>{priorty.name}</option>
			{/each}
		</select>
	</label>
</form>
