export interface CategoriesEntity {
  path: string;
  count: number;
  children: CategoriesEntity[];
}
