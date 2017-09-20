export interface CategoriesTree {
  path: string;
  fullPath: string;
  count: number;
  children: CategoriesTree[];
  isOpen?: boolean;
}
