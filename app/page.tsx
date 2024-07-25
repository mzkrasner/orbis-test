"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import {createEvent} from "@/services/orbis";
import spindl from "@spindl-xyz/attribution";
import { useEffect } from "react";
import { time } from "console";
// import spindl from "@spindl-xyz/attribution-lite" // for lite version customers

function Page() {
  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      spindl.attribute(address);
    }
  }, [address]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: 12,
      }}
    >
      <ConnectButton />
      <button
        onClick={async () => {
          const buttonClick = {
            event: "button_click",
            data: {
              timeStamp: new Date().toISOString(),
              page: "home",
            },
            metadata: {
              address,
            },
          };
          // const res = await createEvent(buttonClick);
          // console.log(res);
          const res = await fetch("/api/orbis", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(buttonClick),
          });
          console.log(await res.json());

        }}
      >
        Track Custom Event
      </button>
    </div>
  );
}

export default Page;
