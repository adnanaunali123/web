import React from "react";
import { useRouter } from "next/router";

interface Products {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
}

interface CardProd {
  product: Products;
}

const Card = ({ product }: CardProd) => {
  const router = useRouter();

  const handleInput = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <div className="w-[300px] rounded-md border">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="h-[200px] w-full rounded-md object-cover"
      />
      <div className="p-4">
        <h1 className="text-lg font-semibold">{product.title}</h1>
        <p className="mt-3 text-sm text-gray-600">{product.description}</p>
        <button
          type="button"
          className="mt-4 rounded-sm bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          onClick={handleInput}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default Card;
