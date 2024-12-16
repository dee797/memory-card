import { useState, useContext } from "react";
import { CardContext } from "./App";

const Card = ({item, itemNum, wasSelected}) => {
  const { shuffleCardMap } = useContext(CardContext);
  
  return (

    <button 
      className={`relative p-0 m-auto h-fit flex items-center justify-center w-full max-w-60 flex-col overflow-hidden rounded-lg border-4 border-sky-900 bg-sky-800 shadow-md hover:shadow-blue-800 hover:shadow-2xl`}
      type="button"
      onClick={() => {
        if (!wasSelected) {

          shuffleCardMap((items) => {
            const copy = new Map(items);
            copy.set(itemNum, {wasSelected: true});
            const copyArray = Array.from(copy)

            for (let i = copyArray.length - 1; i >= 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
            }
            
            return new Map(copyArray);
          });

        }
        else {
          alert("You already selected this card.");
        }
        
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