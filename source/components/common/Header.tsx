import * as React from 'react';
import { Link } from 'react-router-dom';

import { CategoriesTree } from '../../entities/categoriesTree';

interface Props {
  category: CategoriesTree;
  selectPath: string;
}

function SelectPathWithLink({ selectPath }: Props) {
  const splitPath = selectPath.split('/').filter(path => !!path);
  const splitPathLength = splitPath.length;
  return (
    <div className="header__title-select-path">
      {splitPath.map((path, i) => ([
        <span key="1" className="header__title-select-path-slash">/</span>,
        (splitPathLength > i + 1) ? (
          <Link
            key="2"
            to={`/categories/${[...splitPath.slice(0, i + 1)].join('/')}`}
            className="header__title-select-path-link"
          >
            {path}
          </Link>
        ) : (
          <span key="2">{path}</span>
        ),
      ]))}
    </div>
  );
}

function Title(props: Props) {
  const { selectPath, category } = props;

  return (
    <div className="header__title">
      Dashboard
      {selectPath !== '/' && [': ', <SelectPathWithLink key={'1'} {...props} />]}
    </div>
  );
}

export default function Header(props: Props) {
  const { selectPath } = props;

  return (
    <header id="header" className="header">
      <section className="header__left-section">
        <div className="header__symbol">
          Symbol Image
        </div>
        <Title {...props} />
      </section>
      <section className="header__right-section">
        RIGHT
      </section>
    </header>
  );
}
