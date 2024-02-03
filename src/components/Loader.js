import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center ">
      <div className="border-t-4 border-black border-solid rounded-full w-12 h-12 animate-spin"></div>
    </div>
  );
};

export default Loader;