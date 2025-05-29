// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// export default nextConfig;



// const nextConfig = {
//   reactStrictMode: true,
//   output: "export", // ✅ 추가!
// };

// export default nextConfig;





// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     unoptimized: true,  // ✅ 이미지 최적화 비활성화!
//   },
// };

// export default nextConfig;




// @type {import('next').NextConfig} */
//const nextConfig = {
 // reactStrictMode: true,
//  images: {
//    unoptimized: true,
//  },
//  output: 'export', // ✅ 정적 사이트로 export 명시
//};

//export default nextConfig;





// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: "export",
// };

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: "export",
//   trailingSlash: true,
//   reactStrictMode: true,
//   images: {
//     unoptimized: true,
//   },
// };

// module.exports = nextConfig;





// 05/24/02:06
// // next.config.js
// const nextConfig = {
//   // output: 'export',
//   trailingSlash: true,
//   images: { unoptimized: true },
// };
// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ✅ 'standalone' 모드로 서버 빌드 포함 (Netlify SSR 대응)
  output: 'standalone',

  // 🔽 Netlify에서 '/'를 자동으로 붙이므로 따로 안 써도 무방
  // trailingSlash: true, ❌ 필요 없음 (SSR 기준)

  // ✅ next/image 최적화 끄려면 유지 가능하지만 SSR에서는 optional
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;