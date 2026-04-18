import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const config = defineConfig({
	plugins: [sveltekit(), tailwindcss()],
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
});

export default config;
