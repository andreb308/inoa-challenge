import { useState, useEffect } from "react";
import mockData from "@/lib/mockData";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description = "An interactive area chart";

type HistoricalEntry = {
  date: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adjustedClose: number;
};

type Stock = {
  symbol: string;
  historicalDataPrice: HistoricalEntry[];
};

type TransformedDataEntry = {
  date: string;
  [symbol: string]: string | number;
};

function transformHistoricalData(inputArray: Stock[]): TransformedDataEntry[] {
  const resultByDate: Record<string, TransformedDataEntry> = {};

  inputArray.forEach((stock) => {
    const symbol = stock.symbol;
    const history = stock.historicalDataPrice;

    history.forEach((entry) => {
      const dateStr = new Date(entry.date * 1000).toISOString().split("T")[0];

      if (!resultByDate[dateStr]) {
        resultByDate[dateStr] = { date: dateStr };
      }

      resultByDate[dateStr][symbol] = entry.close;
    });
  });

  return Object.values(resultByDate).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
}

export default function ChartAreaInteractive({
  data,
}: {
  data: typeof mockData;
}) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Data Available</CardTitle>
          <CardDescription>
            Please select a valid ticker to display the chart.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  // const [timeRange, setTimeRange] = useState("90d");
  const transformedData = transformHistoricalData(data);
  // const filteredData = transformedData.filter((item) => {
  //   const date = new Date(item.date);
  //   const referenceDate = new Date();
  //   let daysToSubtract = 90;
  //   if (timeRange === "30d") {
  //     daysToSubtract = 30;
  //   } else if (timeRange === "7d") {
  //     daysToSubtract = 7;
  //   }
  //   const startDate = new Date(referenceDate);
  //   startDate.setDate(startDate.getDate() - daysToSubtract);
  //   return date >= startDate;
  // });
  // console.log(filteredData);

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Gráfico de Ativos</CardTitle>
          <CardDescription>
            Mostrando dados históricos de preços de fechamento para os ativos
            selecionados.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="h-[400px] w-[800px] px-2 pt-4 sm:px-6 sm:pt-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={transformedData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip itemSorter={(item) => (item.value as number) * -1} />

            {data.map((ticker, index) => (
              <Area
                key={index}
                type="stepAfter"
                dataKey={ticker.symbol}
                stackId={index}
                stroke={`hsl(${index * 50}, 50%, 50%)`}
                fill={`hsla(${index * 50}, 50%, 50%, 0.3)`}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
