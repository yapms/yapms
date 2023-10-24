import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	server: {
		host: '0.0.0.0',
		port: 8081
	},
	preview: {
		host: '0.0.0.0',
		port: 8081
	},
	build: {
		rollupOptions: {
			external: ['fs']
		}
	}
};

export default config;
