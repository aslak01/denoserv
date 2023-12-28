import { UserAgent } from "./deps.ts";
import { log, read } from "./db.ts";
import { seed } from "./seed.ts";

seed();

const port = 8080;

async function handler(request: Request): Promise<Response> {
  const userAgent = new UserAgent(request.headers.get("user-agent") ?? "");
  const host = request.headers.get("host") ?? "";
  const url = request.url ?? "";
  log(userAgent, host, url);

  if (url.split("/").at(-1) === "logs") {
    const returned = await read();
    const data = JSON.stringify(returned) || "";

    return Promise.resolve(new Response(data, { status: 200 }));
  }

  return Promise.resolve(new Response("Hei", { status: 200 }));
}

console.log(`HTTP server running. Access it at: http://localhost:8080/`);
Deno.serve({ port }, handler);
