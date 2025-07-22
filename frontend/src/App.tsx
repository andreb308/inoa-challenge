import { useState } from "react";
import CardSection from "./components/CardSection";
import axios from "axios";
import GraphSection from "./components/GraphSection";
import InputWithTags from "./components/InputWithTags";
import DateRangePicker from "./components/DateRangePicker";

/*********************************************
 Frontend

 TO DO: 
  - [DONE!] Add input with tags & state
  - [DONE!] Add recharts graph with data from API
  - [PARTIALLY DONE] Better refactoring of the code into components once the input and graph
  are working properly
  - 

 *********************************************/

export type FormAtivos = {
  ativos: string[];
  startDate: Date | null;
  endDate: Date | null;
};

export const App = () => {
  const [inputFormData, setInputFormData] = useState<FormAtivos>({
    ativos: ["PETR4", "VALE3", "ITUB4"],
    startDate: null,
    endDate: null,
  });
  const [graphData, setGraphData] = useState([]);

  const validateDates = () => {
    const { startDate, endDate } = inputFormData;

    if (endDate === null || startDate === null) {
      throw new Error("Por favor, selecione as datas de início e fim.");
    }
    if (endDate < startDate) {
      throw new Error("A data de fim não pode ser anterior à data de início.");
    }
  };

  const fetchGraphData = async () => {
    const { ativos, startDate, endDate } = inputFormData;
    console.log("Fetching data with :", inputFormData);

    try {
      validateDates();

      const response = await axios
        .get(
          `http://localhost:1313/?ativos=${JSON.stringify(
            ativos,
          )}&startDate=${startDate?.toISOString()}&endDate=${endDate?.toISOString()}`,
        )
        .then((res) => res.data)
        .catch((err) => {
          console.error("Error fetching data:", err);
          alert("Erro ao buscar dados: " + err);
        });

      console.log(response);
      setGraphData(response);

      return response;
    } catch (error) {
      alert("Erro ao buscar dados: \n" + (error as Error).message);
    }
  };

  return (
    <main className="flex h-dvh w-dvw flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Buscador de Ativos Financeiros</h1>
      <div className="mt-8 flex w-full flex-col items-center gap-4">
        <div className="flex h-12 w-full max-w-[1200px] items-center justify-center gap-4">
          <InputWithTags stateSetter={setInputFormData} />
          <DateRangePicker stateSetter={setInputFormData} type="start" />
          <DateRangePicker stateSetter={setInputFormData} type="end" />
          <button
            onClick={() => fetchGraphData()}
            className="flex h-full w-[20%] cursor-pointer items-center justify-center rounded-full bg-blue-500 p-3 text-xl font-semibold text-white"
          >
            Pesquisar
          </button>
        </div>

        <CardSection data={graphData} />
        <GraphSection data={graphData} />

        {/* <p>{JSON.stringify(inputFormData)}</p> */}
      </div>
    </main>
  );
};

export default App;
