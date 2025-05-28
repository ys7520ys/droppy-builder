// import dynamic from "next/dynamic";
// import { db } from "../../lib/firebase";
// import { collection, query, where, getDocs } from "firebase/firestore";

// // 컴포넌트는 여전히 dynamic import (CSR은 아니고 클라이언트 사이드 렌더링만 제어)
// const CustomerContent = dynamic(() => import("../../components/CustomerContent"), {
//   ssr: false,
//   loading: () => (
//     <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>
//       🔄 페이지 불러오는 중...
//     </div>
//   ),
// });

// export default function CustomerPage({ pageData }) {
//   if (!pageData) {
//     return <div style={{ padding: "100px", textAlign: "center", color: "red" }}>⚠️ 페이지를 찾을 수 없습니다.</div>;
//   }

//   return <CustomerContent pageData={pageData} />;
// }

// // ✅ 서버 사이드에서 Firestore 데이터 불러오기
// export async function getServerSideProps(context) {
//   const subdomain = context.params.subdomain;
//   const fullDomain = `${subdomain}.droppy.kr`;

//   try {
//     const q = query(collection(db, "orders"), where("domain", "==", fullDomain));
//     const snapshot = await getDocs(q);

//     if (snapshot.empty) {
//       return { props: { pageData: null } };
//     }

//     const doc = snapshot.docs[0];
//     return {
//       props: {
//         pageData: doc.data(),
//       },
//     };
//   } catch (error) {
//     console.error("❌ 서버에서 Firestore 불러오기 실패:", error);
//     return { props: { pageData: null } };
//   }
// }







// /pages/customer/[subdomain].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function CustomerPage() {
  const router = useRouter();
  const { subdomain } = router.query;
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!subdomain) return;

    const fetchData = async () => {
      const q = query(collection(db, "orders"), where("domain", "==", `${subdomain}.droppy.kr`));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const doc = snapshot.docs[0].data();
        setData(doc);
      } else {
        setData("notfound");
      }
    };

    fetchData();
  }, [subdomain]);

  if (data === null) return <div style={{ padding: 100 }}>로딩 중...</div>;
  if (data === "notfound") return <div style={{ padding: 100 }}>존재하지 않는 사이트입니다.</div>;

  return (
    <div style={{ padding: 100 }}>
      <h1>{data.user?.name}님의 사이트</h1>
      {/* 여기에 컴포넌트 기반으로 구성 */}
    </div>
  );
}
