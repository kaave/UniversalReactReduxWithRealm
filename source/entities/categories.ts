export interface CategoriesEntity {
  path: string;
  fullPath: string;
  count: number;
  children: CategoriesEntity[];
}
