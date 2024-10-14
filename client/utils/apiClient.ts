import aspida from '@aspida/axios';
import api from 'api/$api';
import type { AxiosError } from 'axios';
import axios from 'axios';
import { NEXT_PUBLIC_API_BASE_PATH } from './envValues';

export const apiAxios = axios.create({
  baseURL: NEXT_PUBLIC_API_BASE_PATH,
  withCredentials: true,
  timeout: 10000, // 10秒のタイムアウト
});

// リクエストインターセプター
apiAxios.interceptors.request.use(
  (config) => {
    // 認証トークンをヘッダーに追加する例
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// レスポンスインターセプター
apiAxios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      // サーバーからのエラーレスポンスを処理
      console.error('API error:', error.response.status, error.response.data);
    } else if (error.request) {
      // リクエストは作成されたがレスポンスが受信されなかった
      console.error('No response received:', error.request);
    } else {
      // リクエストの設定中に何かが問題になった
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  },
);

export const apiClient = api(aspida(apiAxios));
