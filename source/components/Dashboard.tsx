import * as React from 'react';
import { Location } from 'history';

import HeaderComponent from './common/Header';
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
  knowledgeSummariesGetStart: (category: string) => void;
  news: string[];
  knowledges: string[];
  categories: CategoriesTree;
  selectPath: string;
  params: { category?: string };
}

export default class Dashboard extends React.Component<Props, {}> {
  static async fetchData({ store, params }: FetchDataProps) {
    store.dispatch(CategoriesActions.categoriesGetDone(await getCategoriesEntity()));
    store.dispatch(GroupsActions.getDone(await getGroupsEntity()));
    store.dispatch(RolesActions.getDone(await getRolesEntity()));
    store.dispatch(TagsActions.getDone(await getTagsEntity()));
    store.dispatch(UsersActions.getSummariesDone(await getUserSummariesEntity()));
    store.dispatch(CategoriesActions.categoryTreeSelect(`/${params.category}`));
  }

  constructor(props: Props) {
    super(props);
    this.handleNewKnowledgeClick = this.handleNewKnowledgeClick.bind(this);
    this.handleCategoriesOpenStateChangeClick = this.handleCategoriesOpenStateChangeClick.bind(this);
  }

  componentDidMount() {
    if (this.props.params.category) {
      const selectPath = `/${this.props.params.category}`;
      if (this.props.selectPath !== selectPath)  {
        this.setSelectCategoryTree(selectPath);
      }
    }
  }

  handleNewKnowledgeClick() {
    // console.log(this.props.NEWS_GET_START());
  }

  handleCategoriesOpenStateChangeClick(event: React.MouseEvent<HTMLButtonElement>) {
    this.props.categoryTreeIsOpenChange(event.currentTarget.value);
  }

  setSelectCategoryTree(category: string) {
    this.props.categoryTreeSelect(category);
    this.props.knowledgeSummariesGetStart(category);
  }

  render() {
    const { handleNewKnowledgeClick, props } = this;

    return (
      <section className="dashboard">
        <section className="dashboard__top-section">
          <HeaderComponent
            selectPath={props.selectPath}
            category={props.categories}
          />
        </section>
        <section className="dashboard__mid-section">
          <CategoriesTreeComponent
            {...props}
            onOpenStateChangeClick={this.handleCategoriesOpenStateChangeClick}
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
        <section className="dashboard__bottom-section">
          BOTTOM
        </section>
      </section>
    );
  }
}
