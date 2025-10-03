<script lang="ts">
	import { goto } from "$app/navigation";
	import { Plan, plans } from "$lib/plan.svelte";

	const plan = $state(new Plan());

	function submitForm() {
		if (plan.name == "") return;
		plans.push(plan);
		goto("/");
	}
</script>

<svelte:head>
	<title>Add Plan - Planet</title>
</svelte:head>

<form class="mx-auto max-w-200 space-y-4 p-10">
	<label class="label">
		<span class="label-text">Plan Name</span>
		<input
			type="text"
			class="input"
			bind:value={plan.name}
			placeholder="You must enter a plan name!"
		/>
	</label>
	<label class="label">
		<span class="label-text">Plan Date</span>
		<div class="input-group grid-cols-[1fr_auto] max-sm:grid-cols-1">
			{#if plan.exactTime}
				<input
					type="datetime-local"
					class="max-sm:order-2 max-sm:input sm:ig-input"
					bind:value={() => plan.date.toISOString().slice(0, 19), (s) => (plan.date = new Date(s))}
				/>
			{:else}
				<input
					type="date"
					class="max-sm:order-2 max-sm:input sm:ig-input"
					bind:value={() => plan.date.toISOString().split("T")[0], (v) => (plan.date = new Date(v))}
				/>
			{/if}
			<select class="max-sm:order-1 max-sm:input sm:ig-input" bind:value={plan.exactTime}>
				<option value={false}>Date</option>
				<option value={true}>Time</option>
			</select>
		</div>
	</label>
	<label class="label">
		<span class="label-text">End Date</span>
		<div class="input-group grid-cols-[1fr_auto] max-sm:grid-cols-1">
			<input
				type="datetime-local"
				class="max-sm:order-2 max-sm:input sm:ig-input"
				bind:value={
					() => (plan.endDate ?? new Date()).toISOString().slice(0, 19),
					(s) => (plan.endDate = new Date(s))
				}
				disabled={plan.endDate == null}
			/>

			<select
				class="max-sm:order-1 max-sm:input sm:ig-input"
				bind:value={
					() => plan.endDate != null,
					(v) => (v ? (plan.endDate = new Date()) : (plan.endDate = null))
				}
			>
				<option value={false}>No End Date</option>
				<option value={true}>End Date</option>
			</select>
		</div>
	</label>
	<div class="w-full p-10">
		<button class="btn w-full preset-filled" onclick={submitForm}>Add Plan</button>
	</div>
</form>
