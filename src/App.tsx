import React, { useState } from 'react';
import people from './mock-data/people';
import widgets from './mock-data/widgets';
import genericSearch from './utils/genericSearch';
import SearchInput from './components/SearchInput';
import genericSort from './utils/genericSort';
import IProperty from './interface/IProperty';
import IWidget from './interface/IWidget';
import IPerson from './interface/IPerson';
import { Sorters } from './components/Sorters';
import WidgetRenderer from './components/renders/WidgetRenderer';
import PeopleRenderer from './components/renders/PeopleRenderer';
import genericFilter from './utils/genericFilter';

function App() {
  const [widgetFiilterProperties, setWidgetFiilterProperties] = useState<
    Array<keyof IWidget>
  >([]);
  const [peopleFiilterProperties, setPeopleFiilterProperties] = useState<
    Array<keyof IPerson>
  >([]);
  const [showPeople, setShowPeople] = useState<boolean>(false);
  const buttonText = showPeople ? 'Show widgets' : 'show People';
  const [query, setQuery] = useState<string>('');
  const [widgetSortProperty, setWidgetSortProperty] = useState<
    IProperty<IWidget>
  >({
    property: 'title',
    isDescending: true,
  });
  const [peopleSortProperty, setPeopleSortProperty] = useState<
    IProperty<IPerson>
  >({ property: 'firstName', isDescending: true });
  return (
    <>
      <button
        className='btn btn-primary'
        onClick={() => setShowPeople(!showPeople)}
      >
        {buttonText}
      </button>
      <br />
      <SearchInput
        setSearchQuery={(query) => {
          console.log("I'm firing");
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
          {widgets
            .filter((widget) =>
              genericSearch(widget, ['title', 'description'], query, true)
            )
            .filter((widget) => genericFilter(widget, widgetFiilterProperties))
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
      {showPeople && (
        <>
          {people
            .filter((person) =>
              genericSearch(
                person,
                ['firstName', 'lastName', 'eyeColor'],
                query,
                true
              )
            )
            .filter((person) => genericFilter(person, peopleFiilterProperties))
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
