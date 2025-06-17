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
      const aspectRatio = width / height;
      const isPortrait = aspectRatio < 1;
      const isLandscape = aspectRatio > 1;
      const isSquare = Math.abs(aspectRatio - 1) < 0.1;
      
      return (
        <div className="my-4 flex flex-col items-center">
          <div className="relative w-full max-w-full overflow-hidden rounded-lg">
            <Image
              src={`https://${image.file.url}`}
              alt={image.description}
              width={width}
              height={height}
              loader={contentfulLoader}
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 640px"
              className={`
                w-full h-auto object-cover object-top
                ${isPortrait ? 'max-h-[400px] sm:max-h-[500px]' : ''}
                ${isLandscape ? 'max-h-[300px] sm:max-h-[400px]' : ''}
                ${isSquare ? 'max-h-[350px] sm:max-h-[450px]' : ''}
              `}
              style={{
                aspectRatio: `${width} / ${height}`,
                maxWidth: '100%'
              }}
            />
          </div>
        </div>
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
