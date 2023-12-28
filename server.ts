import { UserAgent } from "./deps.ts";
import { log, read } from "./db.ts";
import { seed } from "./seed.ts";
import { hash } from "./hash.ts";

seed();

const port = 8080;

async function handler(
  request: Request,
  connInfo: Deno.ServeHandlerInfo,
): Promise<Response> {
  const ua = new UserAgent(request.headers.get("user-agent") ?? "");
  const url = request.url ?? "";
  const referrer = request.headers.get("referer") ?? "";
  const hostname = (connInfo.remoteAddr as Deno.NetAddr).hostname ?? "";

  const message = `You connected from the following address: ${hostname}`;
  console.log(message);
  const hashSeed = ua.toString() + hostname;
  const visitorId = await hash(hashSeed);
  console.log(referrer);
  console.log(visitorId);
  const logEntry = { ua, url, referrer, visitorId };

  log(logEntry);

  if (url.split("/").at(-1) === "logs") {
    const returned = read();
    const data = JSON.stringify(returned) || "";

    return Promise.resolve(new Response(data, { status: 200 }));
  }

  console.log(JSON.stringify(ua));
  return Promise.resolve(
    new Response(JSON.stringify(request.headers), { status: 200 }),
  );
}

console.log(`HTTP server running. Access it at: http://localhost:8080/`);
Deno.serve({ port }, handler);
