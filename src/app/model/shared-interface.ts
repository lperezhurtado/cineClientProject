export interface SharedInterface {
}

export interface Pageable {
  sort:       Sort;
  offset:     number;
  pageNumber: number;
  pageSize:   number;
  paged:      boolean;
  unpaged:    boolean;
}

export interface Sort {
  empty:    boolean;
  sorted:   boolean;
  unsorted: boolean;
}

export interface IDate {
  year: number,
  month: number,
  day: number
}

export interface ITime {
  hour: number,
  minute: number
}

export interface IFecha {
  date: IDate,
  time: ITime
}
