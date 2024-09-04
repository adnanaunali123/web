import React, { useState } from "react";
import Card from "@/components/ui/card";
import { useRouter } from "next/router";

interface Products {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
}

interface DashviewProd {
  product: Products[];
}

const DashBoard = ({ product }: DashviewProd) => {
  // Initial number of products to show
  const [visibleCount, setVisibleCount] = useState(4);

  // Function to handle the "Load More" button click
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  return (
    <React.Fragment>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {product.slice(0, visibleCount).map((prod) => (
          <Card key={prod.id} product={prod} />
        ))}
      </div>
      {visibleCount < product.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 bg-black text-white rounded mb-4"
          >
            Load More
          </button>
        </div>
      )}
    </React.Fragment>
  );
};

export default DashBoard;
