import { SortEnum } from "../enums/sort.enum";

export function sortArray(
  array: any[],
  namepropertyToSort: string,
  sortType: SortEnum
): any[] {
  const inverseSortType: SortEnum = sortType * -1;
  return array.sort((item1, item2) =>
    item1[namepropertyToSort] > item2[namepropertyToSort]
      ? sortType
      : inverseSortType
  );
}

export function disctinctArray(array: any[]): any[] {
  return array.filter((item, i, ar) => ar.indexOf(item) === i);
}
