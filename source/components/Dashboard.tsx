import * as React from 'react';

import Contributes from './dashboard/Contributes';
import LatestNews from './dashboard/LatestNews';
import * as CategoriesActions from '../actions/categories';
import * as GroupsActions from '../actions/groups';
import * as TagsActions from '../actions/tags';
import { getCategoriesEntity } from '../epics/categories';
import { getGroupsEntity } from '../epics/groups';
import { getTagsEntity } from '../epics/tags';
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
    store.dispatch(TagsActions.getDone(await getTagsEntity()));
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
