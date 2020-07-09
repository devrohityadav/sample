import * as path from "path";
import * as cors from "cors";
import * as express from "express";
import * as bodyparser from "body-parser";

import { config } from "./config";
import { StudentRouter } from "./students";

var app = express();

app.use(bodyparser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../client/build")));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes setup
app.use("/students", StudentRouter);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(config.PORT, () => {
  console.log(
    `Server running on port: ${config.PORT} in ${config.NODE_ENV} mode.`
  );
});
