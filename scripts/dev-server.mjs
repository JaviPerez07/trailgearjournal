import http from "node:http";
import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";

const root = path.join(process.cwd(), "dist");
const port = Number(process.env.PORT || 4173);
const host = "127.0.0.1";

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8"
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://localhost:${port}`);
  let file = path.join(root, decodeURIComponent(url.pathname));
  try {
    const info = await stat(file);
    if (info.isDirectory()) file = path.join(file, "index.html");
  } catch {
    file = path.join(root, "404", "index.html");
    res.statusCode = 404;
  }
  if (!existsSync(file)) {
    res.statusCode = 404;
    res.end("Not found");
    return;
  }
  res.setHeader("content-type", types[path.extname(file)] || "application/octet-stream");
  createReadStream(file).pipe(res);
});

server.listen(port, host, () => {
  console.log(`Trail Gear Journal preview: http://${host}:${port}`);
});
