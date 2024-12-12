import { useState } from "react";

const Card = ({item}) => {
  const [wasSelected, setSelected] = useState(false);

  return (
    <div className="relative m-auto h-fit flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <div className="relative mx-3 mt-3 p-5 flex h-60 overflow-hidden rounded-xl items-center justify-center">
        <img className="w-full h-full" src={item.image} alt="product image" />
      </div>
      <div className="mt-4 px-5 pb-5">
        <h5 className="text-xl tracking-tight text-slate-900">{item.name}</h5>
      </div>
    </div>
  );
};

export default Card;