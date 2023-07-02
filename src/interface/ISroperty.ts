export default interface ISroperty<T> {
  property: keyof T;
  isDescending: boolean;
}
