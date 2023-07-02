import IFilter from "../interface/IFilter";

export interface IFiltersProps<T> {
  object: T;
  properties: Array<IFilter<T>>;
  onChangeFilter: (property: IFilter<T>) => void;
}

export default function Filters<T>(props: IFiltersProps<T>) {
  const { object, properties, onChangeFilter } = props;
  return (
    <div className={`Filters p-3 my-2`}>
      <label className="mt-3">Filters! Try us Too!</label>
      <br />
      {Object.keys(object as any).map((key) => {
        return (
          <>
            <input
              key={`${key}-true`}
              title={`${key}-true`}
              id={`${key}-true`}
              className="m1 -ml3"
              type="checkbox"
              value={key}
              checked={properties.some(
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
              checked={properties.some(
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
            &nbsp;&nbsp;&nbsp;
          </>
        );
      })}
    </div>
  );
}
