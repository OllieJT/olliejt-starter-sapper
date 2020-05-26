<script context="module">
	import client from '../data/apollo';
	import { gql } from 'apollo-boost';

	const EVERYTHING = gql`
		query shop {
			shop {
				name
			}
		}
	`;
	export async function preload() {
		return {
			cache: await client.query({
				query: EVERYTHING,
			}),
		};
	}
</script>

<script>
	import { setClient, restore, query } from 'svelte-apollo';
	export let cache;
	restore(client, EVERYTHING, cache.data);
	// TODO Uncommenting this part triggers a 500 error.
	// setClient(client);
	// query a subset of the preloaded (the rest if for Account)
	const todos = query(client, { query: EVERYTHING });
	console.log(todos);
</script>

<style>
	h1,
	figure,
	p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

{#await $todos}
	<p>Loading...</p>
{:then result}
	{#if result.data}
		<ul>{JSON.stringify(result.data)}</ul>
	{:else}
		<p>ERROR!!</p>
	{/if}
{/await}

<h1>Great success!</h1>

<figure>
	<img alt="Success Kid" src="successkid.jpg" />
	<figcaption>Have fun with Sapper!</figcaption>
</figure>

<p>
	<strong>Try editing this file (src/routes/index.svelte) to test live reloading.</strong>
</p>
