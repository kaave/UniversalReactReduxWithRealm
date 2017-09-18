import * as React from 'react';

import Contributes from './dashboard/Contributes';
import LatestNews from './dashboard/LatestNews';
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

export interface Props {
  NEWS_GET_START: () => void;
  news: string[];
  knowledges: string[];
}

export default class Dashboard extends React.Component<Props, {}> {
  static async fetchData({ store, params }: FetchDataProps) {
    store.dispatch(CategoriesActions.getDone(await getCategoriesEntity()));
    store.dispatch(GroupsActions.getDone(await getGroupsEntity()));
    store.dispatch(RolesActions.getDone(await getRolesEntity()));
    store.dispatch(TagsActions.getDone(await getTagsEntity()));
    store.dispatch(UsersActions.getSummariesDone(await getUserSummariesEntity()));
  }

  constructor(props: Props) {
    super(props);
    this.handleNewKnowledgeClick = this.handleNewKnowledgeClick.bind(this);
  }

  handleNewKnowledgeClick() {
    console.log(this.props.NEWS_GET_START());
  }

  render() {
    const { handleNewKnowledgeClick, props } = this;

    return (
      <section className="dashboard">
        <LatestNews {...props} />
        <Contributes {...props} onNewKnowledgeClick={handleNewKnowledgeClick} />
      </section>
    );
  }
}
