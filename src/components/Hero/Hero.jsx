import React from 'react';

import { logo } from '../../assets';
import { PROJECT_LINK } from '../../constants/constants';

function Hero() {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full mb-10 pt-3'>
        <img src={logo} alt='sumz-logo' className='w-28 object-contain' />

        <button
          type='button'
          className='black_btn'
          onClick={() => {
            window.open(PROJECT_LINK);
          }}
        >Github</button>
      </nav>

      <h1 className='head_text'>Summarize articles with <br className='max-md:hidden'/>
      <span className='orange_gradient'>OpenAI GPT-4</span></h1>

      <h2 className='desc'>
        Simplify articles and strip the corporate bullshit with Summarize, an open-source summarizer to help you digest lengthy articles into clear and concise summaries.
      </h2>
    </header>
  );
}

export default Hero;
