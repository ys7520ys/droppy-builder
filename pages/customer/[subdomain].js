// pages/customer/[subdomain].js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

// 비동기로 컴포넌트 로딩 (SSR 비활성화)
const CustomerContent = dynamic(() => import("@/components/CustomerContent"), {
  ssr: false,
  loading: () => (
    <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>
      🔄 페이지 불러오는 중...
    </div>
  ),
});

export default function CustomerPage() {
  const router = useRouter();
  const { subdomain } = router.query;

  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!subdomain) return;

    const fetchData = async () => {
      try {
        const fullDomain = `${subdomain}.droppy.kr`;
        const q = query(collection(db, "orders"), where("domain", "==", fullDomain));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          setPageData(doc.data());
        }
      } catch (err) {
        console.error("❌ Firestore 데이터 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subdomain]);

  if (loading) {
    return <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>⏳ 로딩 중...</div>;
  }

  if (!pageData) {
    return <div style={{ padding: "100px", textAlign: "center", color: "red" }}>⚠️ 페이지를 찾을 수 없습니다.</div>;
  }

  return <CustomerContent pageData={pageData} />;
}
