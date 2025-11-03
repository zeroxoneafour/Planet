<script lang="ts">
	import firebaseManager, { saveData } from "$lib/sync.svelte";
	import settings from "$lib/settings.svelte";
	import { Tabs } from "@skeletonlabs/skeleton-svelte";
	import { loadAndSetData } from "$lib";
	import { plans } from "$lib/plan.svelte";

	let firebaseConfig = $state(settings.firebaseConfig);
	let email = $state("");
	let password = $state("");

	$effect(() => {
		saveData({ settings: settings });
	});
</script>

<svelte:head>
	<title>Settings - Planet</title>
</svelte:head>

<Tabs defaultValue="account">
	<Tabs.List>
		<Tabs.Trigger value="account">Account</Tabs.Trigger>
		<Tabs.Trigger value="planner">Planner</Tabs.Trigger>
		<Tabs.Indicator />
	</Tabs.List>
	<div class="p-10">
		<Tabs.Content value="account" class="w-full max-w-200 space-y-4">
			<label class="label">
				<span class="label-text">
					Firebase Config -
					{#if !firebaseManager.app}
						<span class="text-error-700-300">Not Working</span>
					{:else}
						<span class="text-success-700-300">Working</span>
					{/if}
				</span>
				<div class="input-group grid-cols-[1fr_auto]">
					<input class="ig-input" type="text" bind:value={firebaseConfig} />
					<button class="ig-input" onclick={() => (settings.firebaseConfig = firebaseConfig)}
						>Submit</button
					>
				</div>
			</label>
			{#if firebaseManager.auth != null && firebaseManager.user == null}
				<form class="flex max-w-100 flex-col space-y-4" onsubmit={() => {}}>
					<label class="label">
						<span class="label-text">Email</span>
						<input class="input" type="email" bind:value={email} />
					</label>
					<label class="label">
						<span class="label-text">Password</span>
						<input class="input" type="password" bind:value={password} />
					</label>
					<div>
						<button
							class="btn"
							type="submit"
							onclick={() => firebaseManager.logInOrSignUp(email, password)}
							>Sign Up / Log in</button
						>
					</div>
				</form>
			{:else if firebaseManager.user != null}
				<label class="label">
					<span class="label-text">Logged in as {firebaseManager.user.email}</span>
					<button class="btn" onclick={() => firebaseManager.logOut()}>Log out</button>
				</label>
				<label class="label">
					<span class="label-text">Force Cloud Sync</span>
					<button class="btn" onclick={() => saveData({ settings: settings, plans: plans }, true)}
						>Force Upload</button
					>
					<button class="btn" onclick={() => loadAndSetData(true)}>Force Download</button>
				</label>
			{/if}
		</Tabs.Content>
		<Tabs.Content value="planner" class="w-full max-w-200 space-y-4">
			<label class="label">
				<span class="label-text"> Displayed Days - {settings.plannerDisplayedDays}</span>
				<input
					type="range"
					class="input"
					bind:value={settings.plannerDisplayedDays}
					min="3"
					max="7"
				/>
			</label>
		</Tabs.Content>
	</div>
</Tabs>
