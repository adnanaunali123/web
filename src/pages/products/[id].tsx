import { GetServerSideProps } from "next";
import React from "react";
import NavBar from "@/components/ui/navbar";

interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
}

const DetailProductPage = ({ product }: { product: Product }) => {
  return (
    <>
      <NavBar />
      <section className="overflow-hidden">
        <div className="mx-auto max-w-5xl px-5 py-24">
          <div className="mx-auto flex flex-wrap items-center lg:w-4/5">
            <img
              alt={product.title}
              className="h-64 w-full rounded object-cover lg:h-96 lg:w-1/2"
              src={product.thumbnail}
            />
            <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
              <h2 className="text-sm font-semibold tracking-widest text-gray-500">
                {product.category}
              </h2>
              <h1 className="my-4 text-3xl font-semibold text-black">
                {product.title}
              </h1>
              <div className="my-4 flex items-center"></div>
              <p className="leading-relaxed">{product.description}</p>
              <div className="mb-5 mt-6 flex items-center border-b-2 border-gray-100 pb-5"></div>
              <div className="flex items-center justify-between">
                <span className="title-font text-xl font-bold text-gray-900">
                  PKR{product.price}
                </span>
                <button
                  type="button"
                  className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailProductPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const product = await response.json();

    if (!product) {
      return {
        notFound: true,
      };
    }

    return {
      props: { product },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      notFound: true,
    };
  }
};
