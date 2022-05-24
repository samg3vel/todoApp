// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { TaskToDo } from '../../model/entities'
import { deleteToDo, getToDo, pushToDo, updateToDo } from './helper'

interface Data {
  tasksToDo?: TaskToDo[];
  task?: TaskToDo;
  error?: any;
  status?: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method == "POST") {
      if (req.body?.task && Object.keys(req.body.task).length) {
        const task = await pushToDo(req.body.task);
        res.status(200).json({ task })
      }
      else {
        res.status(400).json({ error: "No Data received!" })
      }
    }
    else if (req.method == "PUT") {
      if (req.query?.id && Object.keys(req.body).length) {
        const status = await updateToDo(Number(req.query?.id), req.body.task)
        res.status(200).json({ status })
      }
      else {
        res.status(400).json({ error: "Invalid data!" })
      }
    }
    else if (req.method == "DELETE") {
      if (req.query?.id) {
        await deleteToDo(Number(req.query?.id))
        res.status(204).end()
      }
      else {
        res.status(400).json({ error: "Id not provided!" })
      }
    }
    else {
      const data = await getToDo();
      res.status(200).json(data)
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}
