import {
  InstantSearch,
  Stats,
  useInfiniteHits,
} from "react-instantsearch-hooks-web";
import { Footer, Logoheader, ProductCard } from "../../components";

import { useRouter } from "next/router";
import { searchClient } from "../_app";

export default function Saved() {
  const router = useRouter();

  const {
    query: { category },
  } = router;

  const {
    hits,
    currentPageHits,
    results,
    isFirstPage,
    isLastPage,
    showPrevious,
    showMore,
    sendEvent,
  } = useInfiniteHits();

  return (
    <div>
      <Logoheader />

      <div className="mt-[80px] relative">
        <div className="flex justify-between px-8 w-full fixed top-[72px] left-0 z-40 bg-white pb-3">
          <h1 className="font-medium text-[1.5rem] mt-2">{category}</h1>
          <span className="block text-[#909090] mt-3">
            <Stats />
          </span>
        </div>
      </div>

      <div className="p-4 space-y-8 mt-[130px] relative">
        <InstantSearch
          searchClient={searchClient}
          indexName="thrifthub"
          initialUiState={{
            indexName: {
              query: "thrifthub",
              refinementList: {
                colors: [category],
              },
            },
          }}
        >
          <ProductList />
        </InstantSearch>
      </div>
      <Footer />
    </div>
  );
}

const ProductList = () => {
  const {
    hits,
    currentPageHits,
    results,
    isFirstPage,
    isLastPage,
    showPrevious,
    showMore,
    sendEvent,
  } = useInfiniteHits();

  return (
    <div className="grid grid-cols-2 gap-8">
      {currentPageHits.map((_hit, i) => (
        <ProductCard key={i} hit={_hit} />
      ))}
    </div>
  );
};
