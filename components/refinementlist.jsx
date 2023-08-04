import { Badge, NavLink } from "@mantine/core";
import { useRefinementList } from "react-instantsearch-hooks-web";

export default function CustomRefinementList(props) {
  const {
    items,
    hasExhaustiveItems,
    createURL,
    refine,
    sendEvent,
    searchForItems,
    isFromSearch,
    canRefine,
    canToggleShowMore,
    isShowingMore,
    toggleShowMore,
  } = useRefinementList(props);

  return (
    <div>
      {items.map((item) => (
        <div className="flex space-x-4 p-2">
          <a
            href={`/category/${item?.value}`}
            className=" uppercase text-[0.8rem] block"
          >
            {item?.value}
          </a>

          <Badge variant="filled">{item?.count}</Badge>
        </div>
      ))}
    </div>
  );
}
