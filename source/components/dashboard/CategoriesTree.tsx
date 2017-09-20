// tslint:disable:jsx-no-multiline-js
import * as React from 'react';

import { CategoriesTree } from '../../entities/categoriesTree';

interface Props {
  categories: CategoriesTree;
  selectPath: string;
  onOpenStateChangeClick: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
  onSelectClick: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
}

function CategoriesTreeParent(props: Props): JSX.Element {
  const {
    categories: { path, fullPath, count, isOpen, children: childCategories },
    selectPath,
    onOpenStateChangeClick,
    onSelectClick,
  } = props;
  const style = {
    visibility: fullPath !== '/' && childCategories && childCategories.length > 0 ? 'visible' : 'hidden',
  };

  return (
    <ul className="categories-tree__parent">
      <li className={`categories-tree__desc ${fullPath === selectPath ? 'categories-tree__desc--active' : ''}`}>
        <button
          className="categories-tree__button categories-tree__button--plus-or-minus"
          onClick={onOpenStateChangeClick}
          value={fullPath}
          style={style}
        >
          <span className={`fa fa-${isOpen ? 'minus' : 'chevron-right'}`} />
        </button>
        <button
          className="categories-tree__button categories-tree__button--select"
          onClick={onSelectClick}
          value={fullPath}
        >
          <span className="categories-tree__desc">{path}</span>
          <span className="categories-tree__count">{count}</span>
        </button>
      </li>
      {isOpen && childCategories && (
        <li className="categories-tree__sub">
          {childCategories.map((childCategory, i) => (
            <CategoriesTreeParent
              key={i.toString()}
              categories={childCategory}
              onOpenStateChangeClick={onOpenStateChangeClick}
              onSelectClick={onSelectClick}
              selectPath={selectPath}
            />
          ))}
        </li>
      )}
    </ul>
  );
}

export default function CategoriesTreeComponent(props: Props): JSX.Element {
  return (
    <section className="categories-tree">
      <CategoriesTreeParent {...props} />
    </section>
  );
}
