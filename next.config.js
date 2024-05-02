/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'localhost',
            'plus.unsplash.com',
            'images.unsplash.com',
            // process.env.NEXT_PUBLIC_HOST_URL,

        ]
    }
}

module.exports = nextConfig
