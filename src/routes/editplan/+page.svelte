<script lang="ts">
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";
	import PlanEditor from "$lib/components/PlanEditor.svelte";
	import { Plan, plans } from "$lib/plan.svelte.js";
	import { saveData } from "$lib/sync.svelte";
	import type { PageProps } from "./$types";

	const { params, data }: PageProps = $props();
	const originalPlan: Plan | undefined = data.plan;
	const plan: Plan = new Plan().fromJSON(data.plan?.toJSON());

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
	<div class="mx-auto max-w-200 space-y-4 p-5">
		<h1 class="text-center text-2xl font-bold">Edit Plan</h1>
		<PlanEditor {plan}></PlanEditor>
		<div class="flex w-full flex-col gap-10 p-10 sm:flex-row">
			<button class="btn grow preset-filled" onclick={updatePlan} disabled={plan.name == ""}
				>Update Plan</button
			>
			<button class="btn grow preset-filled" onclick={cancelChanges}>Cancel Changes</button>
		</div>
	</div>
{:else}
	<div class="flex h-full w-full flex-col items-center justify-center gap-10">
		<p>Plan not found!</p>
		<a class="btn preset-tonal" href={resolve("/")}>Return to Planner</a>
	</div>
{/if}
