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
import Filters from './components/Filters';

function App() {
  const [widgetFilterProperties, setWidgetFilterProperties] = useState<Array<keyof IWidget>>([]);
  const [peopleFilterProperties, setPeopleFilterProperties] = useState<Array<keyof IPerson>>([]);
  const [showPeople, setShowPeople] = useState<boolean>(false);
  const buttonText = showPeople ? 'Show widgets' : 'show People';
  const [query, setQuery] = useState<string>('');
  const [widgetSortProperty, setWidgetSortProperty] = useState<IProperty<IWidget>>({ property: 'title', isDescending: true });
  const [peopleSortProperty, setPeopleSortProperty] = useState<IProperty<IPerson>>({ property: 'firstName', isDescending: true });
  return (
    <>
      <button className='btn btn-primary' onClick={() => setShowPeople(!showPeople)}>
        {buttonText}
      </button>
      <br />
      <SearchInput
        setSearchQuery={query => {
          setQuery(query);
        }}
      />
      {!showPeople && (
        <>
          <h2>Widegets: </h2>
          <Sorters<IWidget> object={widgets[0]} setProperty={propertyType => setWidgetSortProperty(propertyType)} />
          <br />
          <Filters
            object={widgets[0]}
            properties={widgetFilterProperties}
            onChangeFilter={property => {
              widgetFilterProperties.includes(property)
                ? setWidgetFilterProperties(widgetFilterProperties.filter(widgetFilterProperties => widgetFilterProperties !== property))
                : setWidgetFilterProperties([...widgetFilterProperties, property]);
            }}
          />
          {widgets
            .filter(widget => genericSearch(widget, ['title', 'description'], query, true))
            .filter(widget => genericFilter(widget, widgetFilterProperties))
            .sort((a, b) => genericSort(a, b, widgetSortProperty))
            .map((widget, index) => {
              return <WidgetRenderer key={widget.id} {...widget} />;
            })}
        </>
      )}
      <h2>People: </h2>
      <Sorters<IPerson> object={people[0]} setProperty={propertyType => setPeopleSortProperty(propertyType)} />
      <br />
      <Filters
        object={people[0]}
        properties={peopleFilterProperties}
        onChangeFilter={property => {
          peopleFilterProperties.includes(property)
            ? setPeopleFilterProperties(peopleFilterProperties.filter(peopleFilterProperties => peopleFilterProperties !== property))
            : setPeopleFilterProperties([...peopleFilterProperties, property]);
        }}
      />

      {showPeople && (
        <>
          {people
            .filter(person => genericSearch(person, ['firstName', 'lastName', 'eyeColor'], query, true))
            .filter(person => genericFilter(person, peopleFilterProperties))
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
