import * as React from 'react';

import { CategoriesTree } from '../../entities/categoriesTree';

interface Props {
  category: CategoriesTree;
  selectPath: string;
  onPathClick: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
}

function SelectPathWithLink({ selectPath, onPathClick }: Props) {
  const splitPath = selectPath.split('/').filter(path => !!path);
  return (
    <div className="header__title-select-path">
      {splitPath.map((path, i) => ([
        <span key="1" className="header__title-select-path-slash">/</span>,
        <button
          key="2"
          className="header__title-select-path-link"
          value={`/${[...splitPath.slice(0, i + 1)].join('/')}`}
          onClick={onPathClick}
        >
          {path}
        </button>,
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
