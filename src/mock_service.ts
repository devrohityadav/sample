import { Router } from "express";

const MockService = Router();

MockService.get("/:id", (req, res) => {
  const { id } = req.params;
  const data = getData(id);
  if (data === undefined)
    res.status(404).send({ message: "Application not found" });
  res.status(200).send(data);
});

export { MockService };

const data = [
  {
    id: "1",
    name: "John Doe",
    bpl: true,
    pwd: false,
  },
  {
    id: "2",
    name: "Jennie Doe",
    bpl: true,
    pwd: true,
  },
  {
    id: "3",
    name: "Sophie Doe",
    bpl: false,
    pwd: false,
  },
  {
    id: "4",
    name: "Boris Doe",
    bpl: false,
    pwd: true,
  },
];

const getData = (id: string) => {
  return data.filter((datum) => datum.id === id)[0];
};
