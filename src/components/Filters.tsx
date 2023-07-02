import React from "react";
import IFilter from "../interface/IFilter";

export interface IFiltersProps<T> {
  dataSource: Array<T>;
  filterProperties: Array<IFilter<T>>;

  setFilterProperties(filterProperites: Array<IFilter<T>>): void;
}

export function Filters<T>(props: IFiltersProps<T>) {
  const { dataSource, filterProperties, setFilterProperties } = props;
  const object = dataSource.length > 0 ? dataSource[0] : {};
  const onChangeFilter = (property: IFilter<T>) => {
    const propertyMatch = filterProperties.some(
      (filterProperty) => filterProperty.property === property.property
    );
    const fullMatch = filterProperties.some(
      (filterProperty) =>
        filterProperty.property === property.property &&
        filterProperty.isTruthySelected === property.isTruthySelected
    );
    if (fullMatch) {
      setFilterProperties(
        filterProperties.filter(
          (filterProperty) => filterProperty.property !== property.property
        )
      );
    } else if (propertyMatch) {
      setFilterProperties([
        ...filterProperties.filter(
          (filterProperty) => filterProperty.property !== property.property
        ),
        property,
      ]);
    } else {
      setFilterProperties([...filterProperties, property]);
    }
  };

  return (
    <div className={`Filters p-3 my-2`}>
      <label className="mt-3">Filters! Try us Too!</label>
      <br />
      {Object.keys(dataSource).map((key, index) => {
        return (
          <React.Fragment key={key}>
            <input
              key={`${key}-true`}
              title={`${key}-true`}
              id={`${key}-true`}
              className="m1 -ml3"
              type="checkbox"
              value={key}
              checked={filterProperties.some(
                (property) =>
                  property.property === key && property.isTruthySelected
              )}
              onChange={() =>
                onChangeFilter({
                  property: key as any,
                  isTruthySelected: true,
                })
              }
            />
            &nbsp;
            <label htmlFor={`${key}-true`}>[ {key} ] is truthy!</label>
            &nbsp;&nbsp;&nbsp;
            <input
              key={`${key}-false`}
              title={`${key}-false`}
              id={`${key}-false`}
              className="m1 -ml3"
              type="checkbox"
              value={key}
              checked={filterProperties.some(
                (property) =>
                  property.property === key && !property.isTruthySelected
              )}
              onChange={() =>
                onChangeFilter({
                  property: key as any,
                  isTruthySelected: false,
                })
              }
            />
            &nbsp;
            <label htmlFor={`${key}-false`}>[ {key} ] is falsy!</label>
            <br />
          </React.Fragment>
        );
      })}
    </div>
  );
}
