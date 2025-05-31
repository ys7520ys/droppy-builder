// pages/customer/fixed.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import dynamic from "next/dynamic";

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
      const q = query(collection(db, "orders"), where("domain", "==", `${subdomain}.droppy.kr`));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const doc = snapshot.docs[0].data();
        setPageData(doc);
      } else {
        setPageData("notfound");
      }
      setLoading(false);
    };

    fetchData();
  }, [subdomain]);

  if (loading) {
    return (
      <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>
        🔄 고객 콘텐츠 로딩 중...
      </div>
    );
  }

  if (pageData === "notfound") {
    return (
      <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}>
        ❌ 데이터를 찾을 수 없습니다.
      </div>
    );
  }

  return <CustomerContent data={pageData} />;
}
