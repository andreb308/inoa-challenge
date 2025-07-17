import { useState } from "react";

/*********************************************
 Frontend

 TO DO: 
  - Add input with tags & state
  - Add recharts graph with data from API
  - Better refactoring of the code into components once the input and graph
  are working properly

 *********************************************/

export const App = () => {

  // const [graphData, setGraphData] = useState([]);
  // const [inputValue, setInputValue] = useState("");

  return (
    <main className="w-dvw h-dvh flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Buscador de Ativos Financeiros</h1>
      <div className="mt-8 h-1/2 w-full flex items-center flex-col">

        <div className="w-full max-w-[1200px] gap-4 h-12 flex items-center justify-center">
          <input
            type="text"
            className="w-[80%] border-2 border-blue-500 border-solid rounded-full indent-4 h-full text-black"
          />

          <button
            onClick={() => fetchMovie()}
            className="w-[20%] bg-blue-500 p-3 text-xl font-semibold rounded-full cursor-pointer h-full flex items-center justify-center text-white"
          >
            Pesquisar
          </button>
        </div>

      </div>
    </main>
  );
};

export default App;
