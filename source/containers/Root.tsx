import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Switch, Link, Route } from 'react-router-dom';
import { returntypeof } from 'react-redux-typescript';

import * as Routes from '../routes';
// import { actions as KnowledgeActions } from '../actions/knowledgeForm';
// import { actions as NewsActions } from '../actions/news';
import { actions as CategoriesActions } from '../actions/categories';
import { actions as KnowledgesActions } from '../actions/knowledges';
import { GlobalState } from '../reducers';
import FetchDataProps from '../types/FetchDataProps';

function mapStateToProps(state: GlobalState) {
  return { ...state };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return bindActionCreators(
    {
      ...CategoriesActions,
      ...KnowledgesActions,
    },
    dispatch,
  );
}

const stateProps = returntypeof(mapStateToProps);
const dispatchProps = returntypeof(mapDispatchToProps);

type Props = typeof stateProps & typeof dispatchProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)((props: Props) => (
  <Switch>
    {// tslint:disable-next-line
      Routes.routes.map(({ path, component: MountComponent, exact }: Routes.Route) => (
        <Route
          {...{ path, exact }}
          key={`${Math.random()}ROUTE_`}
          // tslint:disable-next-line
          render={reactRouterProps => <MountComponent {...{ ...reactRouterProps, ...props }} />}
        />
      ))
    }
    {/* {redirects} */}
  </Switch>
));
