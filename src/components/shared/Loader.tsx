import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loader = () => {
  return (
    <div className="z-20 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <FaSpinner size={25} className="animate-spin text-secondary" />
    </div>
  );
};

export default Loader;
