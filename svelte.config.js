const autoPreprocess = require('svelte-preprocess');
const autoprefixer = require('autoprefixer');
//const isDev = Boolean(process.env.ROLLUP_WATCH);

module.exports = {
	preprocess: autoPreprocess({
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
			plugins: [autoprefixer],
		},
		babel: {
			presets: [
				[
					'@babel/preset-env',
					{
						loose: true,
						// No need for babel to resolve modules
						modules: false,
						targets: {
							esmodules: true,
						},
					},
				],
			],
		},
	}),
};
