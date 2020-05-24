import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

import autoPreprocess from 'svelte-preprocess';

import replace from '@rollup/plugin-replace';
import babel from 'rollup-plugin-babel';
import config from 'sapper/config/rollup.js';
import pkg from './package.json';
import json from '@rollup/plugin-json';
// Env
const preprocess = require('./svelte.config.js');
const mode = process.env.NODE_ENV;
const isDev = mode === 'development';
const isLegacy = !!process.env.SAPPER_LEGACY_BUILD;
// Unknown
const onwarn = (warning, onwarn) =>
	(warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) ||
	onwarn(warning);
const dedupe = (importee) => importee === 'svelte' || importee.startsWith('svelte/');

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		plugins: [
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode),
			}),
			svelte(preprocess),
			resolve({
				//preferBuiltins: false,
				browser: true,
				dedupe,
				//mainFields: ['main', 'module'],
			}),
			commonjs(),
			json(),

			isLegacy &&
				babel({
					extensions: ['.js', '.mjs', '.html', '.svelte'],
					runtimeHelpers: true,
					exclude: ['node_modules/@babel/**'],
					presets: [
						[
							'@babel/preset-env',
							{
								targets: '> 0.25%, not dead',
							},
						],
					],
					plugins: [
						'@babel/plugin-syntax-dynamic-import',
						[
							'@babel/plugin-transform-runtime',
							{
								useESModules: true,
							},
						],
					],
				}),

			// If we're building for production, minify
			!isDev &&
				terser({
					module: true,
				}),
		],

		preserveEntrySignatures: false,
		onwarn,
	},

	server: {
		input: config.server.input(),
		output: config.server.output(),
		plugins: [
			replace({
				'process.browser': false,
				'process.env.NODE_ENV': JSON.stringify(mode),
			}),
			svelte({
				generate: 'ssr',
				dev: isDev,
				preprocess: autoPreprocess(),
			}),
			resolve({
				dedupe: ['svelte'],
			}),
			commonjs(),
			json(),
		],
		external: Object.keys(pkg.dependencies).concat(
			require('module').builtinModules || Object.keys(process.binding('natives')),
		),
		onwarn,
	},

	serviceworker: {
		input: config.serviceworker.input(),
		output: config.serviceworker.output(),
		plugins: [
			resolve(),
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode),
			}),
			commonjs(),
			!isDev && terser(),
		],

		onwarn,
	},
};
