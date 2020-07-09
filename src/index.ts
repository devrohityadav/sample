import * as path from "path";
import * as express from "express";
import * as bodyparser from "body-parser";

import { StudentRouter } from "./students";

var app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "../client/build")));

// Routes setup
app.use("/students", StudentRouter);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(
    `Server running on port: ${PORT} in ${process.env.NODE_ENV} mode.`
  );
});
