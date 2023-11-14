import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type NextRequest } from "next/server";
import { cookies } from "next/headers";

import { env } from "~/env.mjs";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

const handler = (req: NextRequest) => {
  const userId = cookies().get("userId");
  console.log("userId--->", userId);
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () =>
      createTRPCContext({
        req,
        setCookie: (key: string, value: string) => {
          cookies().set(key, value);
        },
      }),
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          }
        : undefined,
  });
};

export { handler as GET, handler as POST };