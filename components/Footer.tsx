import Link from 'next/link';
import Image from 'next/image';

export const Footer = (): JSX.Element => {
  return (
    <footer className="mt-4 text-base">
      <hr className="border-gray-300 mb-2" />
      <a className="text-sm" href="https://github.com/wsaada19/my-blog">
        Source code
      </a>
      <span className="flex float-right">
        <Link passHref className="px-2" href="https://github.com/wsaada19">
          <Image
            src="/images/github.svg"
            height={24}
            width={24}
            alt="Github logo"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          ></Image>
        </Link>
        <Link passHref className="px-2" href="https://www.linkedin.com/in/william-saada/">
          <Image
            src="/images/linkedin.svg"
            height={24}
            width={24}
            alt="Linkedin logo"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          ></Image>
        </Link>
      </span>
    </footer>
  );
};
