#!/usr/bin/env node
/**
 * 안전한 로컬 미리보기 서버 (madup-meritz-src 를 웹 루트로, 127.0.0.1:8080 고정)
 *
 * 사용: node tools/serve-8080.mjs [자동 종료까지 분, 기본 60]
 * 열기: http://127.0.0.1:8080/<캠페인코드>/
 *
 * 왜 8080 고정인가:
 *   공통 /assets/js/main.js 는 주소가 localhost:8080 또는 127.0.0.1:8080 일 때만
 *   신청을 테스트 주소(http://localhost:8000)로 보낸다. 다른 포트·주소에서 열면
 *   운영 접수 서버(api.meritzpartners.com)로 실제 신청이 들어간다.
 *   그래서 8080을 못 쓰면 다른 포트로 바꾸지 않고 멈춘다.
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "madup-meritz-src");
const minutes = Number(process.argv[2]) || 60;
const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif",
  ".webp": "image/webp", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".woff": "font/woff", ".woff2": "font/woff2",
  ".ttf": "font/ttf", ".otf": "font/otf", ".mp4": "video/mp4", ".mov": "video/quicktime",
};

if (!fs.existsSync(root)) {
  console.error(`madup-meritz-src 폴더를 찾지 못했습니다: ${root}`);
  process.exit(1);
}

const server = http.createServer((req, res) => {
  let url;
  try {
    url = decodeURIComponent(new URL(req.url, "http://127.0.0.1").pathname);
  } catch {
    res.writeHead(400);
    return res.end("bad request");
  }
  if (url.endsWith("/")) url += "index.html";
  const file = path.join(root, url);
  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    return res.end(`404 ${url}`);
  }
  res.writeHead(200, { "content-type": TYPES[path.extname(file).toLowerCase()] || "application/octet-stream", "cache-control": "no-store" });
  fs.createReadStream(file).pipe(res);
});

server.on("error", (e) => {
  if (e.code === "EADDRINUSE") {
    console.error("8080 포트가 이미 사용 중입니다. 다른 포트로 바꾸지 마세요 (운영 서버로 신청이 들어갈 수 있음).");
    console.error("이미 이 서버가 떠 있으면 그대로 쓰고, 아니면 8080을 쓰는 프로그램을 끈 뒤 다시 실행하세요.");
  } else {
    console.error(e.message);
  }
  process.exit(1);
});

server.listen(8080, "127.0.0.1", () => {
  console.log(`미리보기: http://127.0.0.1:8080/<캠페인코드>/   (웹 루트: ${root})`);
  console.log(`${minutes}분 뒤 자동 종료. 최종 신청 버튼은 누르지 마세요 (테스트 시 페이지에서 fetch를 가로채 확인).`);
});
setTimeout(() => process.exit(0), minutes * 60 * 1000);
