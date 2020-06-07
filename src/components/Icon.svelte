<script>
	export let name;
	export let title;
	export let desc = undefined;
</script>

<svg class="svg-icon">
	{#if title}
		<title>{title}</title>
	{:else}
		<title>{name}</title>
	{/if}
	{#if desc}
		<desc>{desc}</desc>
	{/if}
	<use xlink:href="/icons.svg#icon-{name}" />
</svg>
