import { httpLink, httpBatchStreamLink } from "@repo/trpc/client";
import { env } from "~/env.js";

interface CreateTRPCHttpBatchClientClientOpts {
  enableStreaming?: boolean;
}

// FIX: NEXT_PUBLIC_API_URL may be the Express root (e.g. "http://localhost:8000")
// or already include /trpc. Normalise to always end in /trpc so tRPC procedure
// calls resolve to the correct path on the Express server.
function getTrpcUrl(): string {
  const base = env.NEXT_PUBLIC_API_URL;
  if (!base) return "/trpc"; // fallback: Next.js dev proxy not set up
  if (base.endsWith("/trpc")) return base;
  return `${base.replace(/\/$/, "")}/trpc`;
}

export const createTRPCHttpBatchClientClient = (opts?: CreateTRPCHttpBatchClientClientOpts) => {
  const c = opts?.enableStreaming ? httpBatchStreamLink : httpLink;
  return c({
    url: getTrpcUrl(),
    fetch(url, options) {
      return fetch(url, {
        ...options,
        credentials: "include",
      });
    },
  });
};