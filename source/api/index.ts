import { NewsBlock } from '../state/modules/news';

const API_KEY = '8ce44c3a6df140b3a6b01bd6f0c29392';
const API_URL = 'https://newsapi.org/v2/top-headlines';

const timeout = (delay: number): () => Promise<{}> => () => new Promise(resolve => setTimeout(resolve, delay));

export type API = {
  checkToken: () => LoginResponse;
  login: (params: LoginParams) => LoginResponse;
  logout: () => LogoutResponse;
  getNews: (params: NewsParams) => NewsResponse;
}

export function checkToken() {
  return new Promise((resolve, reject) => {
    if (localStorage.getItem('token') === 'admin') {
      resolve({ username: 'Admin' });
    } else {
      reject();
    }
  });
}

export type LoginParams = { username: string; password: string }
export type LoginResponse = Promise<{ username: string }>
export function login(params: LoginParams): LoginResponse {
  return Promise.resolve()
    .then(timeout(300))
    .then(() => {
      const { username, password } = params;

      if ((username === 'Admin' && password === '12345')) {
        localStorage.setItem('token', 'admin');
        return { username };
      }

      throw new Error('Имя пользователя или пароль введены не верно');
    });
}

export type LogoutResponse = Promise<void>;
export function logout(): Promise<void> {
  localStorage.removeItem('token');
  return Promise.resolve();
}

type NewsResponse = Promise<{
  articles: NewsBlock[];
  totalResults: number;
}>

export type NewsParams = {
  page: number;
}

export function getNews(params: NewsParams): NewsResponse {
  const url = `${API_URL}?country=ru&apiKey=${API_KEY}&page=${params.page || 1}&pageSize=10`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        return response.json().then(error => Promise.reject(error));
      }

      return response.json();
    });
}
