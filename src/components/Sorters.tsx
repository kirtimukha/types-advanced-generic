import { ReactNode, useState } from "react";
import ISorter from "../interface/ISorter";
import genericSort from "../utils/genericSort";

type PropsWithchildrenFunction<P, T> = P & { children?(item: T): ReactNode };

export interface ISortersProps<T> {
  dataSource: Array<T>;
  initialSortProperty: keyof T;
  /*  setProperty: (propertyType: ISorter<T>) => void;*/
}

export function Sorters<T extends {}>(
  props: PropsWithchildrenFunction<ISortersProps<T>, T>
) {
  const { dataSource, initialSortProperty, children } = props;
  const [sortProperty, setSortProperty] = useState<ISorter<T>>({
    property: initialSortProperty,
    isDescending: true,
  });
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
        {Object.keys(object).map((key) => {
          return (
            <>
              <option key={`${key}-true`} value={`${key}-true`}>
                sort by '{key}' Descending!
              </option>
              <option key={`${key}-false`} value={`${key}-false`}>
                sort by '{key}' ascending!
              </option>
            </>
          );
        })}
      </select>
      {children &&
        dataSource
          .sort((a, b) => genericSort(a, b, sortProperty))
          .map((widget) => children(widget))}
    </div>
  );
}
