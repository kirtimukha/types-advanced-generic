import React, { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

export interface ISearchInputProps {
  searchQuery: string;

  setSearchQuery(searchQuery: string): void;
}

export function SearchInput(props: ISearchInputProps) {
  const { setSearchQuery, searchQuery } = props;
  const [query, setQuery] = useState<string>(searchQuery);
  const debouncedQuery = useDebounce(query, 250);
  useEffect(() => {
    setSearchQuery(debouncedQuery);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);
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
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />
    </>
  );
}
