/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['https://kimzerovirus.github.io'],
		format: ['image/png', 'image/webp', 'image/jpeg'],
	},
	// webpack(config) {
	// 	config.resolve.modules.push(__dirname);
	// 	return config;
	// },
	env: {
		BASE_URL: process.env.BASE_URL,
	},
};

module.exports = nextConfig;
