const express = require("express");
const app = express();

const PORT = 5501;

app.use(express.static("../public"));

app.listen(PORT, () => {
  console.log(`Server listening at port: ${PORT}`);
});
