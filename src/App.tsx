import React, { useState } from "react";
import people from "./mock-data/people";
import widgets from "./mock-data/widgets";
import genericSearch from "./utils/genericSearch";
import SearchInput from "./components/SearchInput";
import genericSort from "./utils/genericSort";
import IProperty from "./interface/IProperty";
import IWidget from "./interface/IWidget";
import IPerson from "./interface/IPerson";
import { Sorters } from "./components/Sorters";

function App() {
  const [query, setQuery] = useState<string>("");
  const [widgetSortProperty, setWidgetSortProperty] = useState<
    IProperty<IWidget>
  >({
    property: "title",
  });
  const [peopleSortProperty, setPeopleSortProperty] = useState<
    IProperty<IPerson>
  >({ property: "firstName" });
  return (
    <>
      <SearchInput
        setSearchQuery={(query) => {
          console.log("I'm firing");
          setQuery(query);
        }}
      />
      <h2>Widegets: </h2>
      <Sorters<IWidget>
        object={widgets[0]}
        setProperty={(property) => setWidgetSortProperty({ property })}
      />
      {widgets
        .filter((widget) =>
          genericSearch(widget, ["title", "description"], query, true)
        )
        .sort((a, b) => genericSort(a, b, widgetSortProperty.property))
        .map((widget, index) => {
          return <h3 key={index}>{widget.title}</h3>;
        })}

      <h2>People: </h2>
      <Sorters<IPerson>
        object={people[0]}
        setProperty={(property) => setPeopleSortProperty({ property })}
      />
      {people
        .filter((person) =>
          genericSearch(
            person,
            ["firstName", "lastName", "eyeColor"],
            query,
            true
          )
        )
        .sort((a, b) => genericSort(a, b, peopleSortProperty.property))
        .map((person, index) => {
          return (
            <h3 key={index}>
              {person.firstName} {person.lastName}
            </h3>
          );
        })}
    </>
  );
}

export default App;
