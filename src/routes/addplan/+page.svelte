<script lang="ts">
	import { goto } from "$app/navigation";
	import { Plan, plans } from "$lib/plan.svelte";
	import { resolve } from "$app/paths";
	import { saveData } from "$lib/sync.svelte";
	import {
		fromDateString,
		fromDateTimeString,
		toDateString,
		toDateTimeString
	} from "$lib/datetime";

	const plan = $state(new Plan());
	function submitForm() {
		plans.push(plan);
		saveData({ plans: plans });
		// idk why the fuck it needs requestAnimationFrame this but okay
		requestAnimationFrame(() => goto(resolve("/")));
	}
</script>

<svelte:head>
	<title>Add Plan - Planet</title>
</svelte:head>

<form class="mx-auto max-w-200 space-y-4 p-10">
	<label class="label">
		<span class="label-text">Plan Name</span>
		<input type="text" class="input" bind:value={plan.name} placeholder=" " />
	</label>
	<label class="label">
		<span class="label-text">Plan Date</span>
		<div class="input-group grid-cols-[1fr_auto] max-sm:grid-cols-1">
			{#if plan.exactTime}
				<input
					type="datetime-local"
					class="max-sm:order-2 max-sm:input sm:ig-input"
					bind:value={() => toDateTimeString(plan.date), (v) => (plan.date = fromDateTimeString(v))}
				/>
			{:else}
				<input
					type="date"
					class="max-sm:order-2 max-sm:input sm:ig-input"
					bind:value={() => toDateString(plan.date), (v) => (plan.date = fromDateString(v))}
				/>
			{/if}
			<button
				class="max-sm:order-1 max-sm:input sm:ig-input"
				type="button"
				onclick={() => (plan.exactTime = !plan.exactTime)}
				title="Add hour/minute"
			>
				{plan.exactTime ? "Time" : "Date"}
			</button>
		</div>
	</label>
	<label class="label">
		<span class="label-text">End Date</span>
		<div class="input-group grid-cols-[1fr_auto] max-sm:grid-cols-1">
			<input
				type="datetime-local"
				class="max-sm:order-2 max-sm:input sm:ig-input"
				bind:value={
					() => toDateTimeString(plan.endDate ?? new Date()),
					(v) => (plan.endDate = fromDateTimeString(v))
				}
				disabled={plan.endDate == null}
			/>

			<button
				class="max-sm:order-1 max-sm:input sm:ig-input"
				type="button"
				onclick={() => (plan.endDate = plan.endDate === null ? new Date() : null)}
				title="Specify end time"
			>
				{plan.endDate === null ? "No End Time" : "End Time"}
			</button>
		</div>
	</label>
	<div class="w-full p-10">
		<button
			type="submit"
			class="btn w-full preset-filled"
			onclick={submitForm}
			disabled={plan.name == ""}>Add Plan</button
		>
	</div>
</form>
