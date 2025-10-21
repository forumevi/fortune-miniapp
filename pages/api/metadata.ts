// pages/api/metadata.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    id: "fortune-miniapp",
    name: "Fortune MiniApp",
    description: "Reveal your daily fortune ✨",
    icon: "https://fortune-miniapp-six.vercel.app/icon.png",
    url: "https://fortune-miniapp-six.vercel.app",
    version: "1.0.0",
    tags: ["fortune", "fun", "daily", "miniapp"],
    developer: {
      name: "reddawn",
      url: "https://farcaster.xyz/reddawn",
    },
  });
}
