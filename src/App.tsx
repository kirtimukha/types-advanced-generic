import React, { useState } from "react";
import people from "./mock-data/people";
import widgets from "./mock-data/widgets";
import { WidgetRenderer } from "./components/renders/WidgetRenderer";
import { PeopleRenderer } from "./components/renders/PeopleRenderer";
import { SearchSortAndFilter } from "./components/SearchSortAndFilter";

function App() {
  const [showPeople, setShowPeople] = useState<boolean>(false);
  const buttonText = showPeople ? "Show widgets" : "show People";
  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => setShowPeople(!showPeople)}
      >
        {buttonText}
      </button>
      <br />

      {!showPeople && (
        <>
          <SearchSortAndFilter
            title="Widgets:"
            searchProperties={["title", "description"]}
            dataSource={widgets}
            initialSortProperty={{ property: "title", isDescending: true }}
            initialFilterProperties={[]}
            inisialSearchQuery="type"
          >
            {(widget) => <WidgetRenderer {...widget} key={widget.id} />}
          </SearchSortAndFilter>
        </>
      )}
      {showPeople && (
        <>
          <SearchSortAndFilter
            title="People:"
            searchProperties={["firstName", "lastName", "eyeColor"]}
            dataSource={people}
            initialSortProperty={{ property: "firstName", isDescending: true }}
            initialFilterProperties={[]}
            inisialSearchQuery="type"
          >
            {(person) => <PeopleRenderer {...person} key={person.id} />}
          </SearchSortAndFilter>
        </>
      )}
    </>
  );
}

export default App;
