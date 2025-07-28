require("dotenv").config();

import cors from "cors";
import axios from "axios";
import express from "express";
import { BrApiResponse, BrApiResponseFail, FetchDataResponse } from "./types";

const app = express();
app.use(cors());

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

    // By this point, data will be of type BrApiResponseSuccess
    return { error: false, data };
  } catch (err) {
    return { error: true, message: `Failed to fetch data: ${err}` };
  }
};

app.get("/", async (req, res) => {
  const tickers = JSON.parse((req.query.ativos as string) || "[]");
  const startDate = new Date(req.query.startDate as string);
  const endDate = new Date(req.query.endDate as string);
  let resultsArray = [];

  console.log("Received request with tickers:", tickers, "startDate:", startDate, "endDate:", endDate );

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return res.status(400).json({
      status: 400,
      error: "Invalid date format. Please provide valid start and end dates.",
    });
  }

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
      console.log('Ticker:', ticker, 'Error:', response.message);
      continue; // Skip this ticker if there's an error
    }

    // Filtering historical data based on the provided date range
    response.data.results[0].historicalDataPrice =
      response.data.results[0].historicalDataPrice.filter((item) => {
        return (
          new Date(item.date * 1000).getTime() >= startDate.getTime() &&
          new Date(item.date * 1000).getTime() <= endDate.getTime()
        );
      });

    resultsArray.push(response.data!.results[0] || {});
  }
  console.log("Fetching data...");

  res.json(resultsArray || [{}]);
});

app.listen(1313, () => console.log("Server ready on port 1313."));

module.exports = app;
