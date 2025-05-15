import { ContentfulImage } from '@types';
import Image from 'next/image';
import React from 'react';
import { contentfulLoader } from '@utilities';

type HeroBannerProps = {
  title: string;
  image?: ContentfulImage;
  summary: string;
};

export const HeroBanner = ({ title, image }: HeroBannerProps) => {
  
  const getImage = (): JSX.Element => {
    if (image.file) {
      const { width, height } = image.file.details.image;
      return (
        <>
          <div className="my-4 flex flex-col items-center">
              <Image
                src={`https://${image.file.url}`}
                alt={image.description}
                width={width}
                height={height}
                loader={contentfulLoader}
                priority
                sizes="100vw"
                style={{width: `${width}px`, maxHeight: `520px`, maxWidth: `640px`}} 
              />
          </div>
        </>
      );
    }
  };
  return (
    <>
      <h1 className="text-center tracking-tight">{title}</h1>
      {getImage()}
    </>
  );
};
