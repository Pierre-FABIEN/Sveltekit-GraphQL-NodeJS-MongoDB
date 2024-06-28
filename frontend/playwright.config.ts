import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173,
		timeout: 120 * 1000, // Augmentation du timeout à 120 secondes
		reuseExistingServer: !process.env.CI // Réutilisation du serveur existant si non en CI
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	use: {
		headless: true, // Exécuter les tests en mode headless
		viewport: { width: 1280, height: 720 }, // Configuration de la taille de la fenêtre
		actionTimeout: 0, // Pas de timeout pour les actions individuelles
		baseURL: 'http://localhost:4173', // Base URL pour les tests
		trace: 'on-first-retry', // Tracer les tests échoués lors de la première tentative
	},
	reporter: [['list'], ['html', { open: 'never' }]] // Ajout de reporters pour les résultats des tests
};

export default config;
