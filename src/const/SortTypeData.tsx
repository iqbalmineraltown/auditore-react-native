import { SortType } from '../models/SortType';

export type SortingItemProps = {
  key: SortType;
  value: string;
}

export const sortTypeData: SortingItemProps[] = [
  { key: SortType.NameAscending, value: "Nama A-Z" },
  { key: SortType.NameDescending, value: "Nama Z-A" },
  { key: SortType.CreatedDateAscending, value: "Tanggal Terlama" },
  { key: SortType.CreatedDateDescending, value: "Tanggal Terbaru" },
];
