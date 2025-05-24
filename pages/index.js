// import { useEffect, useState } from "react";
// import CustomerContent from "@/components/CustomerContent"; // ✅ 고객 사이트 콘텐츠 컴포넌트
// import Head from "next/head";

// export default function Home() {
//   const [pageData, setPageData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPageData = async () => {
//       const subdomain = window.location.hostname.split(".")[0];
//       const domain = `${subdomain}.droppy.kr`;

//       try {
//         const res = await fetch(
//           `https://your-api-endpoint.com/api/getPageData?domain=${domain}`
//         );
//         const data = await res.json();
//         setPageData(data);
//       } catch (err) {
//         console.error("🔥 데이터 불러오기 실패:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPageData();
//   }, []);

//   if (loading) {
//     return <div style={{ padding: 100, textAlign: "center" }}>로딩 중...</div>;
//   }

//   if (!pageData) {
//     return <div style={{ padding: 100, textAlign: "center" }}>❌ 페이지를 찾을 수 없습니다</div>;
//   }

//   return (
//     <>
//       <Head>
//         <title>{pageData.title || "Droppy"}</title>
//       </Head>
//       <CustomerContent pageData={pageData} />
//     </>
//   );
// }








// // pages/index.js
// import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
// import { db } from "@/lib/firebase";
// import { collection, query, where, getDocs } from "firebase/firestore";

// const CustomerContent = dynamic(() => import("@/components/CustomerContent"), {
//   ssr: false,
//   loading: () => (
//     <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>
//       🔄 페이지 불러오는 중...
//     </div>
//   ),
// });

// export default function Home() {
//   const [pageData, setPageData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       const domain = "fallback.droppy.kr";

//       try {
//         const q = query(collection(db, "orders"), where("domain", "==", domain));
//         const snapshot = await getDocs(q);

//         if (!snapshot.empty) {
//           setPageData(snapshot.docs[0].data());
//         }
//       } catch (err) {
//         console.error("🔥 Firestore 데이터 로딩 실패:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>로딩 중...</div>;
//   }

//   if (!pageData) {
//     return <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>❌ 데이터를 찾을 수 없습니다</div>;
//   }

//   return <CustomerContent pageData={pageData} />;
// }






// // pages/index.js
// import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";

// const CustomerContent = dynamic(() => import("@/components/CustomerContent"), {
//   ssr: false,
//   loading: () => (
//     <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>
//       🔄 페이지 불러오는 중...
//     </div>
//   ),
// });

// export default function Home() {
//   const [pageData, setPageData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       const subdomain = window.location.hostname.split(".")[0];
//       const domain = `${subdomain}.droppy.kr`;

//       try {
//         const res = await fetch(
//           `https://autodeploy-zify4iutq-uc.a.run.app/getPageData?domain=${domain}`
//         );
//         const data = await res.json();

//         if (!data || data.error) {
//           throw new Error(data?.error || "데이터 없음");
//         }

//         setPageData(data);
//       } catch (err) {
//         console.error("🔥 데이터 불러오기 실패:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>
//         로딩 중...
//       </div>
//     );
//   }

//   if (!pageData) {
//     return (
//       <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>
//         ❌ 페이지를 찾을 수 없습니다
//       </div>
//     );
//   }

//   return <CustomerContent pageData={pageData} />;
// }







// import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";

// const CustomerContent = dynamic(() => import("@/components/CustomerContent"), {
//   ssr: false,
//   loading: () => (
//     <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>
//       🔄 페이지 불러오는 중...
//     </div>
//   ),
// });

// export default function Home() {
//   const [pageData, setPageData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       const subdomain = window.location.hostname.split(".")[0];
//       const domain = `${subdomain}.droppy.kr`;

//       try {
//         const res = await fetch(
//           `https://getpagedata-zify4iutq-uc.a.run.app?domain=${domain}`
//         );
//         const data = await res.json();

//         if (!data || data.error) {
//           throw new Error(data?.error || "데이터 없음");
//         }

//         setPageData(data);
//       } catch (err) {
//         console.error("🔥 데이터 불러오기 실패:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>
//         로딩 중...
//       </div>
//     );
//   }

//   if (!pageData) {
//     return (
//       <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>
//         ❌ 페이지를 찾을 수 없습니다
//       </div>
//     );
//   }

//   return <CustomerContent pageData={pageData} />;
// }









// import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";

// const CustomerContent = dynamic(() => import("@/components/CustomerContent"), {
//   ssr: false,
//   loading: () => (
//     <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>
//       🔄 페이지 불러오는 중...
//     </div>
//   ),
// });

// export default function Home() {
//   const [pageData, setPageData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       const subdomain = window.location.hostname.split(".")[0];
//       const domain = `${subdomain}.droppy.kr`;

//       try {
//         const res = await fetch(
//           `https://getpagedata-zify4iutq-uc.a.run.app?domain=${domain}`
//         );
//         const data = await res.json();

//         if (!data || data.error) {
//           throw new Error(data?.error || "데이터 없음");
//         }

//         setPageData(data);
//       } catch (err) {
//         console.error("🔥 데이터 불러오기 실패:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>
//         로딩 중...
//       </div>
//     );
//   }

//   if (!pageData) {
//     return (
//       <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>
//         ❌ 페이지를 찾을 수 없습니다
//       </div>
//     );
//   }

//   return <CustomerContent pageData={pageData} />;
// }







// import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";

// const CustomerContent = dynamic(() => import("@/components/CustomerContent"), {
//   ssr: false,
//   loading: () => (
//     <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>
//       🔄 페이지 불러오는 중...
//     </div>
//   ),
// });

// export default function Home() {
//   const [pageData, setPageData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       const subdomain = window.location.hostname.split(".")[0];
//       const domain = `${subdomain}.droppy.kr`;

//       try {
//         const res = await fetch(
//           `https://us-central1-salepage-f39a1.cloudfunctions.net/getPageData?domain=${domain}`
//         );
//         const data = await res.json();

//         if (!data || data.error) {
//           throw new Error(data?.error || "데이터 없음");
//         }

//         setPageData(data);
//       } catch (err) {
//         console.error("🔥 데이터 불러오기 실패:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>
//         로딩 중...
//       </div>
//     );
//   }

//   if (!pageData) {
//     return (
//       <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>
//         ❌ 페이지를 찾을 수 없습니다
//       </div>
//     );
//   }

//   return <CustomerContent pageData={pageData} />;
// }





import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const CustomerContent = dynamic(() => import("@/components/CustomerContent"), {
  ssr: false,
  loading: () => (
    <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>
      🔄 페이지 불러오는 중...
    </div>
  ),
});

export default function Home() {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // ✅ 클라이언트에서만 실행
      const hostname = window.location.hostname;
      const subdomain = hostname.split(".")[0];

      try {
        const res = await fetch(
          `https://getpagedata-zifyt4iutq-uc.a.run.app/getPageData?id=${subdomain}`
        );
        const result = await res.json();

        if (!result || result.error) {
          throw new Error(result?.error || "데이터 없음");
        }

        setPageData(result.data);
      } catch (err) {
        console.error("🔥 데이터 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  if (loading) {
    return (
      <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>
        로딩 중...
      </div>
    );
  }

  if (!pageData) {
    return (
      <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>
        ❌ 페이지를 찾을 수 없습니다
      </div>
    );
  }

  return <CustomerContent pageData={pageData} />;
}
