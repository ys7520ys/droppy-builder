// pages/customer/[subdomain].js

export default function CustomerPage({ data }) {
  if (!data) return <h1>데이터가 없습니다</h1>;

  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </main>
  );
}

export async function getStaticPaths() {
  return {
    paths: [], // 고객 수 많을 수 있으므로 비워두고 fallback 처리
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { subdomain } = params;

  try {
    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/salepage-f39a1/databases/(default)/documents/orders/${subdomain}`
    );
    const json = await res.json();

    if (!json.fields) return { notFound: true };

    const data = {
      title: json.fields.title?.stringValue || "제목 없음",
      description: json.fields.description?.stringValue || "설명 없음",
    };

    return {
      props: { data },
      revalidate: 60, // 🔁 60초 후 자동 리빌드
    };
  } catch (err) {
    console.error("🔥 getStaticProps 오류:", err);
    return { notFound: true };
  }
}
