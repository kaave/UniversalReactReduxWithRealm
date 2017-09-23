import * as React from 'react';

import { CategoriesTree } from '../../entities/categoriesTree';

interface Props {
  selectPath: string;
  category: CategoriesTree;
}

export default function SelectCategoryInfo({ selectPath, category }: Props) {
  return (
    <div className="select-category-info">
      <section className="select-category-info__knowledges">
        <h2 className="select-category-info__knowledges-header">
          Fresh knowledges
        </h2>
      </section>
    </div>
  );
}
