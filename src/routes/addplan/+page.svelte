<script lang="ts">
	import { goto } from "$app/navigation";
	import { Plan, plans } from "$lib/plan.svelte";
	import { resolve } from "$app/paths";
	import { saveData } from "$lib/sync.svelte";
	import PlanEditor from "$lib/components/PlanEditor.svelte";
	import type { PageProps } from "./$types";

	const plan = $state(new Plan());

	const { params, data }: PageProps = $props();
	if (data.date !== null) plan.date = data.date;
	if (data.name !== null) plan.name = data.name;
	if (data.description !== null) plan.description = data.description;
	if (data.priority !== null) plan.priority = data.priority;

	function submitForm() {
		if (plan.name === "") return;
		plans.push(plan);
		saveData({ plans: plans });
		// idk why the fuck it needs requestAnimationFrame this but okay
		requestAnimationFrame(() => goto(resolve("/")));
	}
</script>

<svelte:head>
	<title>Add Plan - Planet</title>
</svelte:head>

<div class="mx-auto max-w-200 space-y-4 p-5">
	<h1 class="text-center text-2xl font-bold">Add Plan</h1>
	<PlanEditor {plan}></PlanEditor>
	<div class="w-full p-10">
		<button class="btn w-full preset-filled" onclick={submitForm} disabled={plan.name == ""}
			>Add Plan</button
		>
	</div>
</div>
