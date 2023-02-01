import httpUtils from "@/common/utils/httpUtils";
import _ from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import {
  Data,
  ErrorType,
  Links,
  Meta,
} from "./../../../common/type/todoTypeApi";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    Data | ErrorType | { data: Data[]; meta: Meta; link: Links }
  >
) {
  const requestMethod = req.method;
  switch (requestMethod) {
    case "POST":
      try {
        const body = req?.body;
        const newData = await prisma.todo.create({
          data: {
            todo: body?.todo.trim(),
            isCompleted: body?.isCompleted ?? false,
          },
        });
        return res.status(201).json({
          ...newData,
          //createdAt: moment(newData?.createdAt).format("DD/MM/YYYY h:mm A"),
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

    case "GET":
      try {
        const cursor = req.query.cursor ?? "";
        const limit = req.query.limit ?? 20;
        const search = req.query.search ?? "";
        const filter = req.query.filter;
        let query = {};
        query =
          filter == "all"
            ? {}
            : filter === "true"
            ? { isCompleted: true }
            : { isCompleted: false };
        query = !!search
          ? {
              ...query,
              todo: {
                contains: search as string,
              },
            }
          : { ...query };
        const cursorObject =
          cursor == "" ? undefined : { id: parseInt(cursor as string) };
        const data = await prisma.todo.findMany({
          take: parseInt(limit as string), // Page size
          cursor: cursorObject,
          orderBy: {
            id: "asc", // Ordering results
          },
          where: { ...query },
        });

        const nextCursor =
          data?.length == limit ? data[data.length - 1].id + 1 : undefined;
        const next = nextCursor
          ? `/api/todo?cursor=${nextCursor}&limit=${limit}`
          : null;
        return res.status(200).json({
          data: data,
          meta: { per_page: 20, current_page: 1, path: "/api/todo" },
          link: {
            prev: `/api/todo?cursor=${data[0].id}&limit=${limit}`,
            next: next,
          },
        });
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
