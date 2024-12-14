import { useState, useContext } from "react";
import { CardContext } from "./App";

const Card = ({item}) => {
  const [wasSelected, setSelected] = useState(false);
  const { shuffleItemNumbers } = useContext(CardContext);
  
  return (

    <button 
      className={`relative p-0 m-auto h-fit flex items-center justify-center w-full max-w-60 flex-col overflow-hidden rounded-lg border-4 border-sky-900 bg-sky-800 shadow-md hover:shadow-blue-800 hover:shadow-2xl`}
      type="button"
      onClick={() => {
        !wasSelected ?
        setSelected((selected) => selected = true) : alert("You already selected this card.")
        shuffleItemNumbers((items) => {
          const copy = [...items];
          for (let i = copy.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
          }
          return copy;
        });
      }}
    >
      <div className="relative flex w-full h-52 p-4 overflow-hidden rounded-xl items-center justify-center">
        <img className="w-full h-full rounded-md shadow-lg" src={item.image} alt="product image" width={100} height={100}/>
      </div>
      <div className="w-full p-4">
        <h5 className="w-full text-lg text-white text-center font-bold">{item.name}</h5>
      </div>
    </button>
  );
};

export default Card;