/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	// @ts-ignore
	plugins: [require('daisyui')],
	daisyui: {
		themes: ['light', 'dark', 'cupcake', 'dracula', 'lofi', 'night']
	}
};
