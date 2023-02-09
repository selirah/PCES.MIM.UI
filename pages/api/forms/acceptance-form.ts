import { acceptanceFormIO } from "forms/acceptanceForm";
import { NextApiRequest, NextApiResponse } from "next";

export default function acceptanceForm(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(acceptanceFormIO)
  } else {
    return res.status(401).json({ errorText: "Error retrieving Form" })
  }
}