/* eslint-disable @typescript-eslint/no-explicit-any */
import { BLOCKS, Document, INLINES, MARKS } from '@contentful/rich-text-types';
import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { atomOneDark, CopyBlock } from 'react-code-blocks';
import { ContentfulContentType } from '@services/contentful';
import { D3GraphContainer } from 'graphs/D3GraphContainer';
import Image from 'next/image';
import { contentfulLoader } from '@utilities';
import { YouTubeVideo } from './YouTubeVideo';

const options = (linkedEntries, linkedAssets): any => ({
  renderMark: {
    [MARKS.BOLD]: (text) => <span className="font-medium">{text}</span>,
    [MARKS.CODE]: (text) => (
      <code className="break-words text-yellow-700 font-semibold">{text}</code>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <p className="text-lg py-2 md:leading-7">{children}</p>,
    [BLOCKS.HEADING_3]: (node, children) => {
      return <h3 className="mt-4 text-blue-800">{children}</h3>;
    },
    [BLOCKS.HEADING_4]: (node, children) => {
      return <h4 className="my-1 text-blue-800">{children}</h4>;
    },
    [BLOCKS.HEADING_5]: (node, children) => {
      return <h5 className="my-1 text-blue-800">{children}</h5>;
    },
    [BLOCKS.UL_LIST]: (node, children) => {
      return <ul className="my-2 list-disc list-inside">{children}</ul>;
    },
    [BLOCKS.LIST_ITEM]: (node, children) => {
      return <li className="text-lg py-1">{children[0].props.children[0]}</li>;
    },
    [INLINES.HYPERLINK]: (node, children) => {
      const url = node.data.uri;
      
      // Check if the URL is a YouTube link
      const isYouTubeUrl = (url: string): boolean => {
        const youtubePatterns = [
          /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)/,
          /^https?:\/\/(www\.)?youtube\.com\/watch\?.*v=/,
          /^https?:\/\/youtu\.be\//,
        ];
        return youtubePatterns.some(pattern => pattern.test(url));
      };

      if (isYouTubeUrl(url)) {
        // Extract title from children if available, otherwise use the URL
        const title = children && children.length > 0 ? children[0] : url;
        return <YouTubeVideo url={url} title={typeof title === 'string' ? title : 'YouTube video'} />;
      }

      // For non-YouTube links, render as regular anchor
      return (
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {children}
        </a>
      );
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const asset = linkedAssets.find((asset) => asset.sys.id === node.data.target.sys.id);
      const { description, file } = asset.fields;
      const mimeType = file.contentType;
      const mimeGroup = mimeType.split('/')[0];
      const { width, height } = file.details.image;
      if (mimeGroup === 'image') {
        return (
          <>
            <Image
              alt={description}
              src={file.url}
              width={width}
              height={height}
              loader={contentfulLoader}
              priority
              sizes="100vw"
              style={{
                width: '100%',
                height: 'auto',
                marginTop: '1rem',
              }}
            />
            <p className="text-sm font-normal my-1 text-black font-sans dark:text-white">
              {description}
            </p>
          </>
        );
      }
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      const { id } = node.data.target.sys;
      const entry = linkedEntries.find((entry) => entry.sys.id === id);
      if (entry) {
        if (entry.sys.contentType.sys.id === ContentfulContentType.CodeSnippet) {
          return (
            <div className="my-3 text-sm leading-7">
              <CopyBlock
                text={entry.fields.codeBlock}
                language={entry.fields.language}
                showLineNumbers={false}
                theme={atomOneDark}
                codeBlock={true}
              />
            </div>
          );
        } else if (entry.sys.contentType.sys.id === ContentfulContentType.D3Graph) {
          return <D3GraphContainer graphId={entry.fields.graphId} data={entry.fields.graphData} />;
        }
      }
    },
  },
});

type ContentfulRichTextRendererProps = {
  richText: Document;
  includedEntries?: any[];
  assets: any[];
};

export const ContentfulRichTextRenderer = ({
  richText,
  includedEntries = [],
  assets = [],
}: ContentfulRichTextRendererProps) => {
  return (
    <div className="my-2">
      {documentToReactComponents(richText, options(includedEntries, assets))}
    </div>
  );
};
