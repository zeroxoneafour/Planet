<script lang="ts">
	import "../app.css";
	import favicon from "$lib/assets/favicon.svg";
	import { Navigation } from "@skeletonlabs/skeleton-svelte";
	import { CalendarIcon, ListCheck, Plus, Settings, LoaderCircle } from "@lucide/svelte";
	import { page } from "$app/state";
	import Responsive, { queryTailwind } from "$lib/components/Responsive.svelte";
	import { goto } from "$app/navigation";

	const links = [
		{
			label: "Add Plan",
			href: "/addplan/",
			icon: Plus
		},
		{
			label: "Planner",
			href: "/",
			icon: ListCheck
		},
		{
			label: "Calendar",
			href: "/calendar/",
			icon: CalendarIcon
		},
		{
			label: "Settings",
			href: "/settings/",
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
	{#if isMobile !== null}
		<Navigation layout={isMobile ? "bar" : "rail"}>
			<Navigation.Menu class="items-center justify-center">
				{#each links as { label, href, icon }}
					{@const Icon = icon}
					<button
						onclick={() => goto(href)}
						class="btn flex-col items-center justify-center gap-1 hover:preset-tonal disabled:preset-tonal sm:aspect-square"
						disabled={page.url.pathname === href}
					>
						<Icon />
						<span class="text-xs">{label}</span>
					</button>
				{/each}
			</Navigation.Menu>
		</Navigation>
	{/if}
	<div class="relative shrink-1 grow-1">
		{#if isMobile !== null}
			{@render children?.()}
		{:else}
			<div class="flex h-full w-full items-center justify-center">
				<LoaderCircle class="animate-spin"></LoaderCircle>
			</div>
		{/if}
	</div>
</div>
