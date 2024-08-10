import React from 'react';

// Define the props type
interface SectionTitleProps {
  heading: string;
  subHeading: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ heading, subHeading }) => {
  return (
    <div className='mx-auto text-center md:w-4/12 my-8'>
      <p className='text-yellow-600 mb-2 italic'>--- {subHeading} ---</p>
      <h3 className='text-4xl uppercase border-y-4 py-4'>{heading}</h3>
    </div>
  );
};

export default SectionTitle;
