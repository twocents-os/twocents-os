module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/s/:path*",
        destination: "/iou/receiver/special/:path*",
        permanent: true,
      },
      {
        source: "/p/nftuk",
        destination: "/project/nftforfeedback",
        permanent: true,
      },
      {
        source: "/p/nftuk/fback",
        destination: "/project/nftforfeedback/nftukevent",
        permanent: true,
      },
      {
        source: "/p/nfthold",
        destination: "/project/nftholders",
        permanent: true,
      },
      {
        source: "/p/nfthold/fback",
        destination: "/project/nftholders/nftholdersevent",
        permanent: true,
      },
    ];
  },
};
