import { Router, Request, Response } from "express";
import { validationResult } from "express-validator";

import { upload } from "../utils";
import * as Student from "./model";
import { validator } from "./validator";

const StudentRouter = Router();

StudentRouter.get("/all", async (_req, res) => {
  try {
    const { rows } = await Student.getAll();
    res.status(200).send({ data: rows });
  } catch (error) {
    res.status(500).send({ error });
  }
});

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
  validator(),
  async (req: Request, res: Response) => {
    try {
      const { studentId } = req.params;

      const documents = {
        // @ts-ignore
        bpl: req.files["bpl"] ? req.files["bpl"][0].path : null,
        // @ts-ignore
        pwd: req.files["pwd"] ? req.files["pwd"][0].path : null,
        // @ts-ignore
        img: req.files["img"] ? req.files["img"][0].path : null,
      };

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).send({ error: errors.array() });
      }

      const { rows } = await Student.create({
        studentId,
        ...req.body,
        ...documents,
      });

      res.status(201).send({ data: { id: rows[0].id } });
    } catch (error) {
      console.log({ error });
      res.status(500).send({ error });
    }
  }
);

export { StudentRouter };
