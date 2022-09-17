/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['https://kimzerovirus.github.io'],
		format: ['image/png', 'image/webp', 'image/jpeg'],
	},
};

module.exports = nextConfig;
