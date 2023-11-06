/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				mono: ['Roboto Mono Variable']
			}
		}
	},
	// @ts-ignore
	plugins: [require('daisyui')],
	daisyui: {
		themes: ['light', 'dark', 'cupcake', 'dracula', 'lofi', 'night']
	}
};
