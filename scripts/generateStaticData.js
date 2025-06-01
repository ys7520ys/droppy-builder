const fs = require("fs");
const path = require("path");
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");

// ✅ Firebase Admin 초기화
initializeApp({ credential: applicationDefault() });
const db = getFirestore();
const storage = getStorage();

async function generateStaticData() {
  const snapshot = await db.collection("orders").get();

  if (snapshot.empty) {
    console.log("❌ Firestore에서 데이터를 찾을 수 없습니다.");
    return;
  }

  const outputDir = path.join(__dirname, "../data");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  for (const doc of snapshot.docs) {
    const data = doc.data();
    const orderId = doc.id;
    const { pages = [], menuItems = [], headerType, domain } = data;

    // ✅ mediaPath → mediaUrl 자동 변환 처리
    for (const page of pages) {
      for (const comp of page.components || []) {
        if (comp.mediaPath) {
          try {
            const fileRef = storage.bucket().file(comp.mediaPath); // ex: videos/xxx.mp4
            const [url] = await fileRef.getSignedUrl({
              action: "read",
              expires: "2099-12-31",
            });
            comp.mediaUrl = url;
            delete comp.mediaPath;
            console.log(`🔗 mediaUrl 변환 완료: ${comp.type} → ${url}`);
          } catch (error) {
            console.error(`❌ mediaUrl 변환 실패: ${comp.mediaPath}`, error.message);
          }
        }
      }
    }

    const content = `export const customerData = ${JSON.stringify(
      { pages, menuItems, headerType, domain },
      null,
      2
    )};\n`;

    const filePath = path.join(outputDir, `${orderId}.js`);
    fs.writeFileSync(filePath, content, "utf-8");

    console.log(`✅ data/${orderId}.js 생성 완료`);
  }
}

generateStaticData();
