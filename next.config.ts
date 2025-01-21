/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true, // Habilita o suporte ao styled-components no SWC
  },
  async redirects() {
    return [
      {
        source: '/', // Rota inicial
        destination: '/login', // Rota de destino
        permanent: false, // Use true para redirecionamento permanente
      },
    ];
  },
};

export default nextConfig;
