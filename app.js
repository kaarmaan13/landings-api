const express = require("express");
const landings = require("./api/configuracion_landings.json");
const { validateLanding } = require("./schemas/landings");

const app = express();
app.use(express.json());
app.disable("x-powered-by");

app.get("/", (request, response) => {
  response.json({ message: "hola mundo" });
});

app.get("/landings", (request, response) => {
  response.json(landings);
});

app.get("/landings/:hash", (request, response) => {
  // path to regex
  const { hash } = request.params;
  const landing = landings.find((landing) => landing.hash === hash);
  if (landing) return response.json(landing);

  response.status(404).json({ message: "Landing not found" });
});

app.post("/landings", (request, response) => {

  const result = validateLanding(request.body)
  
  if (!result.success) {
    return response.status(400).json({ error: result.error.message })
  }

  const newLanding = {
    hash: btoa(url),
    ...result.data
  };

  landings.push(newLanding);

  response.status(201).json(newLanding)
});

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT} http://localhost:${PORT}`);
});
