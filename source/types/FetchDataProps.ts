import { Store } from 'redux';

export default interface FetchDataProps {
  store: Store<{}>;
  params: object;
}
