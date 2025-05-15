import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { useWindowSize } from 'utilities/useWindowSize';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div
      className={`
        ${className}
        card
        shadow-md
        p-3
      `}
    >
      {children}
    </div>
  );
};

type LinkCardProps = CardProps & {
  href: string;
};

export const LinkCard = ({ children, href, className = '' }: LinkCardProps) => {
  return (
    <Link 
      href={href} 
      className="block"
    >
      <Card className={`${className} rounded-lg`}>{children}</Card>
    </Link>
  );
};

type ImageLinkCardProps = LinkCardProps & {
  image: string;
  summary: string;
  description: string;
};

export const ImageLinkCard = ({ children, href, className = '', image, summary, description }: ImageLinkCardProps) => {
  const { width } = useWindowSize();
  const imageSize = {
    width: width > 460 ? 396 : 324,
    height: width > 460 ? 368 : 296
  }
  return (
    <div className={`group w-72 xs:w-96 [perspective:1000px]`} style={{height: imageSize.height}}>
      <div className="relative h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <Image 
            src={image} 
            alt={summary} 
            width={imageSize.width} 
            height={imageSize.height} 
            className="h-full w-full rounded-lg"
          />
          <Card className={`${className} rounded-b-lg absolute bottom-0 w-full`}>
            {children}
          </Card>
        </div>
        
        {/* Back */}
        <div className="absolute inset-0 rounded-lg bg-blue-600 p-6 text-white [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="flex h-full flex-col items-center justify-center">
            <p className="text-base text-left">{description}</p>
            <Link 
              href={href}
              className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
