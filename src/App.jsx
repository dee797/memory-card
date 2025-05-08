import { useState, useEffect, createContext } from "react";
import Card from "./Card";

const useFetchItems = (setItems, setError, setLoading, setDefaultItems) => {
  const itemData = [];

  useEffect(() => {
    fetch("https://botw-compendium.herokuapp.com/api/v3/compendium/category/equipment", { mode: "cors" })
      .then((res) => {
        if (res.status >= 400) {
          throw new Error("server error");
        }

        return res.json();
      })
      .then((res) => {
        const weapons = [
          'thunderblade',
          'great thunderblade',
          'lightning rod',
          'thunderstorm rod',
          'frostblade',
          'great frostblade',
          'ice rod',
          'blizzard rod',
          'flameblade',
          'great flameblade',
          'fire rod',
          'meteor rod'
        ]

        for (const item of res.data) {
          if (weapons.includes(item.name)) {
            item.wasSelected = false;
            itemData.push(item);
          }

          if (itemData.length === 12) {
            break;
          }
        }

        setDefaultItems(structuredClone(itemData));
        setItems(itemData);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

};

export const CardContext = createContext(null)

const App = () => {
  // defaultItems don't change, they're used to reset game back to its initial state
  const [defaultItems, setDefaultItems] = useState(null);
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useFetchItems(setItems, setError, setLoading, setDefaultItems);


  if (loading) return (<div className="h-screen w-screen flex items-center justify-center"><div className="loader mx-auto"></div></div>);
  if (error) return (<p className="h-screen w-screen text-center">A network error was encountered.</p>);

  return (
    <div className="flex flex-col max-w-full min-h-screen bg-yellow-50">
      <header className="p-8 bg-sky-900 drop-shadow-2xl text-white">
        <div className="mx-40 py-6 max-w-full flex flex-col sm:flex-row sm:items-center sm:justify-between ">
          <span className="font-bold text-4xl">Breath of the Wild: Memory Card Game</span>
          <div id="scores" className="flex sm:justify-end gap-20 text-2xl">
            <span>Score: {currentScore}</span>
            <span>Best Score: {bestScore}</span>
          </div>
        </div>
        <div id="instructions" className="flex flex-col mx-40 pb-6 gap-x-2 text-xl">
          <p className="font-bold text-2xl">How to Play:</p>
          <p>1. Choose from any of the magical weapons below. Make sure to remember which one you picked.</p>
          <p>2. After the weapons have shuffled, pick a different weapon. If you pick one that you've already selected before, the game will reset.</p>
          <p>3. Keep selecting new weapons until you've clicked all of them exactly once. When you've reached this condition, you win the game!</p>
        </div>
      </header>

      <div id="grid" className="grid max-w-full mx-5 my-16 gap-y-14 gap-x-5">
        <CardContext.Provider value={{setItems, setCurrentScore, setBestScore, currentScore, defaultItems}}>
          {items.map((item) => {
            return <Card item={item} key={item.id}/>
          })}
        </CardContext.Provider>
      </div>

    </div>
  );
};



export default App;