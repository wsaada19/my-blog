import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import Link from 'next/link';
import { Date } from '../components/Date';
import { GetStaticProps } from 'next';
import { About } from '../components/About';
import React from 'react';
import { HomePage, ProjectInfo, Post } from '@types';
import { ContentfulEntryType, getEntriesOfType } from '@services/contentful';

type HomeProps = {
  allPostsData: Post[];
  homePageData: HomePage;
  projects: ProjectInfo[];
};

export default function Home({ allPostsData, homePageData, projects }: HomeProps) {
  const { name, about } = homePageData;
  return (
    <Layout description={`${name}'s blog and personal website'`} home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h1 className="text-4xl mb-2 font-semibold text-center md:text-left">{name}</h1>
      <About aboutText={about} />
      <section>
        <h2 className="text-2xl font-semibold mb-3">Blog</h2>
        <ul>
          {allPostsData.map(({ title, publishDate, slug }) => (
            <li className="mb-4 shadow-md p-3 rounded-lg border border-gray-300" key={slug}>
              <Link href={`/posts/${slug}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small>
                <Date dateString={publishDate} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-3">Projects</h2>
        <ul className="flex justify-between flex-wrap">
          {projects.map(({ projectTitle, slug }) => (
            <li className="mb-4 shadow-md p-4 rounded-lg bg-blue-600" key={slug}>
              <a className="text-white" href={`/portfolio/${slug}`}>
                {projectTitle}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const postContentfulData = await getEntriesOfType(ContentfulEntryType.POST);
  const posts = postContentfulData.items.map((item) => item.fields);

  const projectContentfulData = await getEntriesOfType(ContentfulEntryType.PROJECT);
  const projects = projectContentfulData.items.map((item) => item.fields);

  const homePage = await getEntriesOfType(ContentfulEntryType.HOME_PAGE);

  return {
    props: {
      allPostsData: posts,
      homePageData: homePage.items[0].fields,
      projects,
    },
  };
};
