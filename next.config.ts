/* eslint-disable @typescript-eslint/no-explicit-any */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [
      'moc-next-secure-test.s3.us-east-2.amazonaws.com',
      'localhost',
      `${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all hostnames for now for testing
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true, // Disable image optimization for external images
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    // This allows production builds to successfully complete even with ESLint errors
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://*.googleapis.com https://*.google.com https://*.gstatic.com https://api.mapbox.com",
              "worker-src 'self' blob:",
              "child-src 'self' blob:",
              "img-src 'self' data: blob: https://*.amazonaws.com https://*.s3.*.amazonaws.com https://*.googleapis.com https://*.google.com https://*.gstatic.com https://*.googleusercontent.com https://api.mapbox.com https://*.tiles.mapbox.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.mapbox.com",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://*.amazonaws.com https://*.googleapis.com https://*.google.com https://*.gstatic.com https://api.mapbox.com https://events.mapbox.com https://*.tiles.mapbox.com"
            ].join('; ')
          }
        ]
      }
    ]
  },
  webpack: (config: { resolve: { fallback: any; }; }, { isServer }: any) => {
    // Handle Mapbox GL JS
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },
};

export default nextConfig;