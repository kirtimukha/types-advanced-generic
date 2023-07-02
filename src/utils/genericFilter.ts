import IFilter from "../interface/IFilter";

export default function genericFilter<T>(
  object: T,
  filterProperties: Array<IFilter<T>>
): boolean {
  return filterProperties.every((filterProperty) => {
    const { property, isTruthySelected } = filterProperty;
    return isTruthySelected ? object[property] : !object[property];
  });
  /*
  Type Falsey Value(s)
  object  -> undefined, null, NaN
  string  -> ""
  number  -> 0
  boolean -> false
  */
}
