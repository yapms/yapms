import daisyui from 'daisyui';

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				mono: ['Roboto Mono Variable']
			}
		}
	},
	plugins: [daisyui],
	daisyui: {
		themes: ['light', 'dark', 'cupcake', 'dracula', 'lofi', 'night']
	}
};

export default config;
