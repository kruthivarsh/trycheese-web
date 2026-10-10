// Renders the procedural placeholder frames in scripts/placeholder-frames.html
// with headless Chrome (DevTools Protocol) and writes public/frames/frame-NN.jpg.
// usage: node scripts/generate-placeholder-frames.mjs
import { spawn } from "node:child_process";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public", "frames");
mkdirSync(out, { recursive: true });

const port = 9400 + Math.floor(Math.random() * 400);
const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", [
  "--headless=new", "--disable-gpu", `--remote-debugging-port=${port}`,
  `--user-data-dir=${mkdtempSync(join(tmpdir(), "frames-"))}`,
  `file://${join(root, "scripts", "placeholder-frames.html")}`,
], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let ws;
for (let i = 0; i < 50 && !ws; i++) {
  try {
    const page = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === "page");
    if (page) ws = new WebSocket(page.webSocketDebuggerUrl);
  } catch {}
  await sleep(200);
}
if (ws.readyState !== WebSocket.OPEN) await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let id = 0; const pending = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); pending.get(m.id)?.(m); pending.delete(m.id); });
const evaluate = (expression) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method: "Runtime.evaluate", params: { expression, returnByValue: true } })); });

await sleep(800);
const count = (await evaluate("window.frameCount")).result.result.value;
for (let i = 0; i < count; i++) {
  const b64 = (await evaluate(`window.renderFrame(${i})`)).result.result.value;
  const file = join(out, `frame-${String(i + 1).padStart(2, "0")}.jpg`);
  writeFileSync(file, Buffer.from(b64, "base64"));
  console.log(file);
}
ws.close(); chrome.kill();
