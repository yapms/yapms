import globals from 'globals';
import js from '@eslint/js';
import ts from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';

import svelteParser from 'svelte-eslint-parser';

const config = [
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	...svelte.configs['flat/prettier'],
	prettier,
	{
		ignores: [
			'node_modules',
			'build',
			'.svelte-kit',
			'.env*',
			'package-lock.json',
			'postcss.config.cjs',
			'svelte.config.js',
			'tailwind.config.cjs',
			'eslint.config.js'
		]
	},
	{
		files: ['**/*.ts', '*.ts'],
		languageOptions: {
			parser: ts.parser,
			parserOptions: {
				project: './tsconfig.json',
				extraFileExtensions: ['.svelte']
			},
			globals: {
				...globals.browser
			}
		},
		rules: {
			'svelte/no-navigation-without-resolve': 'off'
		}
	},
	{
		files: ['**/*.svelte', '*.svelte'],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: ts.parser
			},
			globals: {
				...globals.browser
			}
		},
		rules: {
			'svelte/require-each-key': 'off',
			'svelte/no-at-html-tags': 'off',
			'svelte/no-navigation-without-resolve': 'off',
			'svelte/block-lang': [
				'error',
				{
					enforceScriptPresent: true,
					script: ['ts']
				}
			]
		}
	}
];

export default config;
