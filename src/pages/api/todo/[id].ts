import type { NextApiRequest, NextApiResponse } from "next";
type Data = {
  id: number | string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const id = Number(req.query.id);
  res.status(200).json({ id });
}
