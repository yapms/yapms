import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import svelteSVG from 'vite-plugin-svelte-svg';

const config: UserConfig = {
	plugins: [
		sveltekit(),
		svelteSVG({
			svgoConfig: {},
			requireSuffix: true
		})
	],
	server: {
		host: '0.0.0.0',
		port: 8080
	}
};

export default config;
