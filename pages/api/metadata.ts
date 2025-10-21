import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    frames: [
      {
        version: "vNext",
        image: "https://fortune-miniapp-six.vercel.app/icon.png",
        buttons: [
          { label: "Reveal Fortune", action: "post" }
        ],
        post_url: "https://fortune-miniapp-six.vercel.app/api/metadata"
      }
    ]
  });
}
