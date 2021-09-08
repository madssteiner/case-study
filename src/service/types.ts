export interface IPaginationLink {
  previous: string;
  current: string;
  next: string;
}

export interface IPagination {
  total: number;
  pages: number;
  page: number;
  limit: number;
  links: IPaginationLink;
}

export interface IMeta {
  pagination: IPagination;
}

export interface IResponse<T> {
  meta: IMeta;
  data: T;
}
