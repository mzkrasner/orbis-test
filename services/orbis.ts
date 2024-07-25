import { OrbisDB, type OrbisConnectResult } from "@useorbis/db-sdk";
import { OrbisKeyDidAuth } from "@useorbis/db-sdk/auth";
import { type Event } from "@/types/index";
import { env } from "@/env.mjs";

const ENV_ID = process.env.NEXT_PUBLIC_ENV_ID ?? "";
const seed = process.env.NEXT_PUBLIC_PRIVATE_DID_SEED ?? "";
const custom_button_click = env.NEXT_PUBLIC_CUSTOM_EVENT_ID ?? "";
const CONTEXT_ID = env.NEXT_PUBLIC_CONTEXT_ID ?? "";

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

export async function createEvent(event: Event) {
  try {
    const auth = await OrbisKeyDidAuth.fromSeed(seed);
    const authResult: OrbisConnectResult = await orbis.connectUser({ auth });

    const updatequery = await orbis
      .insert(custom_button_click)
      .value({
        page: event.data.page,
        timeStamp: event.data.timeStamp,
        address: event.metadata.address,
        customerUserId: authResult.user.did,
      })
      .context(CONTEXT_ID)
      .run();
      console.log(updatequery)
    if (updatequery.content) {
      return { data: updatequery.content };
    }
  } catch (error) {
    return { error: error.message };
  }
}
