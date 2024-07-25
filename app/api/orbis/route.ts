import { OrbisDB, type OrbisConnectResult } from "@useorbis/db-sdk";
import { OrbisKeyDidAuth } from "@useorbis/db-sdk/auth";
import { env } from "@/env.mjs";

export const runtime = "edge";

const ENV_ID = process.env.NEXT_PUBLIC_ENV_ID ?? "";
const seed = process.env.NEXT_PUBLIC_PRIVATE_DID_SEED ?? "";
const custom_button_click = env.NEXT_PUBLIC_CUSTOM_EVENT_ID ?? "";
const CONTEXT_ID = env.NEXT_PUBLIC_CONTEXT_ID ?? "";

export async function POST(request: Request) {
  try {
    const req = await request.json();

    const orbis = new OrbisDB({
      ceramic: {
        gateway: "https://ceramic-orbisdb-mainnet-direct.hirenodes.io/",
      },
      nodes: [
        {
          gateway: "https://studio.useorbis.com",
          env: ENV_ID,
        },
      ],
    });
    const auth = await OrbisKeyDidAuth.fromSeed(seed);
    const authResult: OrbisConnectResult = await orbis.connectUser({ auth });

    const updatequery = await orbis
      .insert(custom_button_click)
      .value({
        page: req.data.page,
        timeStamp: req.data.timeStamp,
        address: req.metadata.address,
        customerUserId: authResult.user.did,
      })
      .context(CONTEXT_ID)
      .run();

    if (updatequery.content) {
      return Response.json({ data: updatequery.content });
    }

    return Response.json({ data: "test" });
  } catch (error) {
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}

// export async function POST() {

//   return Response.json({ data: "Hello" });
// }
