// import React from 'react'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import mockData from "@/lib/mockData";

function CardSection({ data }: { data: typeof mockData }) {
  return (
    <div
      style={{ scrollbarColor: "black transparent" }}
      className=" flex max-w-[90dvw] flex-row items-start justify-start gap-4 overflow-x-auto px-4 py-4 lg:px-6"
    >
      {data &&
        data.map((ticker, ind) => (
          <Card key={ind} className="w-[300px] shrink-0">
            <CardHeader className="relative">
              <CardDescription className=" text-lg font-bold text-card-foreground">
                {ticker.symbol}
              </CardDescription>
              <CardTitle className="font-semibold tabular-nums">
                {/* <Badge variant="" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +12.5%
            </Badge> */}
              </CardTitle>
              <div className="absolute right-4 top-4">
                <img
                  className="size-8"
                  src={ticker.logourl}
                  alt={`${ticker.shortName} logo`}
                />
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {ticker.shortName}
              </div>
              <div className="text-card-foreground">
                <p className="text-2xl font-semibold">
                  {`R$ ${
                    ticker.historicalDataPrice
                      .at(-1)
                      ?.adjustedClose.toFixed(2) ?? "( - )"
                  }`}
                </p>
                {`Fechamento (${new Date(
                  (ticker.historicalDataPrice.at(-1)?.date || 0) * 1000,
                ).toLocaleString("pt-BR", { dateStyle: "short" })})`}
              </div>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
}

export default CardSection;
