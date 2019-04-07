import React, { useEffect, useCallback } from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';
import { bindActionCreators } from 'redux';
import * as NewsActions from '../../state/modules/news';

import classes from './classes.css';

import { RootState } from '../../state/modules';

type StateProps = NewsActions.NewsState;
type DispatchProps = {
  getNews: typeof NewsActions.getNews;
}
type Props = RouteComponentProps<{ pageId: string }> & StateProps & DispatchProps

const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value));

const moveTo = (currentPage: number | string | undefined, offset: number, totalPage: number) => {
  navigate(`news/${clamp(Number(currentPage) + offset, 1, totalPage)}`);
};

export const Content: React.SFC<Props> = (props): JSX.Element => {
  const {
    loading,
    pageId,
    totalPage,
    ids,
    articles,
    getNews,
  } = props;

  useEffect(() => {
    getNews({ page: Number(pageId) });
  }, [pageId]);

  const nextPage = useCallback(() => moveTo(pageId, 1, totalPage), [pageId, totalPage]);
  const prevPage = useCallback(() => moveTo(pageId, -1, totalPage), [pageId, totalPage]);

  if (loading) {
    return <p className={classes.placeholder}>Loading...</p>;
  }

  return (
    <div>
      {
        ids.map((id) => {
          const {
            title,
            description,
            publishedAt,
            source,
            url,
          } = articles[id];

          return (
            <div key={id} className={classes.block}>
              <span>{format(publishedAt, 'D MMMM YYYY', { locale: ru })}</span>
              <span>{source.name}</span>
              <h1>{title}</h1>
              <p>
                {description}
                <a href={url}>Читать дальше →</a>
              </p>
            </div>
          );
        })
      }
      <ul className={classes.pagination}>
        <li>
          <button type="button" onClick={prevPage} disabled={Number(pageId) <= 1}>←</button>
        </li>
        <li>{pageId}</li>
        <li>
          <button type="button" onClick={nextPage} disabled={Number(pageId) >= totalPage}>→</button>
        </li>
      </ul>
    </div>
  );
};

export const NewsContent = connect(
  (store: RootState) => store.news,
  dispatch => bindActionCreators({ getNews: NewsActions.getNews }, dispatch),
)(Content);
