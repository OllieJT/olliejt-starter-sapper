<script context="module">
	import client from '../data/apolloClient';
	import { GET_PAGE, GET_LOCATIONS } from '../data/queries';

	export async function preload() {
		return {
			cache: await client.query({
				query: GET_PAGE,
			}),
		};
	}
</script>

<script>
	import { setClient, restore, query } from 'svelte-apollo';
	import List from '../components/List.svelte';

	export let cache;

	restore(client, GET_PAGE, cache.data);
	setClient(client);

	// query a subset of the preloaded (the rest if for Account)
	const locations = query(client, { query: GET_LOCATIONS });

	//console.log('GET_PAGE: ', cache);
	//console.log('GET_LOCATIONS: ', locations);
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

<h3>In Page</h3>
{#await $locations}
	<p>Loading...</p>
{:then result}
	<p>Loaded!</p>
	<pre>{JSON.stringify(result, 0, 2)}</pre>
{:catch}
	<p>Error!</p>
{/await}

<h3>In Component</h3>
<List />
<hr />
<h1>Great success!</h1>
<p>
	<strong>Try editing this file (src/routes/index.svelte) to test live reloading.</strong>
</p>

<figure>
	<img alt="Success Kid" src="successkid.jpg" />
	<figcaption>Have fun with Sapper!</figcaption>
</figure>
