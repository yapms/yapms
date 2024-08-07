import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {

	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		env: {
			dir: '../../'
		}
	}
};

export default config;
