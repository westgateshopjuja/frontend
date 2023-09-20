import { Button } from "@mantine/core";
import React from "react";

const ProductList = () => {
  const triggerSTK = async () => {
    const res = await fetch(`/api/tinypesa-init`);

    console.log(await res.json());
  };

  return (
    <div>
      <Button onClick={triggerSTK}>Trigger STK</Button>
    </div>
  );
};

export default ProductList;
