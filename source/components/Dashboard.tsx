import * as React from 'react';

import CategoriesTreeComponent from './dashboard/CategoriesTree';
import DashboardRootComponent from './dashboard/DashboardRoot';
import SelectCategoryInfoComponent from './dashboard/SelectCategoryInfo';
import * as CategoriesActions from '../actions/categories';
import * as GroupsActions from '../actions/groups';
import * as RolesActions from '../actions/roles';
import * as TagsActions from '../actions/tags';
import * as UsersActions from '../actions/users';
import { getCategoriesEntity } from '../epics/categories';
import { getGroupsEntity } from '../epics/groups';
import { getRolesEntity } from '../epics/roles';
import { getTagsEntity } from '../epics/tags';
import { getUserSummariesEntity } from '../epics/users';
import FetchDataProps from '../types/FetchDataProps';
import { CategoriesTree } from '../entities/categoriesTree';

export interface Props {
  categoryTreeIsOpenChange: (targetFullPath: string) => void;
  categoryTreeSelect: (selectFullPath: string) => void;
  news: string[];
  knowledges: string[];
  categories: CategoriesTree;
  selectPath: string;
}

export default class Dashboard extends React.Component<Props, {}> {
  static async fetchData({ store, params }: FetchDataProps) {
    store.dispatch(CategoriesActions.categoriesGetDone(await getCategoriesEntity()));
    store.dispatch(GroupsActions.getDone(await getGroupsEntity()));
    store.dispatch(RolesActions.getDone(await getRolesEntity()));
    store.dispatch(TagsActions.getDone(await getTagsEntity()));
    store.dispatch(UsersActions.getSummariesDone(await getUserSummariesEntity()));
  }

  constructor(props: Props) {
    super(props);
    this.handleNewKnowledgeClick = this.handleNewKnowledgeClick.bind(this);
    this.handleCategoriesOpenStateChangeClick = this.handleCategoriesOpenStateChangeClick.bind(this);
    this.handleCategoriesSelectClick = this.handleCategoriesSelectClick.bind(this);
  }

  handleNewKnowledgeClick() {
    // console.log(this.props.NEWS_GET_START());
  }

  handleCategoriesOpenStateChangeClick(event: React.MouseEvent<HTMLButtonElement>) {
    this.props.categoryTreeIsOpenChange(event.currentTarget.value);
  }

  handleCategoriesSelectClick(event: React.MouseEvent<HTMLButtonElement>) {
    this.props.categoryTreeSelect(event.currentTarget.value);
  }

  render() {
    const { handleNewKnowledgeClick, props } = this;

    return (
      <section className="dashboard">
        <CategoriesTreeComponent
          {...props}
          onOpenStateChangeClick={this.handleCategoriesOpenStateChangeClick}
          onSelectClick={this.handleCategoriesSelectClick}
        />
        {props.selectPath === '/' ?
          <DashboardRootComponent /> : (
          <SelectCategoryInfoComponent
            selectPath={props.selectPath}
            category={props.categories}
          />
          )
        }
      </section>
    );
  }
}
