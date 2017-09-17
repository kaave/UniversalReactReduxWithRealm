import * as React from 'react';

import Contributes from './dashboard/Contributes';
import LatestNews from './dashboard/LatestNews';

export interface Props {
  NEWS_GET_START: () => void;
  news: string[];
  knowledges: string[];
}

export default class Dashboard extends React.Component<Props, {}> {
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
