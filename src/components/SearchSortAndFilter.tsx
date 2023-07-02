import * as React from "react";
import IFilter from "../interface/IFilter";
import ISorter from "../interface/ISorter";
import PropsWithChildrenFunction from "../types/PropsWithChildrenFunction";
import genericFilter from "../utils/genericFilter";
import genericSearch from "../utils/genericSearch";
import genericSort from "../utils/genericSort";
import { Filters } from "./Filters";
import { SearchInput } from "./SearchInput";
import { Sorters } from "./Sorters";

export interface ISearchSortAndFilterProps<T> {
  title: string;
  dataSource: Array<T>; //Type 'T[]' is not assignable to type '{}[]'.
  //Type 'T' is not assignable to type '{}'.
  inisialSearchQuery: string;
  searchProperties: Array<keyof T>;
  initialSortProperty: ISorter<T>;
  initialFilterProperties: Array<IFilter<T>>;
}

export interface ISearchSortAndFilterState<T> {
  searchQuery: string;
  sortProperty: ISorter<T>; //Type 'ISorter<{}>' is not assignable to type 'ISorter<T>'.
  //Type 'T' is not assignable to type '{}'.
  filterProperties: Array<IFilter<T>>;
}

export function SearchSortAndFilter<T>(
  props: PropsWithChildrenFunction<ISearchSortAndFilterProps<T>, T>
) {
  const {
    title,
    dataSource,
    inisialSearchQuery,
    searchProperties,
    initialSortProperty,
    initialFilterProperties,
    children,
  } = props;
  const [searchSortAndFilterState, setSearchSortAndFilterState] =
    React.useState<ISearchSortAndFilterState<T>>({
      searchQuery: inisialSearchQuery,
      sortProperty: initialSortProperty,
      filterProperties: initialFilterProperties,
    });
  const { searchQuery, sortProperty, filterProperties } =
    searchSortAndFilterState;
  return (
    <>
      <h2> {title} </h2>
      <SearchInput
        searchQuery={searchQuery}
        setSearchQuery={(searchQuery) =>
          setSearchSortAndFilterState({
            ...searchSortAndFilterState,
            searchQuery,
          })
        }
      />
      <Sorters
        dataSource={dataSource}
        setSortProperty={(sortProperty) => {
          setSearchSortAndFilterState({
            ...searchSortAndFilterState,
            sortProperty,
          });
        }}
      />
      <Filters
        dataSource={dataSource}
        filterProperties={filterProperties}
        setFilterProperties={(filterProperties) => {
          setSearchSortAndFilterState({
            ...searchSortAndFilterState,
            filterProperties,
          });
        }}
      />

      {children &&
        dataSource
          .filter((a) => genericSearch(a, searchProperties, searchQuery, false))
          .sort((a, b) => genericSort(a, b, sortProperty))
          .filter((a) => genericFilter(a, filterProperties))
          .map((a) => children(a))}
    </>
  );
}
