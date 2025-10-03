<script>
	import { plans } from "$lib/plan.svelte";
	import { ChevronLeft, ChevronRight } from "@lucide/svelte";
</script>

<svelte:head>
	<title>Planet</title>
</svelte:head>

<div class="flex flex-col">
	{#each plans as plan}
		<div>
			<p>{plan.name}</p>
			<p>{plan.date.toLocaleDateString()}</p>
		</div>
	{/each}
</div>

<div class="fixed bottom-30 flex w-screen flex-row justify-center gap-2 sm:bottom-10">
	<button class="btn-icon preset-tonal"><ChevronLeft /></button>
	<input type="date" class="input w-50" />
	<button class="btn-icon preset-tonal"><ChevronRight /></button>
</div>
