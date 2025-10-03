<script lang="ts">
	import { Tabs } from "@skeletonlabs/skeleton-svelte";
	let tab = $state("account");
</script>

<svelte:head>
	<title>Settings - Planet</title>
</svelte:head>

<Tabs value={tab} onValueChange={(e) => (tab = e.value)}>
	{#snippet list()}
		<Tabs.Control value="account">Account</Tabs.Control>
	{/snippet}
	<Tabs.Panel value="account">
		<p>A</p>
	</Tabs.Panel>
</Tabs>
