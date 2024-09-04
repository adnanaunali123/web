import React, { Fragment } from "react";

import DashBoard from "@/views/DashBoard";
import NavBar from "@/components/ui/navbar";

interface Products {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
}
interface DashProd {
  product: Products[];
}

const Dashboard: React.FC<DashProd> = ({ product }) => {
  return (
    <Fragment>
      <NavBar />
      <DashBoard product={product} />
    </Fragment>
  );
};

export default Dashboard;

export const getServerSideProps = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    const product: Products[] = Array.isArray(data.products)
      ? data.products
      : [];

    return { props: { product } };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { props: { product: [] } };
  }
};
