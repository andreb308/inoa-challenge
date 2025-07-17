require("dotenv").config();

import axios from "axios";
import { log } from "console";
import express from "express";
const app = express();

/******************************************************************************************
 API Configuration

 TO DO: 
  - Parse query params (ativos, range, interval) and send separate requests on a loop
  - Filter only necessary data from the response, send clean info to the frontend
  - Check error handling and response structure (send correct status codes and messages)
 ******************************************************************************************/

const api = axios.create({
  baseURL: "https://brapi.dev/api",
});

const fetchData = async (ativo: string) => {
  let results = [];

  try {
    results = await api
      .get(
        `/quote/${ativo}?range=1mo&interval=1d&token=${process.env.BRAPI_APIKEY}`
      )
      .then((res) => res.data);

    return { error: false, data: results };
  } catch (err) {
    console.log(err);
    return { error: true, message: `Failed to fetch data: ${err}` };
  }
};

app.get("/", async (req, res) => {
  const ativos = (req.query.ativos as string).split(",") || ["PETR4"];
  console.log(ativos);

  console.log("Fetching data...");
  const results = await fetchData(ativos[0]);

  if (results.error) {
    return res.status(500).json({ error: results.message });
  }

  res.json(results.data);
  console.log(results);
});

app.listen(1313, () => console.log("Server ready on port 1313."));

module.exports = app;
