import { useState, useEffect } from "react";
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



const App = () => {
  const { items, error, loading } = useFetchItems();
  const [ itemIndexes, randomizeItemIndexes ] = useState([20, 21, 22, 35, 36, 37, 38, 39, 40, 67, 68, 69]);

  if (loading) return (<div className="h-screen w-screen flex items-center justify-center"><div className="loader mx-auto"></div></div>);
  if (error) return (<p className="h-screen w-screen text-center">A network error was encountered.</p>);

  return (
    <div className="flex flex-col max-w-full min-h-screen">
      <header className="px-4 bg-black">
        <div className="relative mx-auto py-6 flex max-w-screen-lg flex-col sm:flex-row sm:items-center sm:justify-between text-neutral-50">
          <span>Breath of the Wild Memory Card Game</span>
          <span>Score: {}</span>
          <span>Best Score: {}</span>
        </div>
      </header>

      <div className="grid grid-rows-3 grid-cols-4 w-full">
        {itemIndexes.map((item) => {
          return <Card item={items.data[item]} key={item}/>
        })}
      </div>

    </div>
  );
};



export default App;