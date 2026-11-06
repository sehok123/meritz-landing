#!/usr/bin/env node
/**
 * 매드업 캠페인 폴더 점검 도구 (madup-publish 스킬 6단계)
 *
 * 사용: node tools/check-campaign.mjs madup-meritz-src/<캠페인코드>
 *
 * 개발팀이 퍼블리싱할 수 있는 구조인지 자동으로 확인한다. 아무 파일도 바꾸지 않는다.
 * FAIL이 하나라도 있으면 종료 코드 1. WARN은 사람이 확인할 것.
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const dirArg = process.argv[2];
if (!dirArg) {
  console.error("사용: node tools/check-campaign.mjs madup-meritz-src/<캠페인코드>");
  process.exit(1);
}
const dir = path.resolve(dirArg);
const srcRoot = path.dirname(dir); // madup-meritz-src
const results = [];
const pass = (m) => results.push(["PASS", m]);
const warn = (m) => results.push(["WARN", m]);
const fail = (m) => results.push(["FAIL", m]);
const read = (p) => (fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null);

/* 1. 파일 구성 (주석 속 코드는 실제로 쓰이지 않으므로 빼고 검사) */
const stripHtmlComments = (s) => (s == null ? s : s.replace(/<!--[\s\S]*?-->/g, ""));
const stripCssComments = (s) => (s == null ? s : s.replace(/\/\*[\s\S]*?\*\//g, ""));
const html = stripHtmlComments(read(path.join(dir, "index.html")));
const css = read(path.join(dir, "style/style.css"));
const scss = read(path.join(dir, "style/style.scss"));
if (!html) { fail("index.html이 없음"); report(); }
css ? pass("style/style.css 있음") : fail("style/style.css가 없음");
if (scss === null) warn("style/style.scss가 없음 (style.css와 같은 내용으로 두는 것이 규칙)");
else if (css && scss.replace(/\r\n/g, "\n") !== css.replace(/\r\n/g, "\n")) warn("style.scss와 style.css 내용이 다름");
else pass("style.scss = style.css");
fs.existsSync(path.join(dir, "README.md")) ? pass("README.md(개발팀 전달 메모) 있음") : warn("README.md(개발팀 전달 메모)가 없음");
if (!/^BC\d{6}$/.test(path.basename(dir))) warn(`폴더명 "${path.basename(dir)}"이 캠페인 코드 형식(BC+숫자6자리)이 아님. 임시 이름이면 README에 적었는지 확인`);

// index.html이 실제로 불러오는 캠페인 JS만 검사 (폴더에 남은 안 쓰는 사본은 제외)
const jsFiles = [...html.matchAll(/<script[^>]*\bsrc=["']\.\/js\/([^"'?]+)/gi)].map((m) => m[1]);
const js = jsFiles.map((f) => ({ f, s: read(path.join(dir, "js", f)) || "" }));
const unusedJs = fs.existsSync(path.join(dir, "js")) ? fs.readdirSync(path.join(dir, "js")).filter((f) => f.endsWith(".js") && !jsFiles.includes(f)) : [];
if (unusedJs.length) warn(`index.html이 불러오지 않는 JS가 폴더에 있음: ${unusedJs.join(", ")} (전달 전에 빼는 것이 좋음)`);

/* 2. base64·인라인 스타일·인라인 스크립트 */
const all = [["index.html", html], ["style.css", css || ""], ...js.map((x) => [x.f, x.s])];
const b64 = all.filter(([, s]) => /data:[a-z0-9/+.-]+;base64,/i.test(s)).map(([f]) => f);
b64.length ? fail(`base64 데이터가 들어 있음: ${b64.join(", ")} (이미지는 images/ 파일로)`) : pass("base64 데이터 없음");
/<style\b/i.test(html) ? fail("index.html에 <style> 블록이 있음 (스타일은 style/style.css로)") : pass("인라인 <style> 없음");
const inline = (html.match(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi) || [])
  .map((s) => s.replace(/<\/?script[^>]*>/gi, "").trim())
  .filter((s) => s && !/^history\.scrollRestoration\s*=\s*["']manual["'];?$/.test(s) && !/^\/\/[^\n]*\n?\s*function openForm\(\)\s*\{[\s\S]{0,400}\}$|^function openForm\(\)\s*\{[\s\S]{0,400}\}$/.test(s));
inline.length ? warn(`인라인 <script>가 ${inline.length}개 더 있음 (scrollRestoration·openForm 외 코드는 js/ 파일로)`) : pass("인라인 스크립트는 기본 2개뿐");

/* 3. 공통 CSS·JS 순서 */
function inOrder(list, label) {
  let at = -1;
  for (const item of list) {
    const i = html.indexOf(item);
    if (i < 0) return fail(`${label}: ${item} 이 없음`);
    if (i < at) return fail(`${label}: ${item} 순서가 다름`);
    at = i;
  }
  pass(`${label} 순서 맞음`);
}
inOrder(["/assets/css/default.css", "/assets/css/styles_08A.css", "/assets/css/common_modal.css", "/assets/css/modal_alert.css", "./style/style.css", "/main/css/footer.css"], "공통 CSS");
inOrder(["/assets/js/lib/jquery-3.7.0.min.js", "/assets/js/commonScript.js", "/assets/js/08/script.js", "/assets/js/checkBadWords.js", "/assets/js/form.js", "/assets/js/main.js", "/assets/js/loadHeader.js"], "공통 JS");

/* 4. save()가 읽는 id */
const ids = ["user_name", "user_call", "user_sido", "user_gugun", "job_div_cd", "payment", "cns_req_hr_div_cd", "c_terms", "c_survey_privacy", "orgCd", "is_saved", "sendButton", "sheet-success"];
const missing = ids.filter((id) => !new RegExp(`\\bid=["']${id}["']`).test(html));
missing.length ? fail(`공통 save()가 읽는 id가 없음: ${missing.join(", ")}`) : pass("save()가 읽는 id 모두 있음");
for (const id of ["user_sido", "user_gugun"]) {
  if (!new RegExp(`<select[^>]*\\bid=["']${id}["']`).test(html)) fail(`#${id}는 <select>여야 함`);
}
const usesStepScript = /2603FA\.js/.test(html);
if (!usesStepScript && !/<select[^>]*\bid=["']cns_req_hr_div_cd["']/.test(html))
  fail("#cns_req_hr_div_cd는 <select>여야 함 (save()가 option:checked 문구를 읽음. 단계형 2603FA.js는 전송 직전에 바꿔 줌)");
if (!/class=["'][^"']*\bbottom-sheet\b[^"']*["'][^>]*id=["']sheet-success["']|id=["']sheet-success["'][^>]*class=["'][^"']*\bbottom-sheet\b/.test(html))
  warn("#sheet-success에 bottom-sheet 클래스가 없음");

/* 5. 자체 전송 코드·추적 코드 */
const sendCode = all.filter(([, s]) => /\bfetch\(|XMLHttpRequest|\$\.ajax|\$\.post|axios\.(post|get)|<form[^>]*\baction=/i.test(s)).map(([f]) => f);
sendCode.length ? fail(`자체 전송 코드가 있음: ${sendCode.join(", ")} (접수는 공통 save()만)`) : pass("자체 전송 코드 없음");
const trackers = (html.match(/GTM-[A-Z0-9]+|fbq\(|ttq\.load|gtag\(/g) || []);
trackers.length ? warn(`추적 코드가 들어 있음: ${[...new Set(trackers)].join(", ")} (개발팀 기준 확인)`) : pass("추적 코드 없음 (개발팀이 배포 때 삽입)");

/* 6. 참조 파일 존재 */
const refs = [
  ...[...html.matchAll(/(?:src|href)=["']([^"'#?]+)/gi)].map((m) => m[1]),
  ...[...stripCssComments(css || "").matchAll(/url\(\s*["']?([^"')?#]+)/gi)].map((m) => ["css", m[1]]),
];
const broken = [];
for (const r of refs) {
  const [from, ref] = Array.isArray(r) ? r : ["html", r];
  if (/^(https?:|mailto:|tel:|data:|\/\/)/i.test(ref)) continue;
  const base = from === "css" ? path.join(dir, "style") : dir;
  const target = ref.startsWith("/") ? path.join(srcRoot, ref) : path.join(base, ref);
  if (!fs.existsSync(target)) broken.push(ref);
}
const knownServerOnly = new Set(["/ico_favicon.ico", "/images/thumbnail.png"]);
const realBroken = [...new Set(broken)].filter((b) => !knownServerOnly.has(b));
realBroken.length ? fail(`없는 파일을 참조함: ${realBroken.join(", ")}`) : pass("참조한 파일이 모두 있음");

/* 7. 공통 폴더 변경 여부 */
try {
  const out = execSync('git status --porcelain -- assets main', { cwd: srcRoot, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  out ? fail(`assets/ 또는 main/ 이 바뀌었음 (되돌릴 것):\n${out}`) : pass("assets/ · main/ 변경 없음");
} catch (e) {
  warn("git으로 assets/ · main/ 변경 여부를 확인하지 못함");
}

/* 8. 이미지 용량 */
const imgDir = path.join(dir, "images");
if (fs.existsSync(imgDir)) {
  const big = fs.readdirSync(imgDir).map((f) => [f, fs.statSync(path.join(imgDir, f)).size]).filter(([, s]) => s > 500 * 1024);
  big.length ? warn(`500KB 넘는 이미지: ${big.map(([f, s]) => `${f}(${Math.round(s / 1024)}KB)`).join(", ")}`) : pass("이미지 용량 500KB 이하");
}

report();

function report() {
  for (const [level, msg] of results) console.log(`${level.padEnd(4)}  ${msg}`);
  const fails = results.filter(([l]) => l === "FAIL").length;
  const warns = results.filter(([l]) => l === "WARN").length;
  console.log(`\n결과: FAIL ${fails} · WARN ${warns} · PASS ${results.length - fails - warns}`);
  process.exit(fails ? 1 : 0);
}
