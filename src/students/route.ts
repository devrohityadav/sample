import { Router } from "express";

import { upload } from "../utils";
import * as Student from "./model";

const StudentRouter = Router();

StudentRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await Student.getById(id);
    res.status(200).send({ data: rows });
  } catch (error) {
    res.status(500).send({ error });
  }
});

StudentRouter.post(
  "/:studentId",
  upload.fields([
    {
      name: "pwd",
      maxCount: 1,
    },
    {
      name: "bpl",
      maxCount: 1,
    },
    {
      name: "img",
      maxCount: 1,
    },
  ]),
  async (req, res) => {
    console.log("POST /students", req.body);
    const { studentId } = req.params;
    const { rows } = await Student.create(req.body);
    res.status(201).send({ data: rows });
  }
);

export { StudentRouter };
