import React from 'react';

// Define the props type
interface CoverProps {
  img: string;
  title: string;
  subtitle: string;
}

const Cover: React.FC<CoverProps> = ({ img, title, subtitle }) => {
  return (
    <div
      className='hero h-[500px]'
      style={{
        backgroundImage: `url("${img}")`
      }}
    >
      {/* <div className='hero-overlay '></div> */}
      <div className='hero-content text-neutral-content text-center'>
        <div className='bg-black bg-opacity-60 lg:w-[700px] py-[60px]'>
          <h1 className='mb-5 text-5xl font-semibold uppercase'>{title}</h1>
          <p className='mb-5 uppercase'>{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default Cover;
