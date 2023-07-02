import React from "react";
import ISorter from "../interface/ISorter";

export interface ISortersProps<T> {
  dataSource: Array<T>;

  setSortProperty(sortProperty: ISorter<T>): void;
}

export function Sorters<T extends {}>(props: ISortersProps<T>) {
  const { dataSource, setSortProperty } = props;
  const object = dataSource.length > 0 ? dataSource[0] : {};
  return (
    <div className={`Sorters`}>
      <label htmlFor="sorters" className="mt-3">
        Sorters! Try us Too!
      </label>
      <select
        id="sorters"
        className="custom-select"
        onChange={(event) => {
          const values = event.target.value.split("-");
          if (values.length === 2) {
            setSortProperty({
              property: values[0] as any,
              isDescending: values[1] === "true",
            });
          }
        }}
      >
        {Object.keys(object)?.map((key) => {
          return (
            <React.Fragment key={key}>
              <option key={`${key}-true`} value={`${key}-true`}>
                sort by '{key}' Descending!
              </option>
              <option key={`${key}-false`} value={`${key}-false`}>
                sort by '{key}' ascending!
              </option>
            </React.Fragment>
          );
        })}
      </select>
    </div>
  );
}
