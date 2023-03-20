const express = require("express");
const history = require("connect-history-api-fallback");
const path = require("path");
const db = require("./db");

const app = express();

app.use(express.json());

const employee = require("./server/routers/employee");
const organization = require("./server/routers/organization");
const subdivision = require("./server/routers/subdivision");
const division = require("./server/routers/division");
const position = require("./server/routers/position");
const pdf = require("./server/routers/pdf");
const degree = require("./server/routers/degree");
const user = require("./server/routers/user");
const individual = require("./server/routers/individual");

app.use("/api", employee);
app.use("/api", organization);
app.use("/api", subdivision);
app.use("/api", division);
app.use("/api", position);
app.use("/api", pdf);
app.use("/api", degree);
app.use("/api", user);
app.use("/api", individual);

app.use((err, req, res, next) => {
  const errorText = err.toString();
  res.status(400).json({ message: errorText });
});

db.sync({ alter: true });

/* Ресурс */

const staticFileMiddleware = express.static(path.join(__dirname + "/dist/"));
app.use(staticFileMiddleware);

app.use(
  history({
    disableDotRule: true,
    index: "/",
    rewrites: [{ from: /\/soccer/, to: "/index.html" }],
  })
);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Сервер запущен. Порт ${PORT}`);
});
