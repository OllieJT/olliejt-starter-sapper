<script>
	import { getClient, query } from 'svelte-apollo';
	import { GET_CHARACTERS } from '../data/queries';

	const client = getClient();
	const account = query(client, { query: GET_CHARACTERS });
</script>

{#await $account}
	<p>Loading...</p>
{:then result}
	<p>Loaded!</p>
	<pre>{JSON.stringify(result, 0, 2)}</pre>
{:catch}
	<p>Error!</p>
{/await}
