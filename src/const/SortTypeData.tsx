import { SortType } from '../models/SortType';

export type SortingItemProps = {
  value: SortType;
  label: string;
}

export const sortTypeData: SortingItemProps[] = [
  { value: SortType.NameAscending, label: "Nama A-Z" },
  { value: SortType.NameDescending, label: "Nama Z-A" },
  { value: SortType.CreatedDateAscending, label: "Tanggal Terlama" },
  { value: SortType.CreatedDateDescending, label: "Tanggal Terbaru" },
];
