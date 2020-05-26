<script context="module">
	//import LogRocket from 'logrocket';
	//LogRocket.init('TODO');

	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<script>

</script>

<style global lang="scss">
	@import '../styles/main.scss';
</style>

<Nav {segment} />

<main>
	<slot />
</main>
