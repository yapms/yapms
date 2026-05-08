const config = {
	useTabs: true,
	singleQuote: true,
	trailingComma: 'none',
	printWidth: 100,
	plugins: [
		'prettier-plugin-svelte'
	],
	overrides: [
		{
			files: '*.svelte',
			options: {
				parser: 'svelte'
			}
		},
		{
			files: '*.svg',
			options: {
				parser: 'html'
			}
		}
	]
};

export default config;
