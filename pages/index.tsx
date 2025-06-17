import { ContentfulContentType, getEntriesOfType, getAssetById } from '@services/contentful';
import { HomePage, Post } from '@types';
import { About } from '@components/About';
import { LinkCard } from '@components/Card';
import { Date as DateComponent } from '@components/Date';
import { GetStaticProps } from 'next';
import Layout from '@components/layouts/PageLayout';
import React from 'react';
import { sortBy } from '@utilities';
import Link from 'next/link';
import { ImageLinkCard } from '@components/Card';

type HomeProps = {
  allPostsData: Post[];
  homePageData: HomePage;
  projects: (Post & { imageUrl?: string })[];
};

export default function Home({ allPostsData, homePageData, projects }: HomeProps) {
  const { name, about, pageDescription, pageTitle } = homePageData;
  return (
    <Layout description={pageDescription} title={`${name} | ${pageTitle}`}>
      <About name={name} aboutText={about} />
      <section>
        <h2 className="mt-2 mb-4">Projects</h2>
        <ul className="flex justify-around flex-wrap gap-x-8 gap-y-9">
          {projects.map(({ title, slug, imageUrl, shortSummary }) => (
            <li className="text-center rounded-lg mb-2" key={slug}>
              <ImageLinkCard
                className='text-white bg-blue-600'
                href={`/portfolio/${slug}`}
                image={imageUrl}
                summary={shortSummary}
                description={shortSummary}
              >
                <p className="font-semibold">{title}</p>
              </ImageLinkCard>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="mb-3">Blog</h2>
        <ul>
          {allPostsData.map(({ title, publishDate, slug, category }) => (
            <li key={slug}>
              <LinkCard className="mb-4 bg-blue-600 text-white" href={`/${category}/${slug}`}>
                <div className="font-semibold -mb-1">{title}</div>
                <DateComponent dateString={publishDate} />
              </LinkCard>
            </li>
          ))}
        </ul>
        <Link href="/blog">View all blog posts</Link>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getEntriesOfType<Post>(ContentfulContentType.Post);
  const homePage = await getEntriesOfType<HomePage>(ContentfulContentType.HomePage);
  
  // Filter portfolio posts and prepare them with images
  const portfolioPosts = posts.items.filter(post => post.category === 'portfolio');
  const projectsWithImages = await Promise.all(
    portfolioPosts.map(async (post) => {
      let imageUrl = null;
      if (post.summaryImage) {
        const image = await getAssetById(post.summaryImage.sys.id);
        if (image && image.fields && image.fields.file) {
          imageUrl = `https://${image.fields.file.url}`;
        }
      }
      return {
        ...post,
        imageUrl
      };
    })
  );
  const projects = sortBy((p) => new Date(p.publishDate), projectsWithImages).splice(0, 4);
  return {
    props: {
      allPostsData: sortBy<Post>(
        (p) => p.publishDate,
        posts.items.filter((post) => post.category === 'blog')
      ).splice(0, 3),
      homePageData: homePage.items[0],
      projects,
    },
  };
};
