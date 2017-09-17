import { Component } from 'react';
import { Store } from 'redux';

interface FetchDataProps {
  store: Store<{}>;
  params: object;
}

export default interface UniversalComponent {
  new (): Component;
  fetchData: ((obj: FetchDataProps) => Promise<any>) | undefined;
}
