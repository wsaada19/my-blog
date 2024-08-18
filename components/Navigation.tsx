import Link from 'next/link';
import React from 'react';
import { Switch } from './switch';

type NavigationProps = {
  hideLinks: boolean;
};

export const Navigation = ({ hideLinks = false }: NavigationProps) => {
  return (
    <nav className="mt-2 mb-4 text-base h-6">
      {!hideLinks && (
        <>
          <Link href="/" className="mr-1 md:mr-2">
            Home
          </Link>
          <Link href="/blog" className="mx-1 md:mx-3">
            Blog
          </Link>
          <Link href="/portfolio" className="mx-1 md:mx-3">
            Portfolio
          </Link>
          <Link href="/resume" className="ml-1 md:mx-4">
          <Link href="/resume" className="ml-1 md:mx-3">
            Resume
          </Link>
        </>
      )}
      <span className="sm:block float-right sticky top-5 z-50">
        <Switch className="px-2" />
      </span>
    </nav>
  );
};
