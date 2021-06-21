import axios, { AxiosInstance } from 'axios';

export const customAxios: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/', // 기본 서버 주소 입력
});