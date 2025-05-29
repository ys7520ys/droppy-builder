// const { onRequest } = require("firebase-functions/v2/https");
// const { defineSecret } = require("firebase-functions/params");
// const logger = require("firebase-functions/logger");
// const fetch = require("node-fetch");

// // 🔐 시크릿
// const NETLIFY_TOKEN = defineSecret("NETLIFY_TOKEN");
// const TEMPLATE_SITE_ID = "5783a3f4-7d24-4b2d-a9f7-24e70bbe5e5d"; // droppy-builder 템플릿

// exports.autoDeploy = onRequest(
//   {
//     cors: true,
//     secrets: [NETLIFY_TOKEN],
//   },
//   async (req, res) => {
//     logger.info("📥 요청 도착!");

//     // ✅ body 수동 파싱
//     const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
//     const { domain, orderId } = body;

//     logger.info("📦 받은 body:", body);

//     if (!domain || !orderId) {
//       logger.error("❗ 도메인 또는 주문 ID가 없음");
//       return res.status(400).json({ message: "❗ 도메인 또는 주문 ID가 누락되었습니다" });
//     }

//     try {
//       // ✅ 1. 템플릿 사이트 복제
//       const cloneRes = await fetch("https://api.netlify.com/api/v1/sites", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           site_id: TEMPLATE_SITE_ID,
//           name: domain.replace(".droppy.kr", ""),
//         }),
//       });

//       const cloneText = await cloneRes.text();
//       let cloneData;

//       try {
//         cloneData = JSON.parse(cloneText);
//       } catch (jsonErr) {
//         logger.error("❌ 복제 응답 JSON 파싱 실패:", cloneText);
//         return res.status(500).json({ message: "복제 응답 파싱 실패", raw: cloneText });
//       }

//       if (!cloneRes.ok) {
//         logger.error("❌ 사이트 복제 실패:", cloneData);
//         return res.status(500).json({ message: "사이트 복제 실패", error: cloneData });
//       }

//       logger.log("✅ 사이트 복제 성공:", cloneData);

//       // ✅ 2. 도메인 연결 (PATCH 방식으로)
//       const domainRes = await fetch(
//         `https://api.netlify.com/api/v1/sites/${cloneData.id}`,
//         {
//           method: "PATCH",
//           headers: {
//             Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             custom_domain: domain, // 예: shopy123.droppy.kr
//           }),
//         }
//       );

//       const domainText = await domainRes.text();
//       let domainData;

//       try {
//         domainData = JSON.parse(domainText);
//       } catch (jsonErr) {
//         logger.error("❌ 도메인 응답 JSON 파싱 실패:", domainText);
//         return res.status(500).json({ message: "도메인 응답 파싱 실패", raw: domainText });
//       }

//       if (!domainRes.ok) {
//         logger.error("❌ 도메인 연결 실패:", domainData);
//         return res.status(500).json({ message: "도메인 연결 실패", error: domainData });
//       }

//       logger.log("✅ 도메인 연결 성공:", domainData);

//       return res.status(200).json({
//         message: "✅ 사이트 복제 및 도메인 연결 완료",
//         siteUrl: cloneData.ssl_url,
//         domain,
//       });
//     } catch (err) {
//       logger.error("🔥 전체 오류:", err);
//       return res.status(500).json({ message: "서버 오류", error: err.message });
//     }
//   }
// );








































// const { onRequest } = require("firebase-functions/v2/https");
// const { defineSecret } = require("firebase-functions/params");
// const logger = require("firebase-functions/logger");
// const fetch = require("node-fetch");

// // 🔐 Netlify 토큰 및 템플릿 ID
// const NETLIFY_TOKEN = defineSecret("NETLIFY_TOKEN");
// const TEMPLATE_SITE_ID = "5783a3f4-7d24-4b2d-a9f7-24e70bbe5e5d";

// exports.autoDeploy = onRequest(
//   {
//     cors: true,
//     secrets: [NETLIFY_TOKEN],
//   },
//   async (req, res) => {
//     logger.info("📥 [1] 요청 도착!");

//     // ✅ body 수동 파싱 (string 또는 object 대응)
//     const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
//     const { domain, orderId } = body;
//     logger.info("📦 [2] 받은 body:", body);

//     if (!domain || !orderId) {
//       logger.error("❗ [3] 도메인 또는 주문 ID가 없음");
//       return res.status(400).json({ message: "❗ 도메인 또는 주문 ID가 누락되었습니다" });
//     }

//     try {
//       // ✅ [4] 템플릿 복제 요청
//       const cloneRes = await fetch("https://api.netlify.com/api/v1/sites", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           site_id: TEMPLATE_SITE_ID,
//           name: domain.replace(".droppy.kr", ""), // 하위 도메인 이름
//         }),
//       });

//       const cloneText = await cloneRes.text();
//       let cloneData;

//       try {
//         cloneData = JSON.parse(cloneText);
//       } catch (jsonErr) {
//         logger.error("❌ [5] 복제 응답 파싱 실패:", cloneText);
//         return res.status(500).json({ message: "복제 응답 파싱 실패", raw: cloneText });
//       }

//       if (!cloneRes.ok) {
//         logger.error("❌ [6] 사이트 복제 실패:", cloneData);
//         return res.status(500).json({ message: "사이트 복제 실패", error: cloneData });
//       }

//       logger.info("✅ [7] 사이트 복제 성공:", cloneData.name, cloneData.ssl_url);

//       // ✅ [8] custom_domain 연결 요청
//       const domainRes = await fetch(`https://api.netlify.com/api/v1/sites/${cloneData.id}`, {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           custom_domain: domain,
//         }),
//       });

//       const domainText = await domainRes.text();
//       let domainData;

//       try {
//         domainData = JSON.parse(domainText);
//       } catch (jsonErr) {
//         logger.error("❌ [9] 도메인 응답 파싱 실패:", domainText);
//         return res.status(500).json({ message: "도메인 응답 파싱 실패", raw: domainText });
//       }

//       if (!domainRes.ok) {
//         logger.error("❌ [10] 도메인 연결 실패:", domainData);
//         return res.status(500).json({ message: "도메인 연결 실패", error: domainData });
//       }

//       logger.info("✅ [11] 도메인 연결 성공:", domain);

//       // ✅ [12] 최종 성공 응답
//       return res.status(200).json({
//         message: "✅ 사이트 복제 및 도메인 연결 완료",
//         siteUrl: cloneData.ssl_url,
//         domain,
//       });

//     } catch (err) {
//       logger.error("🔥 [13] 전체 오류 발생:", err);
//       return res.status(500).json({ message: "서버 오류 발생", error: err.message });
//     }
//   }
// );










  // const { onRequest } = require("firebase-functions/v2/https");
  // const { defineSecret } = require("firebase-functions/params");
  // const logger = require("firebase-functions/logger");
  // const fetch = require("node-fetch");

  // const { initializeApp, applicationDefault } = require("firebase-admin/app");
  // const { getFirestore } = require("firebase-admin/firestore");

  // initializeApp({ credential: applicationDefault() });
  // const db = getFirestore();

  // // 🔐 Netlify용 시크릿
  // const NETLIFY_TOKEN = defineSecret("NETLIFY_TOKEN");
  // const TEMPLATE_SITE_ID = "5783a3f4-7d24-4b2d-a9f7-24e70bbe5e5d";

  // // ✅ [1] Netlify 사이트 복제 및 도메인 연결
  // exports.autoDeploy = onRequest(
  //   {
  //     cors: true,
  //     secrets: [NETLIFY_TOKEN],
  //   },
  //   async (req, res) => {
  //     logger.info("📥 [1] 요청 도착!");
  //     const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  //     const { domain, orderId } = body;
  //     logger.info("📦 [2] 받은 body:", body);

  //     if (!domain || !orderId) {
  //       logger.error("❗ 도메인 또는 주문 ID 누락");
  //       return res.status(400).json({ message: "❗ 도메인 또는 주문 ID가 누락되었습니다" });
  //     }

  //     try {
  //       const cloneRes = await fetch("https://api.netlify.com/api/v1/sites", {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           site_id: TEMPLATE_SITE_ID,
  //           name: domain.replace(".droppy.kr", ""),
  //         }),
  //       });

  //       const cloneText = await cloneRes.text();
  //       let cloneData;

  //       try {
  //         cloneData = JSON.parse(cloneText);
  //       } catch (jsonErr) {
  //         logger.error("❌ 복제 응답 파싱 실패:", cloneText);
  //         return res.status(500).json({ message: "복제 응답 파싱 실패", raw: cloneText });
  //       }

  //       if (!cloneRes.ok) {
  //         logger.error("❌ 사이트 복제 실패:", cloneData);
  //         return res.status(500).json({ message: "사이트 복제 실패", error: cloneData });
  //       }

  //       logger.info("✅ 사이트 복제 성공:", cloneData.name, cloneData.ssl_url);

  //       const domainRes = await fetch(`https://api.netlify.com/api/v1/sites/${cloneData.id}`, {
  //         method: "PATCH",
  //         headers: {
  //           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           custom_domain: domain,
  //         }),
  //       });

  //       const domainText = await domainRes.text();
  //       let domainData;

  //       try {
  //         domainData = JSON.parse(domainText);
  //       } catch (jsonErr) {
  //         logger.error("❌ 도메인 응답 파싱 실패:", domainText);
  //         return res.status(500).json({ message: "도메인 응답 파싱 실패", raw: domainText });
  //       }

  //       if (!domainRes.ok) {
  //         logger.error("❌ 도메인 연결 실패:", domainData);
  //         return res.status(500).json({ message: "도메인 연결 실패", error: domainData });
  //       }

  //       logger.info("✅ 도메인 연결 성공:", domain);

  //       return res.status(200).json({
  //         message: "✅ 사이트 복제 및 도메인 연결 완료",
  //         siteUrl: cloneData.ssl_url,
  //         domain,
  //       });

  //     } catch (err) {
  //       logger.error("🔥 전체 오류 발생:", err);
  //       return res.status(500).json({ message: "서버 오류 발생", error: err.message });
  //     }
  //   }
  // );

  // // ✅ [2] 고객용 페이지 데이터 조회 (CORS 허용)
  // exports.getPageData = onRequest(
  //   {
  //     cors: true,
  //   },
  //   async (req, res) => {
  //     const domain = req.query.domain;
  //     if (!domain) {
  //       return res.status(400).json({ error: "❗ 도메인이 누락되었습니다" });
  //     }

  //     try {
  //       const snapshot = await db
  //         .collection("orders")
  //         .where("domain", "==", domain)
  //         .limit(1)
  //         .get();

  //       if (snapshot.empty) {
  //         return res.status(404).json({ error: "❌ 페이지를 찾을 수 없습니다" });
  //       }

  //       const data = snapshot.docs[0].data();
  //       return res.status(200).json(data);
  //     } catch (err) {
  //       console.error("🔥 Firestore 조회 실패:", err);
  //       return res.status(500).json({ error: "서버 오류 발생", detail: err.message });
  //     }
  //   }
  // );








// 마지막 수정
// const { onRequest } = require("firebase-functions/v2/https");
// const { defineSecret } = require("firebase-functions/params");
// const logger = require("firebase-functions/logger");

// const { initializeApp, applicationDefault } = require("firebase-admin/app");
// const { getFirestore } = require("firebase-admin/firestore");

// const fs = require("fs");
// const path = require("path");
// const fetch = require("node-fetch");
// const { exec } = require("child_process");
// const archiver = require("archiver");

// initializeApp({ credential: applicationDefault() });
// const db = getFirestore();

// const NETLIFY_TOKEN = defineSecret("NETLIFY_TOKEN");

// exports.autoDeploy = onRequest(
//   {
//     cors: true,
//     secrets: [NETLIFY_TOKEN],
//   },
//   async (req, res) => {
//     logger.info("📥 autoDeploy 요청 도착!");
//     const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
//     const { domain, orderId } = body;

//     if (!domain || !orderId) {
//       return res.status(400).json({ message: "❗ 도메인 또는 주문 ID가 누락되었습니다" });
//     }

//     try {
//       const snapshot = await db.collection("orders").doc(orderId).get();
//       if (!snapshot.exists) {
//         return res.status(404).json({ message: "❌ 해당 주문이 존재하지 않습니다" });
//       }

//       const data = snapshot.data();

//       // ✅ 1. pageData.json 저장
//       const pageDataPath = path.join(__dirname, "../droppy-builder/public/pageData.json");
//       fs.writeFileSync(pageDataPath, JSON.stringify(data, null, 2));
//       logger.info("📦 pageData.json 저장 완료");

//       // ✅ 2. 빌드 실행
//       await runCommand("npm install", "../droppy-builder");
//       await runCommand("npm run build", "../droppy-builder");
//       logger.info("🏗️ 빌드 완료");

//       // ✅ 3. zip 압축
//       const outputZip = `/tmp/${orderId}.zip`;
//       await zipDirectory(path.join(__dirname, "../droppy-builder/out"), outputZip);
//       logger.info("📦 zip 파일 생성 완료");

//       // ✅ 4. Netlify 업로드
//       const siteRes = await fetch("https://api.netlify.com/api/v1/sites", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/zip",
//         },
//         body: fs.createReadStream(outputZip),
//       });

//       const siteData = await siteRes.json();
//       if (!siteRes.ok) {
//         logger.error("❌ Netlify 사이트 생성 실패:", siteData);
//         return res.status(500).json({ message: "Netlify 업로드 실패", error: siteData });
//       }

//       logger.info("✅ Netlify 사이트 생성 성공:", siteData.name);

//       // ✅ 5. 도메인 연결
//       const patchRes = await fetch(`https://api.netlify.com/api/v1/sites/${siteData.id}`, {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ custom_domain: domain }),
//       });

//       const patchData = await patchRes.json();
//       if (!patchRes.ok) {
//         logger.error("❌ 도메인 연결 실패:", patchData);
//         return res.status(500).json({ message: "도메인 연결 실패", error: patchData });
//       }

//       logger.info("✅ 도메인 연결 성공:", domain);
//       return res.status(200).json({
//         message: "✅ 사이트 배포 및 도메인 연결 완료",
//         url: patchData.ssl_url,
//         domain,
//       });

//     } catch (err) {
//       logger.error("🔥 전체 오류 발생:", err);
//       return res.status(500).json({ message: "서버 오류 발생", error: err.message });
//     }
//   }
// );

// function runCommand(command, cwd) {
//   return new Promise((resolve, reject) => {
//     exec(command, { cwd }, (error, stdout, stderr) => {
//       if (error) {
//         logger.error("❌ 명령어 실행 오류:", stderr);
//         return reject(stderr);
//       }
//       logger.info("📦 명령어 실행 성공:", command);
//       resolve(stdout);
//     });
//   });
// }

// function zipDirectory(sourceDir, outPath) {
//   return new Promise((resolve, reject) => {
//     const output = fs.createWriteStream(outPath);
//     const archive = archiver("zip", { zlib: { level: 9 } });

//     output.on("close", () => resolve());
//     archive.on("error", (err) => reject(err));

//     archive.pipe(output);
//     archive.directory(sourceDir, false);
//     archive.finalize();
//   });
// }

// // 마지막 수정2
// const { onRequest } = require("firebase-functions/v2/https");
// const { defineSecret } = require("firebase-functions/params");
// const logger = require("firebase-functions/logger");

// const { initializeApp, applicationDefault } = require("firebase-admin/app");
// const { getFirestore } = require("firebase-admin/firestore");

// const fs = require("fs");
// const path = require("path");
// const fetch = require("node-fetch");
// const { exec } = require("child_process");
// const archiver = require("archiver");

// initializeApp({ credential: applicationDefault() });
// const db = getFirestore();

// const NETLIFY_TOKEN = defineSecret("NETLIFY_TOKEN");

// exports.autoDeploy = onRequest(
//   {
//     cors: true,
//     secrets: [NETLIFY_TOKEN],
//   },
//   async (req, res) => {
//     logger.info("📥 autoDeploy 요청 도착!");
//     const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
//     const { domain, orderId } = body;

//     if (!domain || !orderId) {
//       return res.status(400).json({ message: "❗ 도메인 또는 주문 ID가 누락되었습니다" });
//     }

//     try {
//       const snapshot = await db.collection("orders").doc(orderId).get();
//       if (!snapshot.exists) {
//         return res.status(404).json({ message: "❌ 해당 주문이 존재하지 않습니다" });
//       }

//       const data = snapshot.data();

//       // ✅ 1. pageData.json을 /tmp 에 임시 저장
//       const tmpPath = path.join("/tmp", "pageData.json");
//       fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2));
//       logger.info("📦 /tmp/pageData.json 저장 완료");

//       // ✅ 2. droppy-builder/public 에 복사 (빌드에 사용됨)
//       const destPath = path.join(__dirname, "../droppy-builder/public/pageData.json");

//       // public 폴더가 없으면 생성
//       if (!fs.existsSync(path.dirname(destPath))) {
//         fs.mkdirSync(path.dirname(destPath), { recursive: true });
//       }

//       fs.copyFileSync(tmpPath, destPath);
//       logger.info("📄 public/pageData.json 복사 완료");

//       // ✅ 3. 빌드 실행
//       await runCommand("npm install", "../droppy-builder");
//       await runCommand("npm run build", "../droppy-builder");
//       logger.info("🏗️ 빌드 완료");

//       // ✅ 4. zip 압축
//       const outputZip = `/tmp/${orderId}.zip`;
//       await zipDirectory(path.join(__dirname, "../droppy-builder/out"), outputZip);
//       logger.info("📦 zip 파일 생성 완료");

//       // ✅ 5. Netlify에 업로드
//       const siteRes = await fetch("https://api.netlify.com/api/v1/sites", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/zip",
//         },
//         body: fs.createReadStream(outputZip),
//       });

//       const siteData = await siteRes.json();
//       if (!siteRes.ok) {
//         logger.error("❌ Netlify 사이트 생성 실패:", siteData);
//         return res.status(500).json({ message: "Netlify 업로드 실패", error: siteData });
//       }

//       logger.info("✅ Netlify 사이트 생성 성공:", siteData.name);

//       // ✅ 6. 도메인 연결
//       const patchRes = await fetch(`https://api.netlify.com/api/v1/sites/${siteData.id}`, {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ custom_domain: domain }),
//       });

//       const patchData = await patchRes.json();
//       if (!patchRes.ok) {
//         logger.error("❌ 도메인 연결 실패:", patchData);
//         return res.status(500).json({ message: "도메인 연결 실패", error: patchData });
//       }

//       logger.info("✅ 도메인 연결 성공:", domain);
//       return res.status(200).json({
//         message: "✅ 사이트 배포 및 도메인 연결 완료",
//         url: patchData.ssl_url,
//         domain,
//       });

//     } catch (err) {
//       logger.error("🔥 전체 오류 발생:", err);
//       return res.status(500).json({ message: "서버 오류 발생", error: err.message });
//     }
//   }
// );

// function runCommand(command, cwd) {
//   return new Promise((resolve, reject) => {
//     exec(command, { cwd }, (error, stdout, stderr) => {
//       if (error) {
//         logger.error("❌ 명령어 실행 오류:", stderr);
//         return reject(stderr);
//       }
//       logger.info("📦 명령어 실행 성공:", command);
//       resolve(stdout);
//     });
//   });
// }

// function zipDirectory(sourceDir, outPath) {
//   return new Promise((resolve, reject) => {
//     const output = fs.createWriteStream(outPath);
//     const archive = archiver("zip", { zlib: { level: 9 } });

//     output.on("close", () => resolve());
//     archive.on("error", (err) => reject(err));

//     archive.pipe(output);
//     archive.directory(sourceDir, false);
//     archive.finalize();
//   });
// }



// const { onRequest } = require("firebase-functions/v2/https");
// const { defineSecret } = require("firebase-functions/params");
// const logger = require("firebase-functions/logger");

// const { initializeApp, applicationDefault } = require("firebase-admin/app");
// const { getFirestore } = require("firebase-admin/firestore");

// const fs = require("fs");
// const path = require("path");
// const fetch = require("node-fetch");
// const { exec } = require("child_process");
// const archiver = require("archiver");

// initializeApp({ credential: applicationDefault() });
// const db = getFirestore();

// const NETLIFY_TOKEN = defineSecret("NETLIFY_TOKEN");

// exports.autoDeploy = onRequest(
//   {
//     cors: true,
//     secrets: [NETLIFY_TOKEN],
//   },
//   async (req, res) => {
//     logger.info("📥 autoDeploy 요청 도착!");
    
//     // ✅ 문자열 파싱 제거 → 객체 그대로 사용
//     const body = req.body;
//     const { domain, orderId } = body;

//     if (!domain || !orderId) {
//       logger.error("❗ 도메인 또는 주문 ID가 누락됨");
//       return res.status(400).json({ message: "❗ 도메인 또는 주문 ID가 누락되었습니다" });
//     }

//     try {
//       const snapshot = await db.collection("orders").doc(orderId).get();
//       if (!snapshot.exists) {
//         return res.status(404).json({ message: "❌ 해당 주문이 존재하지 않습니다" });
//       }

//       const data = snapshot.data();

//       // ✅ 1. pageData.json 임시 저장
//       const tmpPath = path.join("/tmp", "pageData.json");
//       fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2));
//       logger.info("📦 /tmp/pageData.json 저장 완료");

//       // ✅ 2. droppy-builder/public 에 복사
//       const destPath = path.join("/workspace/droppy-builder/public/pageData.json");

//       if (!fs.existsSync(path.dirname(destPath))) {
//         fs.mkdirSync(path.dirname(destPath), { recursive: true });
//       }

//       fs.copyFileSync(tmpPath, destPath);
//       logger.info("📄 public/pageData.json 복사 완료");

//       // ✅ 3. 빌드
//       await runCommand("npm install", "../droppy-builder");
//       await runCommand("npm run build", "../droppy-builder");
//       logger.info("🏗️ 빌드 완료");

//       // ✅ 4. 압축
//       const outputZip = `/tmp/${orderId}.zip`;
//       await zipDirectory(path.join(__dirname, "../droppy-builder/out"), outputZip);
//       logger.info("📦 zip 파일 생성 완료");

//       // ✅ 5. Netlify에 업로드
//       const siteRes = await fetch("https://api.netlify.com/api/v1/sites", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/zip",
//         },
//         body: fs.createReadStream(outputZip),
//       });

//       const siteData = await siteRes.json();
//       if (!siteRes.ok) {
//         logger.error("❌ Netlify 사이트 생성 실패:", siteData);
//         return res.status(500).json({ message: "Netlify 업로드 실패", error: siteData });
//       }

//       logger.info("✅ Netlify 사이트 생성 성공:", siteData.name);

//       // ✅ 6. 도메인 연결
//       const patchRes = await fetch(`https://api.netlify.com/api/v1/sites/${siteData.id}`, {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ custom_domain: domain }),
//       });

//       const patchData = await patchRes.json();
//       if (!patchRes.ok) {
//         logger.error("❌ 도메인 연결 실패:", patchData);
//         return res.status(500).json({ message: "도메인 연결 실패", error: patchData });
//       }

//       logger.info("✅ 도메인 연결 성공:", domain);
//       return res.status(200).json({
//         message: "✅ 사이트 배포 및 도메인 연결 완료",
//         url: patchData.ssl_url,
//         domain,
//       });

//     } catch (err) {
//       logger.error("🔥 전체 오류 발생:", err);
//       return res.status(500).json({ message: "서버 오류 발생", error: err.message });
//     }
//   }
// );

// // ✅ 명령어 실행 함수
// function runCommand(command, cwd) {
//   return new Promise((resolve, reject) => {
//     exec(command, { cwd }, (error, stdout, stderr) => {
//       if (error) {
//         logger.error("❌ 명령어 실행 오류:", stderr);
//         return reject(stderr);
//       }
//       logger.info("📦 명령어 실행 성공:", command);
//       resolve(stdout);
//     });
//   });
// }

// // ✅ 디렉토리 압축 함수
// function zipDirectory(sourceDir, outPath) {
//   return new Promise((resolve, reject) => {
//     const output = fs.createWriteStream(outPath);
//     const archive = archiver("zip", { zlib: { level: 9 } });

//     output.on("close", () => resolve());
//     archive.on("error", (err) => reject(err));

//     archive.pipe(output);
//     archive.directory(sourceDir, false);
//     archive.finalize();
//   });
// }





// 05/21 수정1
// const { onRequest } = require("firebase-functions/v2/https");
// const { defineSecret } = require("firebase-functions/params");
// const logger = require("firebase-functions/logger");

// const { initializeApp, applicationDefault } = require("firebase-admin/app");
// const { getFirestore } = require("firebase-admin/firestore");

// const fs = require("fs");
// const path = require("path");
// const fetch = require("node-fetch");
// const { exec } = require("child_process");
// const archiver = require("archiver");

// initializeApp({ credential: applicationDefault() });
// const db = getFirestore();

// const NETLIFY_TOKEN = defineSecret("NETLIFY_TOKEN");

// // ✅ autoDeploy 함수
// exports.autoDeploy = onRequest(
//   {
//     cors: true,
//     secrets: [NETLIFY_TOKEN],
//   },
//   async (req, res) => {
//     logger.info("📥 autoDeploy 요청 도착!");
    
//     const body = req.body;
//     const { domain, orderId } = body;

//     if (!domain || !orderId) {
//       logger.error("❗ 도메인 또는 주문 ID가 누락됨");
//       return res.status(400).json({ message: "❗ 도메인 또는 주문 ID가 누락되었습니다" });
//     }

//     try {
//       const snapshot = await db.collection("orders").doc(orderId).get();
//       if (!snapshot.exists) {
//         return res.status(404).json({ message: "❌ 해당 주문이 존재하지 않습니다" });
//       }

//       const data = snapshot.data();

//       const tmpPath = path.join("/tmp", "pageData.json");
//       fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2));
//       logger.info("📦 /tmp/pageData.json 저장 완료");

//       const destPath = path.join("/workspace/droppy-builder/public/pageData.json");

//       if (!fs.existsSync(path.dirname(destPath))) {
//         fs.mkdirSync(path.dirname(destPath), { recursive: true });
//       }

//       fs.copyFileSync(tmpPath, destPath);
//       logger.info("📄 public/pageData.json 복사 완료");

//       await runCommand("npm install", "../droppy-builder");
//       await runCommand("npm run build", "../droppy-builder");
//       logger.info("🏗️ 빌드 완료");

//       const outputZip = `/tmp/${orderId}.zip`;
//       await zipDirectory(path.join(__dirname, "../droppy-builder/out"), outputZip);
//       logger.info("📦 zip 파일 생성 완료");

//       const siteRes = await fetch("https://api.netlify.com/api/v1/sites", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/zip",
//         },
//         body: fs.createReadStream(outputZip),
//       });

//       const siteData = await siteRes.json();
//       if (!siteRes.ok) {
//         logger.error("❌ Netlify 사이트 생성 실패:", siteData);
//         return res.status(500).json({ message: "Netlify 업로드 실패", error: siteData });
//       }

//       logger.info("✅ Netlify 사이트 생성 성공:", siteData.name);

//       const patchRes = await fetch(`https://api.netlify.com/api/v1/sites/${siteData.id}`, {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ custom_domain: domain }),
//       });

//       const patchData = await patchRes.json();
//       if (!patchRes.ok) {
//         logger.error("❌ 도메인 연결 실패:", patchData);
//         return res.status(500).json({ message: "도메인 연결 실패", error: patchData });
//       }

//       logger.info("✅ 도메인 연결 성공:", domain);
//       return res.status(200).json({
//         message: "✅ 사이트 배포 및 도메인 연결 완료",
//         url: patchData.ssl_url,
//         domain,
//       });

//     } catch (err) {
//       logger.error("🔥 전체 오류 발생:", err);
//       return res.status(500).json({ message: "서버 오류 발생", error: err.message });
//     }
//   }
// );

// // ✅ getPageData 함수 추가
// exports.getPageData = onRequest(async (req, res) => {
//   res.set("Access-Control-Allow-Origin", "*"); // CORS 허용

//   const domain = req.query.domain;

//   if (!domain) {
//     return res.status(400).json({ message: "❗ domain 쿼리 누락됨" });
//   }

//   try {
//     const snapshot = await db
//       .collection("orders")
//       .where("domain", "==", domain)
//       .limit(1)
//       .get();

//     if (snapshot.empty) {
//       return res.status(404).json({ message: "❌ 해당 도메인의 데이터가 존재하지 않습니다" });
//     }

//     const doc = snapshot.docs[0].data();

//     return res.status(200).json({
//       status: "success",
//       domain,
//       data: doc,
//     });
//   } catch (error) {
//     logger.error("❌ getPageData 오류:", error);
//     return res.status(500).json({ message: "서버 오류 발생", error: error.message });
//   }
// });

// // ✅ 명령어 실행 함수
// function runCommand(command, cwd) {
//   return new Promise((resolve, reject) => {
//     exec(command, { cwd }, (error, stdout, stderr) => {
//       if (error) {
//         logger.error("❌ 명령어 실행 오류:", stderr);
//         return reject(stderr);
//       }
//       logger.info("📦 명령어 실행 성공:", command);
//       resolve(stdout);
//     });
//   });
// }

// // ✅ 디렉토리 압축 함수
// function zipDirectory(sourceDir, outPath) {
//   return new Promise((resolve, reject) => {
//     const output = fs.createWriteStream(outPath);
//     const archive = archiver("zip", { zlib: { level: 9 } });

//     output.on("close", () => resolve());
//     archive.on("error", (err) => reject(err));

//     archive.pipe(output);
//     archive.directory(sourceDir, false);
//     archive.finalize();
//   });
// }






// const { onRequest } = require("firebase-functions/v2/https");
// const { defineSecret } = require("firebase-functions/params");
// const logger = require("firebase-functions/logger");

// const { initializeApp, applicationDefault } = require("firebase-admin/app");
// const { getFirestore } = require("firebase-admin/firestore");

// const fs = require("fs");
// const path = require("path");
// const fetch = require("node-fetch");
// const { exec } = require("child_process");
// const archiver = require("archiver");

// initializeApp({ credential: applicationDefault() });
// const db = getFirestore();

// const NETLIFY_TOKEN = defineSecret("NETLIFY_TOKEN");

// // ✅ autoDeploy 함수
// exports.autoDeploy = onRequest(
//   {
//     cors: true,
//     secrets: [NETLIFY_TOKEN],
//   },
//   async (req, res) => {
//     logger.info("📥 autoDeploy 요청 도착!");

//     // ✅ 문자열 파싱 처리 (중요)
//     const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
//     const { domain, orderId } = body;

//     if (!domain || !orderId) {
//       logger.error("❗ 도메인 또는 주문 ID가 누락됨");
//       return res.status(400).json({ message: "❗ 도메인 또는 주문 ID가 누락되었습니다" });
//     }

//     try {
//       const snapshot = await db.collection("orders").doc(orderId).get();
//       if (!snapshot.exists) {
//         return res.status(404).json({ message: "❌ 해당 주문이 존재하지 않습니다" });
//       }

//       const data = snapshot.data();

//       // ✅ pageData 저장
//       const tmpPath = path.join("/tmp", "pageData.json");
//       fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2));
//       logger.info("📦 /tmp/pageData.json 저장 완료");

//       const destPath = path.join("/workspace/droppy-builder/public/pageData.json");
//       if (!fs.existsSync(path.dirname(destPath))) {
//         fs.mkdirSync(path.dirname(destPath), { recursive: true });
//       }
//       fs.copyFileSync(tmpPath, destPath);
//       logger.info("📄 public/pageData.json 복사 완료");

//       // ✅ 빌드
//       await runCommand("npm install", "../droppy-builder");
//       await runCommand("npm run build", "../droppy-builder");
//       logger.info("🏗️ 빌드 완료");

//       // ✅ 압축
//       const outputZip = `/tmp/${orderId}.zip`;
//       await zipDirectory(path.join(__dirname, "../droppy-builder/out"), outputZip);
//       logger.info("📦 zip 파일 생성 완료");

//       // ✅ Netlify 업로드
//       const siteRes = await fetch("https://api.netlify.com/api/v1/sites", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/zip",
//         },
//         body: fs.createReadStream(outputZip),
//       });

//       const siteData = await siteRes.json();
//       if (!siteRes.ok) {
//         logger.error("❌ Netlify 사이트 생성 실패:", siteData);
//         return res.status(500).json({ message: "Netlify 업로드 실패", error: siteData });
//       }

//       logger.info("✅ Netlify 사이트 생성 성공:", siteData.name);

//       // ✅ 도메인 연결
//       const patchRes = await fetch(`https://api.netlify.com/api/v1/sites/${siteData.id}`, {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ custom_domain: domain }),
//       });

//       const patchData = await patchRes.json();
//       if (!patchRes.ok) {
//         logger.error("❌ 도메인 연결 실패:", patchData);
//         return res.status(500).json({ message: "도메인 연결 실패", error: patchData });
//       }

//       logger.info("✅ 도메인 연결 성공:", domain);
//       return res.status(200).json({
//         message: "✅ 사이트 배포 및 도메인 연결 완료",
//         url: patchData.ssl_url,
//         domain,
//       });
//     } catch (err) {
//       logger.error("🔥 전체 오류 발생:", err);
//       return res.status(500).json({ message: "서버 오류 발생", error: err.message });
//     }
//   }
// );

// // ✅ getPageData 함수
// exports.getPageData = onRequest(async (req, res) => {
//   res.set("Access-Control-Allow-Origin", "*");

//   const domain = req.query.domain;
//   if (!domain) {
//     return res.status(400).json({ message: "❗ domain 쿼리 누락됨" });
//   }

//   try {
//     const snapshot = await db
//       .collection("orders")
//       .where("domain", "==", domain)
//       .limit(1)
//       .get();

//     if (snapshot.empty) {
//       return res.status(404).json({ message: "❌ 해당 도메인의 데이터가 존재하지 않습니다" });
//     }

//     const doc = snapshot.docs[0].data();
//     return res.status(200).json({
//       status: "success",
//       domain,
//       data: doc,
//     });
//   } catch (error) {
//     logger.error("❌ getPageData 오류:", error);
//     return res.status(500).json({ message: "서버 오류 발생", error: error.message });
//   }
// });

// // ✅ 명령어 실행 함수
// function runCommand(command, cwd) {
//   return new Promise((resolve, reject) => {
//     exec(command, { cwd }, (error, stdout, stderr) => {
//       if (error) {
//         logger.error("❌ 명령어 실행 오류:", stderr);
//         return reject(stderr);
//       }
//       logger.info("📦 명령어 실행 성공:", command);
//       resolve(stdout);
//     });
//   });
// }

// // ✅ 디렉토리 압축 함수
// function zipDirectory(sourceDir, outPath) {
//   return new Promise((resolve, reject) => {
//     const output = fs.createWriteStream(outPath);
//     const archive = archiver("zip", { zlib: { level: 9 } });

//     output.on("close", () => resolve());
//     archive.on("error", (err) => reject(err));

//     archive.pipe(output);
//     archive.directory(sourceDir, false);
//     archive.finalize();
//   });
// }



// const { onRequest } = require("firebase-functions/v2/https");
// const { defineSecret } = require("firebase-functions/params");
// const logger = require("firebase-functions/logger");

// const { initializeApp, applicationDefault } = require("firebase-admin/app");
// const { getFirestore } = require("firebase-admin/firestore");

// const fs = require("fs");
// const path = require("path");
// const fetch = require("node-fetch");
// const { exec } = require("child_process");
// const archiver = require("archiver");

// initializeApp({ credential: applicationDefault() });
// const db = getFirestore();

// const NETLIFY_TOKEN = defineSecret("NETLIFY_TOKEN");

// // ✅ autoDeploy 함수
// exports.autoDeploy = onRequest(
//   {
//     cors: true,
//     secrets: [NETLIFY_TOKEN],
//   },
//   async (req, res) => {
//     logger.info("📥 autoDeploy 요청 도착!");

//     const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
//     const { domain, orderId } = body;

//     if (!domain || !orderId) {
//       logger.error("❗ 도메인 또는 주문 ID가 누락됨");
//       return res.status(400).json({ message: "❗ 도메인 또는 주문 ID가 누락되었습니다" });
//     }

//     try {
//       const snapshot = await db.collection("orders").doc(orderId).get();
//       if (!snapshot.exists) {
//         return res.status(404).json({ message: "❌ 해당 주문이 존재하지 않습니다" });
//       }

//       const data = snapshot.data();

//       const tmpPath = path.join("/tmp", "pageData.json");
//       fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2));
//       logger.info("📦 /tmp/pageData.json 저장 완료");

//       const destPath = path.join("/workspace/droppy-builder/public/pageData.json");
//       if (!fs.existsSync(path.dirname(destPath))) {
//         fs.mkdirSync(path.dirname(destPath), { recursive: true });
//       }
//       fs.copyFileSync(tmpPath, destPath);
//       logger.info("📄 public/pageData.json 복사 완료");

//       await runCommand("npm install", "../droppy-builder");
//       await runCommand("npm run build", "../droppy-builder");
//       logger.info("🏗️ 빌드 완료");

//       const outputZip = `/tmp/${orderId}.zip`;
//       await zipDirectory(path.join(__dirname, "../droppy-builder/out"), outputZip);
//       logger.info("📦 zip 파일 생성 완료");

//       const siteRes = await fetch("https://api.netlify.com/api/v1/sites", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/zip",
//         },
//         body: fs.createReadStream(outputZip),
//       });

//       const siteData = await siteRes.json();
//       if (!siteRes.ok) {
//         logger.error("❌ Netlify 사이트 생성 실패:", siteData);
//         return res.status(500).json({ message: "Netlify 업로드 실패", error: siteData });
//       }

//       logger.info("✅ Netlify 사이트 생성 성공:", siteData.name);

//       const patchRes = await fetch(`https://api.netlify.com/api/v1/sites/${siteData.id}`, {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ custom_domain: domain }),
//       });

//       const patchData = await patchRes.json();
//       if (!patchRes.ok) {
//         logger.error("❌ 도메인 연결 실패:", patchData);
//         return res.status(500).json({ message: "도메인 연결 실패", error: patchData });
//       }

//       logger.info("✅ 도메인 연결 성공:", domain);
//       return res.status(200).json({
//         message: "✅ 사이트 배포 및 도메인 연결 완료",
//         url: patchData.ssl_url,
//         domain,
//       });
//     } catch (err) {
//       logger.error("🔥 전체 오류 발생:", err);
//       return res.status(500).json({ message: "서버 오류 발생", error: err.message });
//     }
//   }
// );

// // ✅ getPageData: ID 기반 조회
// exports.getPageData = onRequest(async (req, res) => {
//   res.set("Access-Control-Allow-Origin", "*");

//   const orderId = req.query.id;
//   if (!orderId) {
//     return res.status(400).json({ message: "❗ orderId 쿼리 누락됨" });
//   }

//   try {
//     const docRef = db.collection("orders").doc(orderId);
//     const snapshot = await docRef.get();

//     if (!snapshot.exists) {
//       return res.status(404).json({ message: "❌ 해당 주문 ID의 데이터가 존재하지 않습니다" });
//     }

//     const doc = snapshot.data();

//     return res.status(200).json({
//       status: "success",
//       orderId,
//       data: doc,
//     });
//   } catch (error) {
//     logger.error("❌ getPageData 오류:", error);
//     return res.status(500).json({ message: "서버 오류 발생", error: error.message });
//   }
// });

// // ✅ 명령어 실행 함수
// function runCommand(command, cwd) {
//   return new Promise((resolve, reject) => {
//     exec(command, { cwd }, (error, stdout, stderr) => {
//       if (error) {
//         logger.error("❌ 명령어 실행 오류:", stderr);
//         return reject(stderr);
//       }
//       logger.info("📦 명령어 실행 성공:", command);
//       resolve(stdout);
//     });
//   });
// }

// // ✅ 디렉토리 압축 함수
// function zipDirectory(sourceDir, outPath) {
//   return new Promise((resolve, reject) => {
//     const output = fs.createWriteStream(outPath);
//     const archive = archiver("zip", { zlib: { level: 9 } });

//     output.on("close", () => resolve());
//     archive.on("error", (err) => reject(err));

//     archive.pipe(output);
//     archive.directory(sourceDir, false);
//     archive.finalize();
//   });
// }


// // 05/24/01:42
// // ✅ Firebase Function (functions/index.js)
// const { onRequest } = require("firebase-functions/v2/https");
// const { defineSecret } = require("firebase-functions/params");
// const logger = require("firebase-functions/logger");
// const { initializeApp, applicationDefault } = require("firebase-admin/app");
// const { getFirestore } = require("firebase-admin/firestore");
// const fetch = require("node-fetch");

// // 🔐 Build Hook 시크릿
// const BUILD_HOOK_URL = defineSecret("BUILD_HOOK_URL");

// // ✅ Firebase 초기화
// initializeApp({ credential: applicationDefault() });
// const db = getFirestore();


// // ✅ 1. 주문 → 자동 배포 함수
// exports.autoDeploy = onRequest(
//   {
//     cors: true,
//     secrets: [BUILD_HOOK_URL],
//   },
//   async (req, res) => {
//     const { domain, orderId } = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

//     if (!domain || !orderId) {
//       logger.error("❗ 도메인 또는 주문 ID가 누락되었습니다");
//       return res.status(400).json({ message: "❗ 도메인 또는 주문 ID가 누락되었습니다" });
//     }

//     try {
//       const docRef = db.collection("orders").doc(orderId);
//       const snap = await docRef.get();

//       if (!snap.exists) {
//         return res.status(404).json({ message: "❌ 주문 데이터를 찾을 수 없습니다" });
//       }

//       logger.info("📦 주문 데이터 확인 완료, Netlify 빌드 트리거 시작");

//       const buildRes = await fetch(BUILD_HOOK_URL.value(), {
//         method: "POST",
//       });

//       if (!buildRes.ok) {
//         const errText = await buildRes.text();
//         logger.error("❌ Netlify Build Hook 실패:", errText);
//         return res.status(500).json({ message: "Netlify Build Hook 호출 실패", detail: errText });
//       }

//       logger.info("✅ Netlify Build Hook 호출 성공");
//       return res.status(200).json({ message: "✅ 사이트 빌드 트리거 완료", domain });
//     } catch (err) {
//       logger.error("🔥 전체 오류 발생:", err);
//       return res.status(500).json({ message: "서버 오류 발생", error: err.message });
//     }
//   }
// );


// // ✅ 2. 주문 ID로 데이터 조회 (미리 보기용)
// exports.getPageData = onRequest(
//   {
//     cors: true,
//   },
//   async (req, res) => {
//     try {
//       // ✅ URL에서 직접 id 파라미터 파싱
//       const url = new URL(req.url, `http://${req.headers.host}`);
//       const id = url.searchParams.get("id");

//       if (!id) {
//         logger.error("❗ ID 누락");
//         return res.status(400).json({ error: "❗ id 파라미터가 필요합니다" });
//       }

//       const docRef = db.collection("orders").doc(id);
//       const snap = await docRef.get();

//       if (!snap.exists) {
//         return res.status(404).json({ error: "❌ 해당 ID의 주문 데이터를 찾을 수 없습니다" });
//       }

//       return res.status(200).json({ data: snap.data() });
//     } catch (err) {
//       logger.error("🔥 getPageData 오류:", err);
//       return res.status(500).json({ error: "🔥 서버 오류", message: err.message });
//     }
//   }
// );








// const { onRequest } = require("firebase-functions/v2/https");
// const { defineSecret } = require("firebase-functions/params");
// const logger = require("firebase-functions/logger");
// const { initializeApp, applicationDefault } = require("firebase-admin/app");
// const { getFirestore } = require("firebase-admin/firestore");
// const fs = require("fs");
// const path = require("path");
// const fetch = require("node-fetch");
// const archiver = require("archiver");

// const NETLIFY_TOKEN = defineSecret("NETLIFY_TOKEN");

// initializeApp({ credential: applicationDefault() });
// const db = getFirestore();

// // ✅ (삭제됨) _next, 404 같은 폴더는 Netlify가 필요로 하므로 지우지 않음

// exports.autoDeploy = onRequest(
//   {
//     cors: true,
//     secrets: [NETLIFY_TOKEN],
//   },
//   async (req, res) => {
//     const { domain, orderId } = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

//     if (!domain || !orderId) {
//       logger.error("❗ 도메인 또는 주문 ID가 누락되었습니다");
//       return res.status(400).json({ message: "❗ 도메인 또는 주문 ID가 누락되었습니다" });
//     }

//     try {
//       const docRef = db.collection("orders").doc(orderId);
//       const snap = await docRef.get();

//       if (!snap.exists) {
//         return res.status(404).json({ message: "❌ 주문 데이터를 찾을 수 없습니다" });
//       }

//       const orderData = snap.data();
//       const subdomain = domain.split(".")[0];

//       // ✅ 1. pageData.json 저장
//       const dataDir = "/tmp/data";
//       const dataPath = path.join(dataDir, "pageData.json");

//       if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

//       let allData = {};
//       if (fs.existsSync(dataPath)) {
//         allData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
//       }

//       allData[orderId] = orderData;
//       fs.writeFileSync(dataPath, JSON.stringify(allData, null, 2));
//       logger.info("📄 pageData.json 저장 완료");

//       // ✅ 2. Netlify 사이트 생성
//       const createSiteRes = await fetch("https://api.netlify.com/api/v1/sites", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: `${subdomain}-${Date.now()}`,
//         }),
//       });

//       if (!createSiteRes.ok) {
//         const errorText = await createSiteRes.text();
//         logger.error("❌ Netlify 사이트 생성 실패:", errorText);
//         return res.status(500).json({ message: "사이트 생성 실패", detail: errorText });
//       }

//       const createdSite = await createSiteRes.json();
//       const siteId = createdSite.id;

//       // ✅ 3. out 폴더 압축 (out 내부 내용만 루트에 위치)
//       const zipPath = `/tmp/${subdomain}-site.zip`;
//       const outPath = path.join(__dirname, "../../droppy-builder/out");

//       await zipFolder(outPath, zipPath);
//       logger.info("🗜 zip 파일 생성 완료:", zipPath);

//       // ✅ 4. zip 업로드 (Content-Type: application/zip 추가)
//       const uploadRes = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/deploys`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/zip",
//         },
//         body: fs.createReadStream(zipPath),
//       });

//       const deployResult = await uploadRes.json();
//       logger.info("🚀 배포 완료:", deployResult.deploy_ssl_url);

//       // ✅ 5. 도메인 연결
//       await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/domains`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ domain }),
//       });

//       logger.info("🌐 도메인 연결 완료");

//       return res.status(200).json({
//         message: "✅ 사이트 생성 및 배포 완료",
//         url: `https://${domain}`,
//       });
//     } catch (err) {
//       logger.error("🔥 오류 발생:", err);
//       return res.status(500).json({ message: "서버 오류 발생", error: err.message });
//     }
//   }
// );

// // ✅ zip 유틸 함수 (압축 성공 로그 추가)
// function zipFolder(source, outPath) {
//   return new Promise((resolve, reject) => {
//     const output = fs.createWriteStream(outPath);
//     const archive = archiver("zip", { zlib: { level: 9 } });

//     output.on("close", () => {
//       logger.info(`✅ 압축 완료 - ${archive.pointer()} bytes`);
//       resolve();
//     });

//     archive.on("error", (err) => {
//       logger.error("❌ 압축 중 오류 발생:", err);
//       reject(err);
//     });

//     archive.pipe(output);
//     archive.directory(source, false); // ✅ out 폴더의 내부만 압축 (루트에 위치)
//     archive.finalize();
//   });
// }


//빌드 훅 적용
// const { onRequest } = require("firebase-functions/v2/https");
// const { defineSecret } = require("firebase-functions/params");
// const logger = require("firebase-functions/logger");
// const { initializeApp, applicationDefault } = require("firebase-admin/app");
// const { getFirestore } = require("firebase-admin/firestore");
// const fetch = require("node-fetch");

// const BUILD_HOOK_URL = defineSecret("BUILD_HOOK_URL");

// initializeApp({ credential: applicationDefault() });
// const db = getFirestore();

// exports.autoDeploy = onRequest(
//   {
//     cors: true,
//     secrets: [BUILD_HOOK_URL],
//   },
//   async (req, res) => {
//     const { domain, orderId } = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

//     if (!domain || !orderId) {
//       logger.error("❗ 도메인 또는 주문 ID가 누락되었습니다");
//       return res.status(400).json({ message: "❗ 도메인 또는 주문 ID가 누락되었습니다" });
//     }

//     try {
//       const docRef = db.collection("orders").doc(orderId);
//       const snap = await docRef.get();

//       if (!snap.exists) {
//         return res.status(404).json({ message: "❌ 주문 데이터를 찾을 수 없습니다" });
//       }

//       const orderData = snap.data();

//       // ✅ 필요하면 여기에 Firestore에 pageData.json 저장 등 추가 가능

//       // ✅ Build Hook 호출
//       const hookRes = await fetch(BUILD_HOOK_URL.value(), { method: "POST" });

//       if (!hookRes.ok) {
//         const error = await hookRes.text();
//         logger.error("❌ Build Hook 호출 실패:", error);
//         return res.status(500).json({ message: "Build Hook 호출 실패", detail: error });
//       }

//       logger.info("🚀 Netlify Build Hook 호출 완료");
//       return res.status(200).json({ message: "✅ Build Hook 호출 성공" });

//     } catch (err) {
//       logger.error("🔥 오류 발생:", err);
//       return res.status(500).json({ message: "서버 오류 발생", error: err.message });
//     }
//   }
// );








// const { onRequest } = require("firebase-functions/v2/https");
// const { defineSecret } = require("firebase-functions/params");
// const logger = require("firebase-functions/logger");
// const { initializeApp, applicationDefault } = require("firebase-admin/app");
// const { getFirestore } = require("firebase-admin/firestore");
// const fetch = require("node-fetch");

// // ✅ 시크릿 설정
// const BUILD_HOOK_URL  = defineSecret("BUILD_HOOK_URL");
// const NETLIFY_TOKEN   = defineSecret("NETLIFY_TOKEN");
// const NETLIFY_ZONE_ID = "681f82f7f9e4f8459c00cd6c"; // 예: "681f82f7f9e4f8459c00cd6c"

// initializeApp({ credential: applicationDefault() });
// const db = getFirestore();

// exports.autoDeploy = onRequest(
//   {
//     cors: true,
//     secrets: [BUILD_HOOK_URL, NETLIFY_TOKEN],
//   },
//   async (req, res) => {
//     const { domain, orderId } = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

//     if (!domain || !orderId) {
//       logger.error("❗ 도메인 또는 주문 ID가 누락되었습니다");
//       return res.status(400).json({ message: "❗ 도메인 또는 주문 ID가 누락되었습니다" });
//     }

//     try {
//       // 🔍 1. Firestore 주문 데이터 확인
//       const snap = await db.collection("orders").doc(orderId).get();
//       if (!snap.exists) {
//         return res.status(404).json({ message: "❌ 주문 데이터를 찾을 수 없습니다" });
//       }
//       const orderData = snap.data();
//       logger.info("📦 주문 데이터 로드 완료", orderData);

//       // 🚀 2. Netlify Build Hook 호출
//       const hookRes = await fetch(BUILD_HOOK_URL.value(), { method: "POST" });
//       if (!hookRes.ok) {
//         const error = await hookRes.text();
//         logger.error("❌ Build Hook 호출 실패:", error);
//         return res.status(500).json({ message: "Build Hook 호출 실패", detail: error });
//       }
//       logger.info("✅ Netlify Build Hook 호출 성공");

//       // 🌐 3. DNS 레코드 등록
//       const subdomain = domain.split(".")[0]; // abc.droppy.kr → abc
//       const dnsRes = await fetch(`https://api.netlify.com/api/v1/dns_zones/${NETLIFY_ZONE_ID}/dns_records`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           type: "CNAME",
//           name: subdomain,
//           value: "droppy-main.netlify.app", // ← 이건 메인 사이트 주소
//           ttl: 3600,
//         }),
//       });

//       if (!dnsRes.ok) {
//         const error = await dnsRes.text();
//         logger.error("❌ DNS 레코드 등록 실패:", error);
//         return res.status(500).json({ message: "DNS 등록 실패", detail: error });
//       }

//       logger.info(`🌐 DNS 등록 성공: ${domain} → droppy-main.netlify.app`);

//       // ✅ 4. 최종 응답
//       return res.status(200).json({
//         message: "🎉 사이트 생성 및 도메인 연결 성공",
//         url: `https://${domain}`,
//       });

//     } catch (err) {
//       logger.error("🔥 서버 오류:", err);
//       return res.status(500).json({ message: "서버 오류 발생", error: err.message });
//     }
//   }
// );


// DNS 자동 등록의 기능을 잠시 제거함
// const { onRequest } = require("firebase-functions/v2/https");
// const { defineSecret } = require("firebase-functions/params");
// const logger = require("firebase-functions/logger");
// const { initializeApp, applicationDefault } = require("firebase-admin/app");
// const { getFirestore } = require("firebase-admin/firestore");
// const fetch = require("node-fetch");

// // ✅ 시크릿 설정
// const BUILD_HOOK_URL  = defineSecret("BUILD_HOOK_URL");
// const NETLIFY_TOKEN   = defineSecret("NETLIFY_TOKEN");

// initializeApp({ credential: applicationDefault() });
// const db = getFirestore();

// exports.autoDeploy = onRequest(
//   {
//     cors: true,
//     secrets: [BUILD_HOOK_URL, NETLIFY_TOKEN],
//   },
//   async (req, res) => {
//     const { domain, orderId } = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

//     if (!domain || !orderId) {
//       logger.error("❗ 도메인 또는 주문 ID가 누락되었습니다");
//       return res.status(400).json({ message: "❗ 도메인 또는 주문 ID가 누락되었습니다" });
//     }

//     try {
//       // 🔍 1. Firestore 주문 데이터 확인
//       const snap = await db.collection("orders").doc(orderId).get();
//       if (!snap.exists) {
//         return res.status(404).json({ message: "❌ 주문 데이터를 찾을 수 없습니다" });
//       }
//       const orderData = snap.data();
//       logger.info("📦 주문 데이터 로드 완료", orderData);

//       // 🚀 2. Netlify Build Hook 호출
//       const hookRes = await fetch(BUILD_HOOK_URL.value(), { method: "POST" });
//       if (!hookRes.ok) {
//         const error = await hookRes.text();
//         logger.error("❌ Build Hook 호출 실패:", error);
//         return res.status(500).json({ message: "Build Hook 호출 실패", detail: error });
//       }

//       logger.info("✅ Netlify Build Hook 호출 성공");

//       // ✅ 3. 최종 응답
//       return res.status(200).json({
//         message: "🎉 사이트 생성 및 빌드 요청 완료",
//         url: `https://${domain}`,
//       });

//     } catch (err) {
//       logger.error("🔥 서버 오류:", err);
//       return res.status(500).json({ message: "서버 오류 발생", error: err.message });
//     }
//   }
// );




// const { onRequest } = require("firebase-functions/v2/https");
// const { defineSecret } = require("firebase-functions/params");
// const logger = require("firebase-functions/logger");
// const { initializeApp, applicationDefault } = require("firebase-admin/app");
// const { getFirestore } = require("firebase-admin/firestore");
// const fetch = require("node-fetch");

// // ✅ 시크릿 설정
// const BUILD_HOOK_URL = defineSecret("BUILD_HOOK_URL");

// initializeApp({ credential: applicationDefault() });
// const db = getFirestore();

// exports.autoDeploy = onRequest(
//   {
//     cors: true,
//     secrets: [BUILD_HOOK_URL],
//   },
//   async (req, res) => {
//     const { domain, orderId } = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

//     if (!domain || !orderId) {
//       logger.error("❗ 도메인 또는 주문 ID가 누락되었습니다");
//       return res.status(400).json({ message: "❗ 도메인 또는 주문 ID가 누락되었습니다" });
//     }

//     try {
//       // 🔍 1. Firestore 주문 데이터 확인
//       const snap = await db.collection("orders").doc(orderId).get();
//       if (!snap.exists) {
//         return res.status(404).json({ message: "❌ 주문 데이터를 찾을 수 없습니다" });
//       }
//       const orderData = snap.data();
//       logger.info("📦 주문 데이터 로드 완료", orderData);

//       // 🚀 2. Netlify Build Hook 호출
//       const hookRes = await fetch(BUILD_HOOK_URL.value(), { method: "POST" });
//       if (!hookRes.ok) {
//         const error = await hookRes.text();
//         logger.error("❌ Build Hook 호출 실패:", error);
//         return res.status(500).json({ message: "Build Hook 호출 실패", detail: error });
//       }
//       logger.info("✅ Netlify Build Hook 호출 성공");

//       // ✅ 3. 최종 응답 (도메인 연결 생략)
//       return res.status(200).json({
//         message: "🎉 사이트 생성 완료 (DNS 연결은 이미 구성됨)",
//         url: `https://${domain}`,
//       });

//     } catch (err) {
//       logger.error("🔥 서버 오류:", err);
//       return res.status(500).json({ message: "서버 오류 발생", error: err.message });
//     }
//   }
// );
















// const { onRequest } = require("firebase-functions/v2/https");
// const { defineSecret } = require("firebase-functions/params");
// const logger = require("firebase-functions/logger");
// const { initializeApp, applicationDefault } = require("firebase-admin/app");
// const { getFirestore } = require("firebase-admin/firestore");
// const fetch = require("node-fetch");

// const BUILD_HOOK_URL = defineSecret("BUILD_HOOK_URL");
// const NETLIFY_TOKEN = defineSecret("NETLIFY_TOKEN");
// const NETLIFY_ZONE_ID = "681f82f7f9e4f8459c00cd6c"; // droppy.kr DNS Zone ID

// initializeApp({ credential: applicationDefault() });
// const db = getFirestore();

// exports.autoDeploy = onRequest(
//   {
//     cors: true,
//     secrets: [BUILD_HOOK_URL, NETLIFY_TOKEN],
//   },
//   async (req, res) => {
//     try {
//       // ✅ 요청 파싱
//       const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
//       const { domain, orderId } = body;

//       if (!domain || !orderId) {
//         logger.error("❗ 도메인 또는 주문 ID가 누락되었습니다:", { domain, orderId });
//         return res.status(400).json({ message: "❗ 도메인 또는 주문 ID가 누락되었습니다" });
//       }

//       logger.info("📨 전달받은 domain 값:", domain);

//       // ✅ 주문 정보 조회
//       const snap = await db.collection("orders").doc(orderId).get();
//       if (!snap.exists) {
//         logger.error("❌ 주문 데이터를 찾을 수 없습니다:", orderId);
//         return res.status(404).json({ message: "❌ 주문 데이터를 찾을 수 없습니다" });
//       }

//       const orderData = snap.data();
//       logger.info("📦 주문 데이터 로드 완료", orderData);

//       // ✅ Build Hook 호출
//       const hookUrl = BUILD_HOOK_URL.value();
//       if (!hookUrl || !hookUrl.startsWith("http")) {
//         throw new Error(`BUILD_HOOK_URL이 절대 경로가 아닙니다: ${hookUrl}`);
//       }

//       const hookRes = await fetch(hookUrl, { method: "POST" });
//       if (!hookRes.ok) {
//         const error = await hookRes.text();
//         logger.error("❌ Build Hook 호출 실패:", error);
//         return res.status(500).json({ message: "Build Hook 호출 실패", detail: error });
//       }

//       logger.info("✅ Netlify Build Hook 호출 성공");

//       // ✅ 도메인 → subdomain 추출
//       const domainParts = domain.trim().split(".");
//       if (domainParts.length < 3 || !domainParts[0]) {
//         throw new Error(`❌ 도메인 형식이 잘못되었습니다: ${domain}`);
//       }

//       const subdomain = domainParts[0];
//       const targetHost = "droppy-main.netlify.app";

//       if (!subdomain || !targetHost) {
//         throw new Error(`❌ DNS 등록 실패: subdomain(${subdomain}), targetHost(${targetHost})`);
//       }

//       logger.info("🌐 DNS 등록 정보:", { 
//         subdomain, 
//         targetHost,
//         fullDomain: `${subdomain}.droppy.kr`
//       });

//       // ✅ DNS 등록 payload (hostname 필드 추가)
//       const dnsPayload = {
//         type: "CNAME",
//         name: subdomain,
//         hostname: `${subdomain}.droppy.kr`, // hostname 필드 추가
//         value: targetHost,
//         ttl: 3600,
//       };

//       logger.info("📤 Netlify DNS 등록 요청 내용:", {
//         payload: dnsPayload,
//         zoneId: NETLIFY_ZONE_ID
//       });

//       const dnsRes = await fetch(
//         `https://api.netlify.com/api/v1/dns_zones/${NETLIFY_ZONE_ID}/dns_records`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(dnsPayload),
//         }
//       );

//       if (!dnsRes.ok) {
//         const errorText = await dnsRes.text();
//         let errorDetail;
//         try {
//           errorDetail = JSON.parse(errorText);
//         } catch (e) {
//           errorDetail = errorText;
//         }
        
//         logger.error("❌ DNS 레코드 등록 실패:", {
//           status: dnsRes.status,
//           statusText: dnsRes.statusText,
//           error: errorDetail,
//           payload: dnsPayload,
//           zoneId: NETLIFY_ZONE_ID
//         });
        
//         return res.status(500).json({ 
//           message: "DNS 등록 실패", 
//           detail: errorDetail,
//           payload: dnsPayload // 클라이언트에 페이로드 정보도 전달
//         });
//       }

//       const dnsResult = await dnsRes.json();
//       logger.info(`🌐 DNS 등록 성공: ${domain} → ${targetHost}`, {
//         result: dnsResult,
//         payload: dnsPayload
//       });

//       return res.status(200).json({
//         message: "🎉 사이트 생성 및 도메인 연결 성공",
//         url: `https://${domain}`,
//         dnsRecord: dnsResult,
//         payload: dnsPayload // 성공 시에도 페이로드 정보 전달
//       });

//     } catch (err) {
//       logger.error("🔥 서버 오류 발생:", {
//         error: err.message,
//         stack: err.stack
//       });
//       return res.status(500).json({ 
//         message: "서버 오류 발생", 
//         error: err.message,
//         stack: err.stack // 개발 환경에서만 스택 트레이스 전달
//       });
//     }
//   }
// );const { onRequest } = require("firebase-functions/v2/https");




// 정상동작작
// const { onRequest } = require("firebase-functions/v2/https");
// const { defineSecret } = require("firebase-functions/params");
// const logger = require("firebase-functions/logger");
// const { initializeApp, applicationDefault } = require("firebase-admin/app");
// const { getFirestore } = require("firebase-admin/firestore");
// const fs = require("fs");
// const path = require("path");
// const archiver = require("archiver");
// const fetch = require("node-fetch");

// const NETLIFY_TOKEN = defineSecret("NETLIFY_TOKEN");

// initializeApp({ credential: applicationDefault() });
// const db = getFirestore();
// const EXPORT_DIR = path.join(__dirname, "../out");

// exports.autoDeploy = onRequest(
//   {
//     cors: true,
//     secrets: [NETLIFY_TOKEN],
//   },
//   async (req, res) => {
//     try {
//       const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
//       const { domain } = body;

//       logger.info("📨 전달받은 body:", body);

//       if (!domain || typeof domain !== "string" || !domain.includes(".")) {
//         return res.status(400).json({ message: "❗ 유효하지 않은 도메인 형식입니다" });
//       }

//       const subdomain = domain.split(".")[0];
//       if (!subdomain || subdomain.trim() === "") {
//         logger.error("❗ 서브도메인 파싱 실패:", domain);
//         return res.status(400).json({ message: "❗ 유효하지 않은 도메인입니다 (서브도메인 없음)" });
//       }

//       // Firestore에서 주문 정보 조회
//       const snapshot = await db.collection("orders")
//         .where("domain", "==", domain)
//         .limit(1)
//         .get();

//       if (snapshot.empty) {
//         return res.status(404).json({ message: "❌ 도메인으로 주문 데이터 없음" });
//       }

//       const doc = snapshot.docs[0];
//       const orderId = doc.id;
//       const orderData = doc.data();
//       logger.info("📦 주문 데이터 로드 완료:", orderData);

//       // 정적 파일 압축
//       const zipPath = `/tmp/${orderId}.zip`;
//       const output = fs.createWriteStream(zipPath);
//       const archive = archiver("zip", { zlib: { level: 9 } });

//       archive.directory(EXPORT_DIR, false);
//       archive.pipe(output);
//       await archive.finalize();
//       logger.info("📦 정적 zip 압축 완료");

//       // Netlify 사이트 생성
//       const siteCreateRes = await fetch("https://api.netlify.com/api/v1/sites", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//         },
//       });

//       const siteInfo = await siteCreateRes.json();
//       if (!siteCreateRes.ok) {
//         logger.error("❌ 사이트 생성 실패:", siteInfo);
//         return res.status(500).json({ message: "❌ 사이트 생성 실패", detail: siteInfo });
//       }

//       const siteId = siteInfo.site_id;
//       const siteName = siteInfo.name;
//       logger.info("✅ Netlify 새 사이트 생성 완료:", siteId);

//       // 정적 파일 배포
//       const zipBuffer = fs.readFileSync(zipPath);
//       const deployRes = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/deploys`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/zip",
//         },
//         body: zipBuffer,
//       });

//       const deployText = await deployRes.text();
//       logger.info("🚀 배포 응답:", deployText);
//       if (!deployRes.ok) {
//         return res.status(500).json({ message: "❌ 배포 실패", detail: deployText });
//       }

//       // Netlify 커스텀 도메인 연결 (안정성 추가)
//       if (domain && typeof domain === "string") {
//         try {
//           logger.info("🔗 Netlify 도메인 연결 요청:", { hostname: domain });

//           const domainRes = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/domains`, {
//             method: "POST",
//             headers: {
//               Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               hostname: domain,
//             }),
//           });

//           const domainText = await domainRes.text();
//           let domainJson;
//           try {
//             domainJson = JSON.parse(domainText);
//           } catch {
//             domainJson = { raw: domainText };
//           }

//           logger.info("🔗 커스텀 도메인 설정 응답:", domainJson);

//           if (!domainRes.ok) {
//             logger.error("❌ Netlify 도메인 연결 실패:", domainJson);
//           }
//         } catch (domainErr) {
//           logger.error("❗ 도메인 연결 중 예외 발생:", domainErr);
//         }
//       }

//       // 최종 응답
//       return res.status(200).json({
//         message: "🎉 사이트 생성 + 배포 + 도메인 연결 완료",
//         siteName,
//         sitePreviewUrl: `https://${siteName}.netlify.app`,
//         customDomainUrl: `https://${domain}`,
//       });
//     } catch (err) {
//       logger.error("🔥 전체 오류 발생:", err);
//       return res.status(500).json({ message: "서버 오류", error: err.message });
//     }
//   }
// );







// 정적으로 잘 동작하던 파일
// const { onRequest } = require("firebase-functions/v2/https");
// const { defineSecret } = require("firebase-functions/params");
// const logger = require("firebase-functions/logger");
// const { initializeApp, applicationDefault } = require("firebase-admin/app");
// const { getFirestore } = require("firebase-admin/firestore");
// const fs = require("fs");
// const path = require("path");
// const archiver = require("archiver");

// initializeApp({ credential: applicationDefault() });
// const db = getFirestore();
// const EXPORT_DIR = path.join(__dirname, "../out");

// // ✅ 방법 A: 고정된 droppy-main 사이트에만 배포
// const SITE_ID = "2aff56be-e5a4-47da-90f3-e81068b0e958";
// const NETLIFY_TOKEN = defineSecret("NETLIFY_TOKEN");

// exports.autoDeploy = onRequest(
//   {
//     cors: true,
//     secrets: [NETLIFY_TOKEN],
//   },
//   async (req, res) => {
//     try {
//       const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
//       const { domain } = body;

//       logger.info("📨 전달받은 body:", body);

//       if (!domain || typeof domain !== "string" || !domain.includes(".")) {
//         return res.status(400).json({ message: "❗ 유효하지 않은 도메인 형식입니다" });
//       }

//       // Firestore에서 주문 정보 조회
//       const snapshot = await db.collection("orders")
//         .where("domain", "==", domain)
//         .limit(1)
//         .get();

//       if (snapshot.empty) {
//         return res.status(404).json({ message: "❌ 도메인으로 주문 데이터 없음" });
//       }

//       const doc = snapshot.docs[0];
//       const orderId = doc.id;
//       const orderData = doc.data();
//       logger.info("📦 주문 데이터 로드 완료:", orderData);

//       // 정적 파일 zip 압축
//       const zipPath = `/tmp/${orderId}.zip`;
//       const output = fs.createWriteStream(zipPath);
//       const archive = archiver("zip", { zlib: { level: 9 } });

//       archive.directory(EXPORT_DIR, false);
//       archive.pipe(output);
//       await archive.finalize();
//       logger.info("📦 정적 zip 압축 완료");

//       // Netlify에 배포 (droppy-main 사이트에만!)
//       const zipBuffer = fs.readFileSync(zipPath);
//       const deployRes = await fetch(`https://api.netlify.com/api/v1/sites/${SITE_ID}/deploys`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
//           "Content-Type": "application/zip",
//         },
//         body: zipBuffer,
//       });

//       const deployJson = await deployRes.json();
//       logger.info("🚀 배포 응답:", deployJson);

//       if (!deployRes.ok) {
//         return res.status(500).json({ message: "❌ 배포 실패", detail: deployJson });
//       }

//       return res.status(200).json({
//         message: "🎉 배포 완료 (droppy-main 사이트)",
//         previewUrl: deployJson.deploy_ssl_url,
//         customDomainUrl: `https://${domain}`,
//       });

//     } catch (err) {
//       logger.error("🔥 전체 오류 발생:", err);
//       return res.status(500).json({ message: "서버 오류", error: err.message });
//     }
//   }
// );



const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const logger = require("firebase-functions/logger");
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const fetch = require("node-fetch");

initializeApp({ credential: applicationDefault() });
const db = getFirestore();

// 🔧 경로 및 설정
const PROJECT_DIR = path.resolve(__dirname, "../../droppy-builder");
const SITE_ID = "2aff56be-e5a4-47da-90f3-e81068b0e958"; // 너의 droppy-main Netlify 사이트 ID
const NETLIFY_TOKEN = defineSecret("NETLIFY_TOKEN");

// ❌ 제외할 폴더들 (.next, out, node_modules 등)
const EXCLUDE_FOLDERS = [".next", "out", "node_modules", ".git", ".firebase", ".DS_Store"];

exports.autoDeploy = onRequest(
  {
    cors: true,
    secrets: [NETLIFY_TOKEN],
  },
  async (req, res) => {
    try {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      const { domain } = body;

      logger.info("📨 전달받은 body:", body);

      if (!domain || typeof domain !== "string" || !domain.includes(".")) {
        return res.status(400).json({ message: "❗ 유효하지 않은 도메인 형식입니다" });
      }

      // Firestore에서 주문 정보 조회
      const snapshot = await db.collection("orders")
        .where("domain", "==", domain)
        .limit(1)
        .get();

      if (snapshot.empty) {
        return res.status(404).json({ message: "❌ 도메인으로 주문 데이터 없음" });
      }

      const doc = snapshot.docs[0];
      const orderId = doc.id;
      const orderData = doc.data();
      logger.info("📦 주문 데이터 로드 완료:", orderData);

      // ✅ zip 파일 경로
      const zipPath = `/tmp/${orderId}.zip`;
      const output = fs.createWriteStream(zipPath);
      const archive = archiver("zip", { zlib: { level: 9 } });

      archive.pipe(output);

      // ✅ 필요한 파일만 압축: 폴더 전체에서 특정 폴더 제외
      archive.glob("**/*", {
        cwd: PROJECT_DIR,
        ignore: EXCLUDE_FOLDERS.map((folder) => `${folder}/**`),
        dot: true, // .env 등 dotfile 포함
      });

      await archive.finalize();
      logger.info("📦 압축 완료: ", zipPath);

      // ✅ Netlify에 업로드
      const zipBuffer = fs.readFileSync(zipPath);
      const deployRes = await fetch(`https://api.netlify.com/api/v1/sites/${SITE_ID}/deploys`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${NETLIFY_TOKEN.value()}`,
          "Content-Type": "application/zip",
        },
        body: zipBuffer,
      });

      const deployJson = await deployRes.json();
      logger.info("🚀 Netlify 응답:", deployJson);

      if (!deployRes.ok) {
        return res.status(500).json({ message: "❌ 배포 실패", detail: deployJson });
      }

      return res.status(200).json({
        message: "🎉 배포 성공!",
        previewUrl: deployJson.deploy_ssl_url,
        customDomainUrl: `https://${domain}`,
      });

    } catch (err) {
      logger.error("🔥 오류 발생:", err);
      return res.status(500).json({ message: "서버 오류", error: err.message });
    }
  }
);
