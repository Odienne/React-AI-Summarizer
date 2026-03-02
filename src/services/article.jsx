import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://article-extractor-and-summarizer.p.rapidapi.com/';
const HOST = 'article-extractor-and-summarizer.p.rapidapi.com';
const KEY = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', KEY);
      headers.set('X-RapidAPI-Host', HOST);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (params) =>
        `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=${params.length}&lang=${params.lang}`,
    }),
  }),
});

//lazy to fire it on demand
export const { useLazyGetSummaryQuery } = articleApi;
