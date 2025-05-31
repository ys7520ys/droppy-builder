const { execSync } = require("child_process");
const fs = require("fs-extra");
const path = require("path");

// ✅ 1. next build
execSync("npm run build", { stdio: "inherit" });

// ✅ 2. 복사할 폴더 생성
const targetPath = path.join(__dirname, "functions", "out", "_next", "static");
fs.ensureDirSync(targetPath);

// ✅ 3. .next/static → functions/out/_next/static 복사
fs.copySync(".next/static", targetPath, { recursive: true });

console.log("✅ .next/static 자동 복사 완료!");
