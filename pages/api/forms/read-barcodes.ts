import { acceptanceDataGrid } from "forms/acceptanceForm";
import { NextApiRequest, NextApiResponse } from "next";

export default function readBarcodes(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json(acceptanceDataGrid)
  } else {
    return res.status(401).json({ errorText: "Error retrieving form" })
  }
}