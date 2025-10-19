import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    title: "FortuneCast MiniApp",
    image: "https://fortune-miniapp.vercel.app/favicon.ico",
    buttons: [{ label: "Reveal Fortune" }],
    postUrl: "https://fortune-miniapp.vercel.app/api/frame"
  });
}