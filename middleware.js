// // middleware.js
// import { NextResponse } from 'next/server';

// export function middleware(req) {
//   const hostname = req.headers.get('host') || '';
//   const subdomain = hostname.replace('.droppy.kr', '');

//   // Netlify preview domain (e.g. droppy-main.netlify.app) 예외 처리
//   if (hostname.includes('netlify.app')) return NextResponse.next();

//   const url = req.nextUrl.clone();
//   url.pathname = `/customer/${subdomain}`;
//   return NextResponse.rewrite(url);
// }





// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const host = req.headers.get("host") || "";
  const subdomain = host.split(".")[0];

  const isDroppySub =
    host.endsWith(".droppy.kr") &&
    subdomain !== "www" &&
    subdomain !== "droppy";

  if (isDroppySub) {
    const url = req.nextUrl.clone();
    url.pathname = `/customer/${subdomain}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
