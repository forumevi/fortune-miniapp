import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    type: "miniapp",
    name: "🧿 Fortune MiniApp",
    description: "Tap to reveal your daily fortune ✨",
    icon: "https://fortune-miniapp-six.vercel.app/icon.png", // kendi ikon URL’in varsa değiştir
    url: "https://fortune-miniapp-six.vercel.app",
  });
}
