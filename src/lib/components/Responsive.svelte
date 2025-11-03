<script module lang="ts">
	import { SvelteMap } from "svelte/reactivity";
	// Usage instructions - Include the base component (Responsive) somewhere in your root layout, then use queryTailwind

	const map = new SvelteMap<string, { v: boolean | null }>();

	/**
	 * queryTailwind - Gets the status of a Tailwind media query
	 * @param query The Tailwind query, appended with `:w-px` (ex. `"md:w-px"`)
	 * @returns A closure that can be used with `$derived.by` to get a responsive answer to the query
	 */
	export function queryTailwind(query: string): () => boolean | null {
		if (!map.has(query)) {
			const a = $state({ v: null });
			map.set(query, a);
		}
		const isActive = map.get(query)!;
		return () => isActive.v;
	}
</script>

<div class="invisible fixed left-[-1px] h-0">
	{#each map.entries() as [str, isActive]}
		<div
			class="{str} w-0"
			bind:clientWidth={() => (isActive.v ? 1 : 0), (v) => (isActive.v = v == 1)}
		></div>
	{/each}
</div>
