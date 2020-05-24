const sveltePreprocess = require('svelte-preprocess');
const production = !process.env.ROLLUP_WATCH;

const options = {
	preserve: ['ld+json'],
	scss: {
		renderSync: true,
	},

	/**
	 * Post process css with PostCSS by defining 'transformers.postcss' property,
	 * either pass 'true' to activate PostCSS transforms and use the `postcss.config.js`
	 */
	postcss: true,

	/** or pass an object with postcss plugins and their options directly. */
	postcss: {
		plugins: [require('autoprefixer')],
	},
};

module.exports = {
	dev: !production,
	hydratable: true,
	//emitCss: true,
	preprocess: sveltePreprocess(options),
};
