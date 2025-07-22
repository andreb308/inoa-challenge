export type FetchDataResponse =
  | {
      error: true;
      message: string;
    }
  | {
      error: false;
      data: BrApiResponseSuccess;
    };

export type BrApiResponse = BrApiResponseSuccess | BrApiResponseFail;

export type BrApiResponseSuccess = {
  results: Result[];
  requestedAt: Date;
  took: string;
};

export type BrApiResponseFail = {
  error: true;
  message: string;
};

export type Result = {
  currency: string;
  marketCap: number | null;
  shortName: string;
  longName: string;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketTime: Date;
  regularMarketPrice: number;
  regularMarketDayHigh: number;
  regularMarketDayRange: string;
  regularMarketDayLow: number;
  regularMarketVolume: number;
  regularMarketPreviousClose: number;
  regularMarketOpen: number;
  fiftyTwoWeekRange: string;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
  symbol: string;
  logourl: string;
  usedInterval:
    | "1m"
    | "2m"
    | "5m"
    | "15m"
    | "30m"
    | "60m"
    | "90m"
    | "1h"
    | "1d"
    | "5d"
    | "1wk"
    | "1mo"
    | "3mo";
  usedRange:
    | "1d"
    | "2d"
    | "5d"
    | "7d"
    | "1mo"
    | "3mo"
    | "6mo"
    | "1y"
    | "2y"
    | "5y"
    | "10y"
    | "ytd"
    | "max";
  historicalDataPrice: HistoricalDataPrice[];
  validRanges: string[];
  validIntervals: string[];
  priceEarnings: number | null;
  earningsPerShare: number | null;
};

export type HistoricalDataPrice = {
  date: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adjustedClose: number;
};
