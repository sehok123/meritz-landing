#!/usr/bin/env node
/**
 * 단일 HTML 랜딩 분석 도구 (madup-publish 스킬 1단계)
 *
 * 사용: node tools/extract-assets.mjs <원본.html> <출력폴더>
 *
 * - HTML 안의 base64 이미지(data URI)를 <출력폴더>/images/asset-NN.확장자 파일로 뺀다. 같은 이미지는 한 번만 저장한다.
 * - <출력폴더>/source.cleaned.html : 이미지 자리를 ./images/... 경로로 바꾼 원본 (읽기 쉬운 분석용)
 * - <출력폴더>/assets.json         : 이미지별 파일·크기·가로세로·쓰인 위치
 * - 화면에 요약 출력: 제목, 섹션, 폼 항목, 팝업, 외부 리소스, 전송 코드, 추적 코드
 * 원본 파일은 바꾸지 않는다.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const [input, outDir] = process.argv.slice(2);
if (!input || !outDir) {
  console.error("사용: node tools/extract-assets.mjs <원본.html> <출력폴더>");
  process.exit(1);
}
const html = fs.readFileSync(input, "utf8");
const imgDir = path.join(outDir, "images");
fs.mkdirSync(imgDir, { recursive: true });

const EXT = {
  "image/png": "png", "image/jpeg": "jpg", "image/jpg": "jpg", "image/gif": "gif",
  "image/webp": "webp", "image/svg+xml": "svg", "image/avif": "avif",
  "font/woff2": "woff2", "font/woff": "woff", "application/font-woff2": "woff2",
};

function dims(buf, ext) {
  try {
    if (ext === "png") return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
    if (ext === "gif") return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) };
    if (ext === "webp" && buf.toString("ascii", 12, 16) === "VP8X")
      return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
    if (ext === "jpg") {
      let i = 2;
      while (i < buf.length) {
        if (buf[i] !== 0xff) { i++; continue; }
        const marker = buf[i + 1];
        const len = buf.readUInt16BE(i + 2);
        if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker))
          return { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) };
        i += 2 + len;
      }
    }
  } catch (e) { /* 크기를 못 읽으면 생략 */ }
  return {};
}

const byHash = new Map();
const manifest = [];
let count = 0;
const cleaned = html.replace(/data:([a-z0-9/+.-]+);base64,([A-Za-z0-9+/=\s]+)/gi, (match, mime, b64, offset) => {
  const data = b64.replace(/\s+/g, "");
  const hash = crypto.createHash("sha1").update(data).digest("hex");
  const before = html.slice(Math.max(0, offset - 160), offset);
  const context = (before.match(/<[^<>]*$/) || [before.slice(-80)])[0].replace(/\s+/g, " ").trim();
  if (byHash.has(hash)) {
    const info = byHash.get(hash);
    info.usedAt.push(context);
    return info.path;
  }
  const ext = EXT[mime.toLowerCase()] || "bin";
  count += 1;
  const file = `asset-${String(count).padStart(2, "0")}.${ext}`;
  const buf = Buffer.from(data, "base64");
  fs.writeFileSync(path.join(imgDir, file), buf);
  const info = { path: `./images/${file}`, mime, kb: Math.round(buf.length / 1024), ...dims(buf, ext), usedAt: [context] };
  byHash.set(hash, info);
  manifest.push(info);
  return info.path;
});

fs.writeFileSync(path.join(outDir, "source.cleaned.html"), cleaned);
fs.writeFileSync(path.join(outDir, "assets.json"), JSON.stringify(manifest, null, 2));

/* ---------- 요약 ---------- */
const noScript = cleaned.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "");
const body = noScript.slice(Math.max(0, noScript.search(/<body/i)));
const uniq = (arr) => [...new Set(arr)];
const title = (cleaned.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || "(없음)";
const blocks = uniq(
  (body.match(/<(header|section|footer|main|nav|aside|form|div)\b[^>]*>/gi) || []).filter((t) =>
    /^<(header|section|footer|main|form)/i.test(t) ||
    /(hero|sec|section|form|modal|popup|pop|dialog|sticky|fixed|footer|apply|step|review|faq|cta|sheet|toast)/i.test(t)
  )
).map((t) => t.replace(/\s+/g, " ").slice(0, 120));
const fields = uniq(
  (body.match(/<(input|select|textarea)\b[^>]*>/gi) || [])
    .filter((t) => !/type=["']?(hidden|submit|button)/i.test(t))
    .map((t) => {
      const name = (t.match(/\bname=["']([^"']+)/i) || [])[1];
      const id = (t.match(/\bid=["']([^"']+)/i) || [])[1];
      const type = (t.match(/\btype=["']([^"']+)/i) || [])[1] || t.match(/^<(\w+)/)[1];
      return `${name || id || "?"}(${type})`;
    })
);
const scripts = cleaned.match(/<script\b[\s\S]*?<\/script>/gi) || [];
const external = uniq((cleaned.match(/(?:src|href)=["'](https?:\/\/[^"']+)/gi) || []).map((s) => s.replace(/^(src|href)=["']/i, "")));
const submitCode = uniq((cleaned.match(/fetch\([^)]{0,80}|XMLHttpRequest|\$\.ajax|\baction=["'][^"']*["']|script\.google\.com[^"'\s]*/gi) || []));
const tracking = uniq((cleaned.match(/GTM-[A-Z0-9]+|fbq\(|ttq\.|gtag\(|kakaoPixel|wcs_do|clarity/gi) || []));
const text = body.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

const totalKb = manifest.reduce((s, a) => s + a.kb, 0);
console.log(`원본: ${input} (${(html.length / 1048576).toFixed(2)}MB)`);
console.log(`제목: ${title}`);
console.log(`이미지: ${manifest.length}개 추출 (중복 제외, 합계 ${totalKb}KB) → ${imgDir}`);
manifest.forEach((a) => console.log(`  ${a.path}  ${a.mime} ${a.kb}KB ${a.width ? a.width + "x" + a.height : ""}  사용 ${a.usedAt.length}곳: ${a.usedAt[0].slice(0, 70)}`));
console.log(`섹션·블록 (${blocks.length}):`);
blocks.forEach((b) => console.log("  " + b));
console.log(`입력 항목: ${fields.join(", ") || "없음"}`);
console.log(`스크립트: ${scripts.length}개 (${scripts.map((s) => s.length).join(", ")}자)`);
console.log(`외부 리소스: ${external.join(" | ") || "없음"}`);
console.log(`전송 코드: ${submitCode.join(" | ") || "없음 (원본은 실제 접수를 안 함 → 매드업 save()로 연결 필요)"}`);
console.log(`추적 코드: ${tracking.join(", ") || "없음"}`);
console.log(`본문 글자 수: ${text.length}자`);
console.log(`\n분석용 파일: ${path.join(outDir, "source.cleaned.html")}, ${path.join(outDir, "assets.json")}`);
