import { useState, useEffect, createContext } from "react";
import Card from "./Card";

const useFetchItems = () => {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://botw-compendium.herokuapp.com/api/v3/compendium/category/equipment", { mode: "cors" })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => {
        setItems(response);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { items, error, loading };
};

export const CardContext = createContext(null)

const App = () => {
  const { items, error, loading } = useFetchItems();
  const cardData = [
    [20, {wasSelected: false}], 
    [21, {wasSelected: false}],
    [22, {wasSelected: false}],
    [35, {wasSelected: false}],
    [36, {wasSelected: false}],
    [37, {wasSelected: false}],
    [38, {wasSelected: false}],
    [39, {wasSelected: false}],
    [40, {wasSelected: false}],
    [67, {wasSelected: false}],
    [68, {wasSelected: false}],
    [69, {wasSelected: false}]];

  const [ cardMap, shuffleCardMap ] = useState(new Map(cardData));

  if (loading) return (<div className="h-screen w-screen flex items-center justify-center"><div className="loader mx-auto"></div></div>);
  if (error) return (<p className="h-screen w-screen text-center">A network error was encountered.</p>);

  return (
    <div className="flex flex-col max-w-full min-h-screen bg-yellow-50">
      <header className="p-8 bg-sky-900 drop-shadow-2xl text-white">
        <div className="mx-40 py-6 max-w-full flex flex-col sm:flex-row sm:items-center sm:justify-between ">
          <span className="font-bold text-4xl">Breath of the Wild: Memory Card Game</span>
          <div className="flex sm:justify-end gap-20 text-2xl">
            <span>Score: {}</span>
            <span>Best Score: {}</span>
          </div>
        </div>
        <div className="flex flex-col mx-40 pb-6 gap-x-2 text-xl">
          <p className="font-bold text-2xl">How to Play:</p>
          <p>1. Choose from any of the magical weapons below. Make sure to remember which one you picked.</p>
          <p>2. After the weapons have shuffled, pick a different weapon. If you pick one that you've already selected before, the game will reset.</p>
          <p>3. Keep selecting new weapons until you've clicked all of them exactly once. When you've reached this condition, you win the game!</p>
        </div>
      </header>

      <div className="grid grid-cols-5 grid-rows-3 max-w-full mx-5 my-16 gap-y-14">
        <CardContext.Provider value={{shuffleCardMap}} >
          {Array.from(cardMap).map((item) => {
            return <Card item={items.data[item[0]]} itemNum={item[0]} wasSelected={item[1].wasSelected} key={item[0]}/>
          })}
        </CardContext.Provider>
      </div>

    </div>
  );
};



export default App;