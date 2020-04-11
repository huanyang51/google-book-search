const express = require("express");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const routes = require("./routes");
const PORT = process.env.PORT || 3002;

const app = express();
app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`[SERVER] app listening on port ${PORT}`);
});