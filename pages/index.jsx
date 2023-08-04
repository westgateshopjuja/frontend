import { Chip, Select, Text } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons";

import { SpotlightProvider, spotlight } from "@mantine/spotlight";
import { Carousel } from "react-responsive-carousel";
import { Footer, Logoheader, ProductCard, ProductSearch } from "../components";

import { useRouter } from "next/router";
import { useState } from "react";
import { useInfiniteHits, useSearchBox } from "react-instantsearch-hooks-web";

export default function Home() {
  const [value, setValue] = useState(["earrings"]);

  const { query, refine, clear, isSearchStalled } = useSearchBox();
  const router = useRouter();

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
        <div className="p-4">
          <SpotlightProvider
            actions={hits}
            actionComponent={ProductSearch}
            onQueryChange={refine}
            searchIcon={<IconSearch size="1.2rem" />}
            searchPlaceholder="Search..."
            shortcut="mod + shift + 1"
            nothingFoundMessage="Nothing found..."
          >
            <div
              onClick={spotlight.open}
              className="cursor-pointer flex space-x-2 border-[0.5px] p-2"
            >
              <IconSearch color="#909090" size={20} style={{ marginTop: 2 }} />
              <span className="text-[#909090]">Search</span>
            </div>
          </SpotlightProvider>
        </div>

        <div className="p-4 py-0">
          <Carousel
            style={{ zIndex: -9 }}
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            autoPlay
            showArrows={false}
          >
            {["/slider3.jpg", "slider2.jpg", "slider1.jpg"].map((image) => (
              <div>
                <img src={image} className="w-full" />
              </div>
            ))}
          </Carousel>
        </div>

        <div className="mt-8 space-y-3">
          <div className="flex justify-between px-4 text-[0.8rem] font-medium items-baseline">
            <h1>Shop The Latest</h1>
            <span className="text-[#228B22] font-light cursor-pointer">
              View all
            </span>
          </div>

          <div className="gap-8 overflow-y-auto w-full p-4 grid grid-cols-2">
            {currentPageHits.map((_hit, i) => (
              <ProductCard key={i} hit={_hit} />
            ))}
          </div>

          <div className="flex justify-between px-4 text-[0.8rem] font-medium items-baseline">
            <h1>Categories</h1>
          </div>

          <div className="p-4">
            <Chip.Group multiple value={value} onChange={setValue}>
              {["earrings", "necklaces", "watches", "shoes", "hats"].map(
                (el, i) => (
                  <Chip
                    key={i}
                    style={{ display: "inline-block", margin: 8 }}
                    value={el}
                    variant="light"
                    size="md"
                    radius="xs"
                    color="dark"
                  >
                    {el.charAt(0).toUpperCase() + el.slice(1, el.length)}
                  </Chip>
                )
              )}
            </Chip.Group>
          </div>

          <div className="gap-8 overflow-y-auto w-full grid grid-cols-2 p-4">
            {[
              {
                id: 1,
                name: "Lira Earrings",
                price: 2000,
              },
              {
                id: 2,
                name: "Ollie Earrings",
                price: 2000,
              },
              {
                id: 3,
                name: "Hal Earrings",
                price: 2000,
              },
              {
                id: 4,
                name: "Kaede Earrings",
                price: 2000,
                was: 2500,
                saved: true,
              },
            ].map((el, i) => (
              <ProductCard key={i} product={el} />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
