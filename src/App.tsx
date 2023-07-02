import React, { useState } from "react";
import people from "./mock-data/people";
import widgets from "./mock-data/widgets";
import genericSearch from "./utils/genericSearch";
import SearchInput from "./components/SearchInput";
import genericSort from "./utils/genericSort";
import ISroperty from "./interface/ISroperty";
import IWidget from "./interface/IWidget";
import IPerson from "./interface/IPerson";
import { Sorters } from "./components/Sorters";
import WidgetRenderer from "./components/renders/WidgetRenderer";
import PeopleRenderer from "./components/renders/PeopleRenderer";
import genericFilter from "./utils/genericFilter";
import Filters from "./components/Filters";
import IFilter from "./interface/IFilter";

function App() {
  const [widgetFilterProperties, setWidgetFilterProperties] = useState<
    Array<IFilter<IWidget>>
  >([]);
  const [peopleFilterProperties, setPeopleFilterProperties] = useState<
    Array<IFilter<IPerson>>
  >([]);
  const [showPeople, setShowPeople] = useState<boolean>(false);
  const buttonText = showPeople ? "Show widgets" : "show People";
  const [query, setQuery] = useState<string>("");
  const [widgetSortProperty, setWidgetSortProperty] = useState<
    ISroperty<IWidget>
  >({
    property: "title",
    isDescending: true,
  });
  const [peopleSortProperty, setPeopleSortProperty] = useState<
    ISroperty<IPerson>
  >({
    property: "firstName",
    isDescending: true,
  });
  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => setShowPeople(!showPeople)}
      >
        {buttonText}
      </button>
      <br />
      <SearchInput
        setSearchQuery={(query) => {
          setQuery(query);
        }}
      />
      {!showPeople && (
        <>
          <h2>Widegets: </h2>
          <Sorters<IWidget>
            object={widgets[0]}
            setProperty={(propertyType) => setWidgetSortProperty(propertyType)}
          />
          <br />
          <Filters
            object={widgets[0]}
            properties={widgetFilterProperties}
            onChangeFilter={(property) => {
              const propertyMatch = widgetFilterProperties.some(
                (widgetFilterProperty) =>
                  widgetFilterProperty.property === property.property
              );
              const fullMatch = widgetFilterProperties.some(
                (widgetFilterProperty) =>
                  widgetFilterProperty.property === property.property &&
                  widgetFilterProperty.isTruthySelected ===
                    property.isTruthySelected
              );
              if (fullMatch) {
                setWidgetFilterProperties(
                  widgetFilterProperties.filter(
                    (widgetFilterProperty) =>
                      widgetFilterProperty.property !== property.property
                  )
                );
              } else if (propertyMatch) {
                setWidgetFilterProperties([
                  ...widgetFilterProperties.filter(
                    (widgetFilterProperty) =>
                      widgetFilterProperty.property !== property.property
                  ),
                  property,
                ]);
              } else {
                setWidgetFilterProperties([
                  ...widgetFilterProperties,
                  property,
                ]);
              }
            }}
          />
          {widgets
            .filter((widget) =>
              genericSearch(widget, ["title", "description"], query, true)
            )
            .filter((widget) => genericFilter(widget, widgetFilterProperties))
            .sort((a, b) => genericSort(a, b, widgetSortProperty))
            .map((widget, index) => {
              return <WidgetRenderer key={widget.id} {...widget} />;
            })}
        </>
      )}
      <h2>People: </h2>
      <Sorters<IPerson>
        object={people[0]}
        setProperty={(propertyType) => setPeopleSortProperty(propertyType)}
      />
      <br />
      <Filters
        object={people[0]}
        properties={peopleFilterProperties}
        onChangeFilter={(property) => {
          const propertyMatch = peopleFilterProperties.some(
            (peopleFilterProperty) =>
              peopleFilterProperty.property === property.property
          );
          const fullMatch = peopleFilterProperties.some(
            (peopleFilterProperty) =>
              peopleFilterProperty.property === property.property &&
              peopleFilterProperty.isTruthySelected ===
                property.isTruthySelected
          );
          if (fullMatch) {
            setPeopleFilterProperties(
              peopleFilterProperties.filter(
                (peopleFilterProperty) =>
                  peopleFilterProperty.property !== property.property
              )
            );
          } else if (propertyMatch) {
            setPeopleFilterProperties([
              ...peopleFilterProperties.filter(
                (peopleFilterProperty) =>
                  peopleFilterProperty.property !== property.property
              ),
              property,
            ]);
          } else {
            setPeopleFilterProperties([...peopleFilterProperties, property]);
          }
        }}
      />

      {showPeople && (
        <>
          {people
            .filter((person) =>
              genericSearch(
                person,
                ["firstName", "lastName", "eyeColor"],
                query,
                true
              )
            )
            .filter((person) => genericFilter(person, peopleFilterProperties))
            .sort((a, b) => genericSort(a, b, peopleSortProperty))
            .map((person, index) => {
              return <PeopleRenderer {...person} />;
            })}
        </>
      )}
    </>
  );
}

export default App;
