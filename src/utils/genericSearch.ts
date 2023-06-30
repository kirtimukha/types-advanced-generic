export default function genericSearch<T>(
  object: T,
  properties: Array<keyof T>,
  query: string,
  shouldBeCaseSensitive: boolean
): boolean {
  if (query === "") {
    return true;
  }

  //return properties.map((property) => {
  const expression = properties.map((property) => {
    const value = object[property];

    if (typeof value === "string" || typeof value === "number") {
      if (shouldBeCaseSensitive) {
        return value.toString().includes(query);
      } else {
        return value.toString().toLowerCase().includes(query);
      }
    }
    return false;
  });

  return expression.some((expression) => expression); // if expression is true return true, false will return false
}
