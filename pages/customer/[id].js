// pages/customer/[id].js

import dynamic from "next/dynamic";

// ✅ 정적 데이터 import (고객 데이터)
import { customerData as H8cmwCR0aM0tliiARRM6 } from "@/data/H8cmwCR0aM0tliiARRM6";

const dataMap = {
  H8cmwCR0aM0tliiARRM6,
};

// ✅ motion.div 대응을 위한 dynamic import
const CustomerContent = dynamic(() => import("@/components/CustomerContent"), {
  ssr: false,
  loading: () => <div style={{ padding: 100 }}>🔄 페이지 불러오는 중...</div>,
});

export default function CustomerPage({ pageData }) {
  if (!pageData) {
    return <div style={{ padding: 100 }}>❌ 해당 사이트를 찾을 수 없습니다.</div>;
  }

  return <CustomerContent pageData={pageData} />;
}

// ✅ 정적 export를 위한 동적 경로 정의
export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: "H8cmwCR0aM0tliiARRM6" } }, // ✅ 여기에 필요한 고객 ID 추가
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const pageData = dataMap[params.id] || null;
  return {
    props: {
      pageData,
    },
  };
}
