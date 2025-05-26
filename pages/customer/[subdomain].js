  // // pages/customer/[subdomain].js

  // export default function CustomerPage({ data }) {
  //   if (!data) return <h1>데이터가 없습니다</h1>;

  //   return (
  //     <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
  //       <h1>{data.title}</h1>
  //       <p>{data.description}</p>
  //     </main>
  //   );
  // }

  // export async function getStaticPaths() {
  //   return {
  //     paths: [], // 고객 수 많을 수 있으므로 비워두고 fallback 처리
  //     fallback: "blocking",
  //   };
  // }

  // export async function getStaticProps({ params }) {
  //   const { subdomain } = params;

  //   try {
  //     const res = await fetch(
  //       `https://firestore.googleapis.com/v1/projects/salepage-f39a1/databases/(default)/documents/orders/${subdomain}`
  //     );
  //     const json = await res.json();

  //     if (!json.fields) return { notFound: true };

  //     const data = {
  //       title: json.fields.title?.stringValue || "제목 없음",
  //       description: json.fields.description?.stringValue || "설명 없음",
  //     };

  //     return {
  //       props: { data },
  //       revalidate: 60, // 🔁 60초 후 자동 리빌드
  //     };
  //   } catch (err) {
  //     console.error("🔥 getStaticProps 오류:", err);
  //     return { notFound: true };
  //   }
  // }




// // 05/25/04:38
// import { getFirestore } from "firebase-admin/firestore";
// import { initializeApp, applicationDefault } from "firebase-admin/app";

// const app = initializeApp({ credential: applicationDefault() });
// const db = getFirestore(app);

// export async function getStaticPaths() {
//   return {
//     paths: [],
//     fallback: "blocking",
//   };
// }

// export async function getStaticProps({ params }) {
//   const { subdomain } = params;

//   try {
//     const snapshot = await db
//       .collection("orders")
//       .where("domain", "==", `${subdomain}.droppy.kr`)
//       .get();

//     if (snapshot.empty) {
//       return { notFound: true };
//     }

//     const doc = snapshot.docs[0].data();

//     return {
//       props: {
//         data: doc,
//       },
//       revalidate: 60,
//     };
//   } catch (err) {
//     console.error("🔥 Firestore fetch error:", err);
//     return { notFound: true };
//   }
// }

// export default function CustomerPage({ data }) {
//   if (!data) return <h1>데이터가 없습니다</h1>;

//   return (
//     <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
//       <h1>{data?.user?.name || "고객 이름 없음"}</h1>
//       <p>{data.domain}</p>
//     </main>
//   );
// }


// pages/[...subdomain].js
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const app = initializeApp({ credential: applicationDefault() });
const db = getFirestore(app);

// ✅ SSR: 요청마다 Firestore에서 데이터 가져오기
export async function getServerSideProps({ req }) {
  const host = req.headers.host || "";
  const subdomain = host.split(".droppy.kr")[0]; // 예: ami.droppy.kr → ami

  if (!subdomain || host === "droppy.kr") {
    return { notFound: true };
  }

  try {
    const snapshot = await db
      .collection("orders")
      .where("domain", "==", `${subdomain}.droppy.kr`)
      .get();

    if (snapshot.empty) {
      return { notFound: true };
    }

    const doc = snapshot.docs[0].data();

    return {
      props: {
        data: doc,
      },
    };
  } catch (err) {
    console.error("🔥 Firestore fetch error:", err);
    return { notFound: true };
  }
}

export default function CustomerPage({ data }) {
  if (!data) return <h1>데이터가 없습니다</h1>;

  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>{data?.user?.name || "고객 이름 없음"}</h1>
      <p>{data.domain}</p>
    </main>
  );
}

