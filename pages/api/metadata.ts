// pages/api/metadata.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.setHeader("Content-Type", "application/json");

  res.status(200).json({
    id: "fortune-miniapp",
    name: "Fortune Teller 🔮",
    description: "Get your daily fortune and share it on Farcaster!",
    icon: "https://fortune-miniapp-six.vercel.app/icon.png",
    url: "https://fortune-miniapp-six.vercel.app",
    version: "1.0.0",
    tags: ["fun", "fortune", "daily", "miniapp"],
    developer: {
      name: "forumevi",
      url: "https://farcaster.xyz/forumevi",
    },
    embeds: [
      {
        type: "miniapp",
        url: "https://fortune-miniapp-six.vercel.app",
      },
    ],
  });
}
