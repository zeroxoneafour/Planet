<script lang="ts">
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";
	import PlanEditor from "$lib/components/PlanEditor.svelte";
	import { Plan, plans } from "$lib/plan.svelte.js";
	import { saveData } from "$lib/sync.svelte";
	import type { PageProps } from "./$types";

	let { params, data }: PageProps = $props();
	let originalPlan: Plan | undefined = data.plan;
	let plan: Plan = new Plan().fromJSON(data.plan?.toJSON());

	function updatePlan() {
		if (originalPlan === undefined || plan.name === "") return;
		plans.splice(plans.indexOf(originalPlan), 1, plan);
		saveData({ plans: plans });
		requestAnimationFrame(() => goto(resolve("/")));
	}
	function cancelChanges() {
		requestAnimationFrame(() => goto(resolve("/")));
	}
</script>

<svelte:head>
	<title
		>{originalPlan !== undefined
			? `Editing ${plan.name} - Planet`
			: "Plan Not Found - Planet"}</title
	>
</svelte:head>

{#if originalPlan !== undefined}
	<form class="mx-auto max-w-200 space-y-4 p-5">
		<h1 class="text-center text-2xl font-bold">Edit Plan</h1>
		<PlanEditor {plan}></PlanEditor>
		<div class="flex w-full flex-row gap-10 p-10">
			<button
				type="submit"
				class="btn grow preset-filled"
				onclick={updatePlan}
				disabled={plan.name == ""}>Update Plan</button
			>
			<button
				type="reset"
				class="btn grow preset-filled"
				onclick={cancelChanges}
				disabled={plan.name == ""}>Cancel Changes</button
			>
		</div>
	</form>
{:else}
	<p>Plan not found!</p>
{/if}
