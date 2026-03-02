// src/mocks/handlers.js
import { rest } from 'msw';

const BASE_URL = 'https://article-extractor-and-summarizer.p.rapidapi.com';

export const handlers = [
  rest.get(`${BASE_URL}/summarize`, (req, res, ctx) => {
    const url = req.url.searchParams.get('url');
    return res(
      ctx.status(200),
      ctx.json({
        data: { summary: `This is a mock summary for ${url}` },
      })
    );
  }),
];