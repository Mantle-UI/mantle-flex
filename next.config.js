const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const basePath = isGitHubPages ? '/mantle-flex' : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    trailingSlash: true,
    assetPrefix: isGitHubPages ? `${basePath}/` : '',
    basePath,
    env: {
        NEXT_PUBLIC_BASE_PATH: basePath
    }
};

module.exports = nextConfig;
