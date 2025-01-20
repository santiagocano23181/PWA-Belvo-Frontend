import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
			manifest: {
				display: 'standalone',
				display_override: ['window-controls-overlay'],
				lang: 'es-ES',
				name: 'Vite + React PWA',
				short_name: 'Ejemplo PWA',
				description: 'Ejemplo de PWA creada en Socratech',
				theme_color: '#19223c',
				background_color: '#d4d4d4',
				icons: [
					{
						src: 'pwa-64x64.png',
						sizes: '64x64',
						type: 'image/png',
					},
					{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'any',
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable',
					},
				],
			},
		}),
  ],
})
