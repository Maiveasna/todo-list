import httpUtils from "@/common/utils/httpUtils";
import _ from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { Data, Error, Links, Meta } from "./../../../common/type/todoTypeApi";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error | { data: Data[]; meta: Meta; link: Links }>
) {
  const requestMethod = req.method;
  switch (requestMethod) {
    case "PUT":
      try {
        const body = req?.body;
        const id = parseInt(req.query.id as string);
        const findDataById = await prisma.todo.findUnique({
          where: { id: id },
        });

        if (_.isEmpty(findDataById)) {
          return res.status(404).json({ status: 404, message: "Not Found" });
        }
        const checkUniq = await prisma.todo.findUnique({
          where: { todo: body?.todo },
        });

        if (checkUniq)
          throw new Error("Unique constraint failed on the fields: (`todo`)");
        const newData = await prisma.todo.update({
          where: {
            id: id,
          },
          data: {
            ...findDataById,
            todo: body?.todo,
            isCompleted: body?.isCompleted,
          },
        });
        return res.status(200).json({
          ...newData,
        });
      } catch (error) {
        return httpUtils.parseError(error as any).then((err) => {
          if (err?.status == 0)
            return res.status(400).json({
              status: 400,
              message: "Unique constraint failed on the fields: (`todo`)",
            });
          else
            return res
              .status(400)
              .json({ status: 400, message: "Bad request!" });
        });
      }
    case "DELETE":
      try {
        const id = parseInt(req.query.id as string);
        const findDataById = await prisma.todo.findUnique({
          where: { id: id },
        });
        if (_.isEmpty(findDataById)) {
          return res.status(404).json({ status: 404, message: "Not Found" });
        }
        const del = await prisma.todo.delete({ where: { id: id } });
        if (del)
          return res.status(200).json({ status: 200, message: "success" });
        else throw new Error("Something Wrong");
      } catch (error) {
        return res.status(400).json({ status: 400, message: "Bad request!" });
      }
    case "GET":
      try {
        const id = parseInt(req.query.id as string);
        const findDataById = await prisma.todo.findUnique({
          where: { id: id },
        });
        if (_.isEmpty(findDataById)) {
          return res.status(404).json({ status: 404, message: "Not Found" });
        }
        return res.status(200).json(findDataById);
      } catch (error) {
        return res.status(400).json({ status: 400, message: "Bad request!" });
      }
    default:
      return res.status(405).json({ message: "Method not allow", status: 405 });
  }
}

export const config = {
  api: {
    bodyParser: true,
    responseLimit: false,
    externalResolver: true,
  },
};
