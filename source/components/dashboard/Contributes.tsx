import * as React from 'react';

export interface Props {
  knowledges: string[];
  onNewKnowledgeClick: () => void;
}

export function Knowledge(props: { knowledge: string }) {
  return (
    <div className="contributes__knowledge">
      {props.knowledge}
    </div>
  );
}

export default function Contributes({ knowledges, onNewKnowledgeClick }: Props) {
  return (
    <section className="contributes">
      <h2 className="contributes__header">
        あなたのKnowledges
        <button onClick={onNewKnowledgeClick}>
          <span className="fa fa-pencil" /> 新規作成
        </button>
      </h2>
      <article className="contributes__article">
        {(knowledges || []).map((knowledge, i) => <Knowledge key={i.toString()} {...{ knowledge }} />)}
      </article>
    </section>
  );
}
