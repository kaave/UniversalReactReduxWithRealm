import * as React from 'react';

export interface Props {
  news: string[];
}

export function News(props: { title: string }) {
  return (
    <div className="latest-news__news">
      ○○年△△月□□日に @JaneDoe が書きました!
      {props.title}
    </div>
  );
}

export default function LatestNews({ news }: Props) {
  return (
    <section className="dashboard__latest-news latest-news">
      <h2 className="latest-news__header">
        お知らせ
      </h2>
      <article className="latest-news__article">
        {/* {(news || []).map(title => <News {...{ title }} />)} */}
      </article>
    </section>
  );
}
