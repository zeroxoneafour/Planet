<script lang="ts">
	import "../app.css";
	import darkModeLogo from "$lib/assets/dark/logo.svg";
	import lightModeLogo from "$lib/assets/light/logo.svg";
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
	let isDarkMode = $derived.by(queryTailwind("dark:w-px"));
	let { children } = $props();
</script>

<svelte:head>
	{#if isDarkMode}
		<link rel="icon" href={darkModeLogo} />
	{:else}
		<link rel="icon" href={lightModeLogo} />
	{/if}
</svelte:head>

<Responsive></Responsive>

<div class="flex size-full flex-col-reverse overflow-hidden sm:flex-row">
	{#if isMobile !== null}
		<Navigation layout={isMobile ? "bar" : "rail"} class="shrink-0">
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
	<div class="relative min-h-0 shrink grow overflow-auto">
		{#if isMobile !== null}
			{@render children?.()}
		{:else}
			<div class="flex h-full w-full items-center justify-center">
				<LoaderCircle class="animate-spin"></LoaderCircle>
			</div>
		{/if}
	</div>
</div>
