const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				mono: ['Roboto Mono Variable']
			}
		}
	},
	daisyui: {
		themes: ['light', 'dark', 'cupcake', 'dracula', 'lofi', 'night']
	}
};

export default config;
