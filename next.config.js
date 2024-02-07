/** @type {import('next').NextConfig} */
const path = require('path');

const securityHeaders = [
    {
        key: 'X-DNS-Prefetch-Control',
        value: 'on'
    },
    {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload'
    },
    {
        key: 'X-XSS-Protection',
        value: '1; mode=block'
    },
    {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN'
    },
    {
        key: 'Referrer-Policy',
        value: 'origin-when-cross-origin'
    }
]

const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    },
    images: {
        domains: ['images.ctfassets.net', 'localhost', 'www.marcinkumiszczo.pl']
    },
    async headers() {
        return [
            {
                // Apply these headers to all routes in your application.
                source: '/:path*',
                headers: securityHeaders,
            },
        ]
    },
    async redirects() {
        return [
            {
                source: '/nieruchomosci',
                destination: '/nieruchomosci/na-sprzedaz',
                permanent: true,
            },
        ]
    },
};

module.exports = nextConfig;
