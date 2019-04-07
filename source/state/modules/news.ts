import { handleActions } from 'redux-actions';
import { Dispatch } from 'redux';
import { API, NewsParams } from '../../api';
import { RootState } from '.';

export type NewsBlock = {
  id: string;
  source: {
    'id': null;
    'name': string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export type NewsState = {
  loading: boolean;
  totalPage: number;
  ids: string[];
  articles: {
    [key: string]: NewsBlock;
  };
}

const initialState: NewsState = {
  loading: false,
  ids: [],
  articles: {},
  totalPage: 0,
};

export type NewsAction =
  | { type: 'news/get/request' }
  | { type: 'news/get/resolve'; payload: Partial<NewsState> }
  | { type: 'news/get/reject'; payload: Error }

export const getNews = (params: NewsParams) => async (
  dispatch: Dispatch<NewsAction>,
  getState: () => RootState,
  api: API,
) => {
  dispatch({ type: 'news/get/request' });

  try {
    const { articles, totalResults } = await api.getNews(params);

    const init: {
      ids: string[];
      articles: {
        [key: string]: NewsBlock;
      };
    } = {
      ids: [],
      articles: {},
    };

    const payload = {
      totalPage: Math.floor(totalResults / 10) + 1,
      ...articles.reduce((result, it) => {
        const { source, publishedAt } = it;

        const id = `${source.name}|${publishedAt}`;
        result.ids.push(id);
        result.articles[id] = { id, ...it }; // eslint-disable-line

        return result;
      }, init),
    };


    dispatch({ type: 'news/get/resolve', payload });
  } catch (error) {
    dispatch({ type: 'news/get/reject', payload: error });
  }
};

export default handleActions({
  'news/get/request': state => ({ ...state, loading: true }),
  'news/get/resolve': (state, { payload }) => ({ ...state, loading: false, ...payload }),
  'news/get/reject': (state, { payload }) => ({ ...state, loading: false, error: payload }),
}, initialState);
