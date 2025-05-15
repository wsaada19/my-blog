import React from 'react';
import Image from 'next/image';

type AboutProps = {
  name: string;
  aboutText: string;
};

export const About = ({ name, aboutText }: AboutProps) => {
  return (
    <>
      <div className="flex flex-col-reverse justify-center w-full items-center sm:flex-row sm:justify-between">
        <div className="grow w-full mt-4 sm:mt-0 sm:w-auto">
          <h1 className="sm:text-4xl tracking-tight sm:mt-0">{name}</h1>
          <p className="text-xl sm:text-2xl text-gray-500 dark:text-gray-400 tracking-tighter">
            Software Engineer, Cleveland, OH
          </p>
        </div>
        <Image
          src="/images/circle-photo.png"
          className="rounded-full border-4 border-white"
          height={260}
          width={260}
          alt="Me and the doggo"
          priority={true}
        />
        <div></div>
      </div>
      <div className="bg-blue-600 shadow-xl mt-5 mb-6 p-3 text-lg text-white md:p-5">
        <p>{aboutText}</p>
      </div>
    </>
  );
};
