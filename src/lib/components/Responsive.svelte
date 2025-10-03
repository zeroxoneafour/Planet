<script module lang="ts">
	// Usage instructions - Include the base component (Responsive) somewhere in your root layout, then use queryTailwind

	const map: Map<string, { v: boolean }> = $state(new Map());

	/**
	 * queryTailwind - Gets the status of a Tailwind media query
	 * @param query The Tailwind query, appended with `:w-px` (ex. `"md:w-px"`)
	 * @returns A closure that can be used with `$derived.by` to get a responsive answer to the query
	 */
	export function queryTailwind(query: string): () => boolean {
		const isActive = $state({ v: true });
		if (!map.has(query)) {
			map.set(query, isActive);
		}
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
