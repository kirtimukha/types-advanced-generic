export interface IFiltersProps<T> {
  object: T;
  properties: Array<keyof T>;
  onChangeFilter: (property: keyof T) => void;
}

export default function Filters<T>(props: IFiltersProps<T>) {
  const { object, properties, onChangeFilter } = props;
  return (
    <div className={`Filters p-3 my-2`}>
      <label className='mt-3'>Filters! Try us Too!</label>
      <br />
      {Object.keys(object as any).map(key => {
        return (
          <>
            <input
              key={key}
              title={key}
              type='checkbox'
              value={key}
              checked={properties.some(property => property === key)}
              id={key}
              className='m1 -ml3'
              onChange={() => onChangeFilter(key as any)}
            />
            &nbsp;
            <label htmlFor={key}>[ {key} ] is truthy!</label>
            &nbsp;&nbsp;&nbsp;
          </>
        );
      })}
    </div>
  );
}
