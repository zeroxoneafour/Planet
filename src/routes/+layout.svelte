<script lang="ts">
	import "../app.css";
	import favicon from "$lib/assets/favicon.svg";
	import { Navigation } from "@skeletonlabs/skeleton-svelte";
	import { CalendarIcon, ListCheck, Plus, Settings } from "@lucide/svelte";
	import { page } from "$app/state";
	import Responsive, { queryTailwind } from "$lib/components/Responsive.svelte";

	const links = [
		{
			label: "Add Plan",
			href: "/addplan",
			icon: Plus
		},
		{
			label: "Planner",
			href: "/",
			icon: ListCheck
		},
		{
			label: "Calendar",
			href: "/calendar",
			icon: CalendarIcon
		},
		{
			label: "Settings",
			href: "/settings",
			icon: Settings
		}
	];

	let isMobile = $derived.by(queryTailwind("max-sm:w-px"));
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Responsive></Responsive>

<div class="flex size-full flex-col-reverse sm:flex-row">
	{#if isMobile}
		<Navigation.Bar>
			{#each links as { label, href, icon }}
				{@const Icon = icon}
				<Navigation.Tile {href} {label} selected={page.url.pathname === href}>
					<Icon />
				</Navigation.Tile>
			{/each}
		</Navigation.Bar>
	{:else}
		<Navigation.Rail>
			{#snippet tiles()}
				{#each links as { label, href, icon }}
					{@const Icon = icon}
					<Navigation.Tile {href} {label} selected={page.url.pathname === href}>
						<Icon />
					</Navigation.Tile>
				{/each}
			{/snippet}
		</Navigation.Rail>
	{/if}
	<div class="shrink-1 grow-1 overflow-scroll">
		{@render children?.()}
	</div>
</div>
