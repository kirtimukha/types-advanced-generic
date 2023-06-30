import React, { useState } from "react";
import people from "./mock-data/people";
import widgets from "./mock-data/widgets";
import genericSearch from "./utils/genericSearch";
import SearchInput from "./components/SearchInput";

function App() {
  const [query, setQuery] = useState<string>("");
  return (
    <>
      <SearchInput
        setSearchQuery={(query) => {
          console.log("I'm firing");

          setQuery(query);
        }}
      />
      <h2>Widegets: </h2>
      {widgets
        .filter((widget) =>
          genericSearch(widget, ["title", "description"], query, true)
        )
        .map((widget, index) => {
          return <h3 key={index}>{widget.title}</h3>;
        })}

      <h2>People: </h2>
      {people
        .filter((person) =>
          genericSearch(
            person,
            ["firstName", "lastName", "eyeColor"],
            query,
            true
          )
        )
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
