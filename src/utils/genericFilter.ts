export default function genericFilter<T>(object: T, filterProperties: Array<keyof T>): boolean {
  return filterProperties.every(filterProperty => {
    return object[filterProperty] ? true : false;
  });
  /*
  Type Falsey Value(s)
  object  -> undefined, null, NaN
  string  -> ""
  number  -> 0
  boolean -> false
  */
}
