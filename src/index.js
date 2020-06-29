const path = require("path");
const express = require("express");
const bodyparser = require("body-parser");

const { upload } = require("./multer");

var app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "../client/build")));

app.post("/process", upload.single("img"), (req, res) => {
  // save in database do some processing
  res.send({ file: req.file });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(
    `Server running on port: ${PORT} in ${process.env.NODE_ENV} mode.`
  );
});
