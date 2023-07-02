import ISroperty from "../interface/ISroperty";

export interface ISortersProps<T> {
  object: T;
  setProperty: (propertyType: ISroperty<T>) => void;
}

export function Sorters<T extends {}>(props: ISortersProps<T>) {
  const { object, setProperty } = props;
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
            setProperty({
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
    </div>
  );
}
