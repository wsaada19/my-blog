import Layout from '../../../components/Layout';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import React from 'react';
import { ContentfulRichTextRenderer } from '../../../components/ContentfulRichTextRenderer';
import Image from 'next/image';
import { Post, ContentfulImage } from '@types';
import { contenfulLoader } from '@utilities';
import { ContentfulEntryType, getAssetById, getEntriesOfType } from '@services/contentful';

type ProjectPage = {
  post: Post;
  image: ContentfulImage;
};

export default function Project({ post, image }: ProjectPage) {
  const { title, shortSummary, summaryImage, summary } = post;
  return (
    <Layout description={shortSummary}>
      <Head>
        <title>{title}</title>
      </Head>
      <article className="px-2 md:px-8">
        <h1 className="text-4xl font-medium mb-6 text-center md:px-8 md:text-4xl">{title}</h1>
        <h2 className="text-lg font-normal">{shortSummary}</h2>
        {summaryImage && (
          <Image
            src={`https://${image.file.url}`}
            alt={image.description}
            width={400}
            height={200}
            layout="responsive"
            loader={contenfulLoader}
          />
        )}
        <div className="my-4">
          <ContentfulRichTextRenderer richText={summary} />
        </div>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const projectContentfulData = await getEntriesOfType(ContentfulEntryType.POST);
  const paths = projectContentfulData.items.map((item) => {
    return {
      params: {
        id: item.fields.slug,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const projectContentfulData = await getEntriesOfType(ContentfulEntryType.POST);
  const project = projectContentfulData.items.find((item) => {
    return item.fields.slug == params.id;
  });
  let image: { fields: ContentfulImage };
  if (project.fields.summaryImage) {
    image = await getAssetById(project.fields.summaryImage.sys.id);
  }
  return {
    props: {
      post: project.fields,
      image: image ? image.fields : {},
    },
  };
};
