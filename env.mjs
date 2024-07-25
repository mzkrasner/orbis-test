import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {

  },
  client: {
    NEXT_PUBLIC_PROJECT_ID: z.string(),
    NEXT_PUBLIC_CONTEXT_ID: z.string(),
    NEXT_PUBLIC_ENV_ID: z.string(),
    NEXT_PUBLIC_PRIVATE_DID_SEED: z.string(),
    NEXT_PUBLIC_CUSTOM_EVENT_ID: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_ENV_ID: process.env.NEXT_PUBLIC_ENV_ID,
    NEXT_PUBLIC_PRIVATE_DID_SEED: process.env.NEXT_PUBLIC_PRIVATE_DID_SEED,
    NEXT_PUBLIC_CUSTOM_EVENT_ID: process.env.NEXT_PUBLIC_CUSTOM_EVENT_ID,
    NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
    NEXT_PUBLIC_CONTEXT_ID: process.env.NEXT_PUBLIC_CONTEXT_ID,
  },
});
