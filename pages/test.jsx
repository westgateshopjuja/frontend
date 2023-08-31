import React from "react";
import { useInfiniteHits } from "react-instantsearch";
import { ProductCard } from "../components";

const ProductList = () => {
  const saleTimestamp = Date.now(); // Current timestamp in milliseconds

  const productOnSaleFilter = (hit) => {
    return hit.variants.some(
      (variant) =>
        variant.sale &&
        Number(variant.sale.startTime) <= saleTimestamp &&
        saleTimestamp <= Number(variant.sale.endTime)
    );
  };

  const {
    hits: hits2,
    isLastPage: isLastPage2,
    showMore: showMore2,
  } = useInfiniteHits();

  const filteredHits = hits2.filter(productOnSaleFilter);

  return (
    <div>
      <h1>Products on Sale</h1>
      <div className="w-full flex overflow-x-auto space-x-8">
        {filteredHits.map((_hit, i) => (
          <ProductCard key={i} hit={_hit} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
