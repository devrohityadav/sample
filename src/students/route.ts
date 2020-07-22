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
  validator(),
  async (req: Request, res: Response) => {
    try {
      const { studentId } = req.params;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).send({ error: errors.array() });
        return;
      }

      const { rows } = await Student.create({
        studentId,
        ...req.body,
      });

      res.status(201).send({ data: { id: rows[0].id } });
    } catch (error) {
      console.log({ error });
      res.status(500).send({ error });
    }
  }
);

StudentRouter.post(
  "/uploads/pwd",
  upload("uploads/pwd_docs").single("Pwd Certificate"),
  (req, res) => {
    try {
      console.log({ req: req.file });
      res.status(200).send({
        size: req.file.size,
        filePath: req.file.path,
        fileName: req.file.originalname,
      });
    } catch (error) {
      console.log({ error });
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
);

StudentRouter.post(
  "/uploads/selfie",
  upload("uploads/selfie").single("Image"),
  (req, res) => {
    try {
      console.log({ req: req.file });
      res.status(200).send({
        size: req.file.size,
        filePath: req.file.path,
        fileName: req.file.originalname,
      });
    } catch (error) {
      console.log({ error });
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
);

StudentRouter.post(
  "/uploads/bpl",
  upload("uploads/bpl_docs").single("Bpl Certificate"),
  (req, res) => {
    try {
      console.log({ req: req.file });
      res.status(200).send({
        size: req.file.size,
        filePath: req.file.path,
        fileName: req.file.originalname,
      });
    } catch (error) {
      console.log({ error });
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
);

export { StudentRouter };
