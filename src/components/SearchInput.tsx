import React, { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

export interface ISearchProps {
  setSearchQuery: (searchQuery: string) => void;
}

const SearchInput = (props: ISearchProps) => {
  const { setSearchQuery } = props;
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 250);
  useEffect(() => {
    setSearchQuery(debouncedQuery);
  }, [debouncedQuery, setSearchQuery]);
  return (
    <>
      <label htmlFor="search" className="mt-3">
        Search! Try me!
      </label>
      <input
        type="text"
        id="search"
        className="form-control full-width"
        placeholder="Search..."
        aria-label="Search"
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />
    </>
  );
};
export default SearchInput;
