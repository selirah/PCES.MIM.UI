import { NextApiRequest, NextApiResponse } from 'next'

export default function login (req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body
  if (username === 'dejan@pces.mk' && password === 'dejan2021') {
    return res.status(200).json({ name: 'Dejan G', email: 'dejan@pces.mk', role: 'admin', id: '123456' })
  } else {
    return res.status(401).json({ message: 'Login failed' })
  }
}