import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    id: "fortune-miniapp",
    name: "Fortune Teller 🔮",
    description: "Reveal your daily fortune and share it on Farcaster!",
    icon: "https://fortune-miniapp-six.vercel.app/icon.png",
    url: "https://fortune-miniapp-six.vercel.app",
    version: "1.0.0",
    tags: ["fortune", "daily", "fun"],
    embeds: [
      {
        type: "miniapp",
        url: "https://fortune-miniapp-six.vercel.app"
      }
    ]
  });
}
