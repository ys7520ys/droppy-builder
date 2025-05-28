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
  // output: 'export', // ✅ 정적 사이트 export 모드
  trailingSlash: true, // ✅ 모든 경로에 '/' 붙이기 (Netlify에서 필수!)
  reactStrictMode: true,
  images: {
    unoptimized: true, // ✅ next/image 최적화 비활성화 (export에 필수)
  },
};

module.exports = nextConfig;


