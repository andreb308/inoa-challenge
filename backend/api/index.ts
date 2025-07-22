require("dotenv").config();

import cors from "cors";
import axios from "axios";
import express from "express";
import { BrApiResponse, BrApiResponseFail, FetchDataResponse } from "./types";

const app = express();
app.use(cors());
/******************************************************************************************
 API Configuration

 TO DO: 
  - [DONE!] Parse query params (tickers, range, interval) and send separate requests on a loop
  - Filter only necessary data from the response, send clean info to the frontend
  - Check error handling and response structure (send correct status codes and messages)
 ******************************************************************************************/

const api = axios.create({
  baseURL: "https://brapi.dev/api",
});

const isErrorResponse = (data: BrApiResponse): data is BrApiResponseFail => {
  return "error" in data && data.error === true;
};

const fetchData = async (ticker: string): Promise<FetchDataResponse> => {
  try {
    const data: BrApiResponse = await api
      .get(
        `/quote/${ticker}?range=3mo&interval=1d&token=${process.env.BRAPI_APIKEY}`
      )
      .then((res) => res.data);

    // Check if the response contains an error
    if (isErrorResponse(data)) {
      throw new Error(data.message);
    }

    // By this point, we can assume data is of type BrApiResponseSuccess
    return { error: false, data };
  } catch (err) {
    console.log(err);
    return { error: true, message: `Failed to fetch data: ${err}` };
  }
};

app.get("/", async (req, res) => {
  const tickers = JSON.parse((req.query.ativos as string) || "[]");
  console.log(tickers);
  let resultsArray = [];

  if (tickers.length === 0) {
    return res.status(400).json({ status: 400, error: "No tickers provided." });
  }

  for (const ticker of tickers) {
    if (!ticker || ticker.trim() === "") {
      return res
        .status(400)
        .json({ status: 400, error: `Invalid ticker: '${ticker}'` });
    }
    if (typeof ticker !== "string") {
      return res
        .status(400)
        .json({ status: 400, error: `ticker must be a string: ${ticker}` });
    }

    const response: FetchDataResponse = await fetchData(ticker);

    if (response.error) {
      return res.status(500).json({ error: response.message });
    }

    resultsArray.push(response.data!.results[0] || {});
  }
  console.log("Fetching data...");

  res.json(resultsArray || [{}]);
  console.log(resultsArray);
});

app.listen(1313, () => console.log("Server ready on port 1313."));

module.exports = app;
