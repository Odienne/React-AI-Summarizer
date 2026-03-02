import React from 'react';

import { useState, useEffect } from 'react';
import { copy, linkIcon, loader, tick } from '../../assets';
import { useLazyGetSummaryQuery } from '../../services/article';

function Demo() {
  const [article, setArticle] = useState({
    url: '',
    summary: '',
  });
  const [lang, setLang] = useState('fr');
  const [length, setLength] = useState(0);

  const [copiedUrl, setCopiedUrl] = useState({});

  const [allArticles, setAllArticles] = useState([]);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!article.url) return;

    const data = await getSummary({ articleUrl: article.url, lang: lang, length: length });

    if (data?.data?.summary) {
      const newArticle = { ...article, summary: data.data.summary };
      setArticle(newArticle);

      // also add new article to history
      const updatedAllArticles = [newArticle, ...allArticles];
      setAllArticles(updatedAllArticles);
      //and save to localStorage
      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
    }
  };

  const handleCopy = (copyUrl, index) => {
    setCopiedUrl({ url: copyUrl, index });
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => {
      setCopiedUrl({});
    }, 2000);
  };

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'));

    if (articlesFromLocalStorage) {
      setTimeout(() => setAllArticles(articlesFromLocalStorage), 0);
    }
    setTimeout(() => {
      setLang('fr');
      setLength(0);
    });
  }, []);

  return (
    <section className='mt-16 w-full max-w-xl'>
      {/* search */}
      <div className='flex flex-col w-full gap-2'>
        <form className='relative flex justify-center items-center' onSubmit={handleSubmit}>
          <img src={linkIcon} alt='link_icon' className='absolute left-0 my-2 ml-3 w-5' />

          <input
            type='url'
            placeholder='Enter a url'
            value={article.url}
            onChange={(e) => {
              setArticle({ ...article, url: e.target.value });
            }}
            className='url_input peer'
          />

          <button
            type='submit'
            className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'
          >
            <p>↵</p>
          </button>
        </form>

        {/* browse url history */}
        <div className='flex flex-col gap-1 max-h-50 overflow-y-auto'></div>
        {allArticles.map((article, index) => (
          <div className='link_card' key={`link-${index}`} onClick={() => setArticle(article)}>
            <div className='copy_btn' onClick={() => handleCopy(article.url, index)}>
              <img
                src={copiedUrl.url === article.url && copiedUrl.index === index ? tick : copy}
                alt='copy_icon'
                className='w-[40%] h-[40%] object-contain'
              />
            </div>
            <p className='flex-1 font-medium font-satoshi text-bmie-700 text-sm truncate'>
              {article.url}
            </p>
          </div>
        ))}
      </div>
      {/* results */}
      <div className='my-10 max-w-full flex justify-center items-center'>
        {isFetching ? (
          <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
        ) : error ? (
          <p className='font-inter font-bold tetx-black text-center'>
            An error occured... <br />
            <span className='font-satoshi font-normal text-gray-700'>{error.data?.error}</span>
          </p>
        ) : (
          article.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='font-satoshi font-bold text-gray-600'>
                Article <span className='blue_gradient'>Summary</span>
              </h2>
              <div className='summary_box'>
                <p className='font-inter font-medium text-sm text-gray-700'>{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}

export default Demo;
