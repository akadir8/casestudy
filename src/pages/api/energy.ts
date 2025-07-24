import type { NextApiRequest, NextApiResponse } from "next";
import { mockEnergy, getAutoRegenEnergy } from "../../lib/mockData";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method not allowed" });

  const energy = getAutoRegenEnergy();
  res.status(200).json({ energy });
}
