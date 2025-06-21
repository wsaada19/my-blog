# YouTube Video Integration Feature

This document demonstrates the new YouTube video integration feature added to the ContentfulRichTextRenderer.

## What was implemented

1. **YouTubeVideo Component** (`components/YouTubeVideo.tsx`)
   - Automatically detects and extracts video IDs from various YouTube URL formats
   - Renders responsive video embeds using YouTube's iframe embed API
   - Falls back to regular links for invalid YouTube URLs

2. **Enhanced ContentfulRichTextRenderer** (`components/ContentfulRichTextRenderer.tsx`)
   - Modified the `INLINES.HYPERLINK` rule to detect YouTube URLs
   - Automatically converts YouTube links to video embeds
   - Maintains existing functionality for non-YouTube links

## Supported YouTube URL formats

The component supports all common YouTube URL formats:

- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`
- `https://www.youtube.com/watch?v=VIDEO_ID&t=30s` (with timestamp)

## How it works

1. When the ContentfulRichTextRenderer encounters a hyperlink in the rich text content
2. It checks if the URL matches any YouTube URL pattern
3. If it's a YouTube URL:
   - Extracts the video ID
   - Renders a responsive video embed using the YouTubeVideo component
4. If it's not a YouTube URL:
   - Renders a regular anchor tag with proper styling

## Features

- **Responsive Design**: Videos automatically adjust to container width with 16:9 aspect ratio
- **Accessibility**: Proper iframe attributes for screen readers
- **Security**: Uses `rel="noopener noreferrer"` for external links
- **Fallback**: Invalid YouTube URLs fall back to regular links
- **Performance**: Lazy loading and optimized iframe attributes

## Testing

Comprehensive tests were added to verify:
- Video ID extraction from various URL formats
- Proper iframe rendering for valid YouTube URLs
- Fallback to regular links for invalid URLs
- Correct title handling

## Usage in Contentful

Content creators can now simply add YouTube links in their rich text content, and they will automatically be converted to embedded videos when the blog post is rendered.

Example:
- In Contentful: Add a hyperlink with URL `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- On the blog: The link will render as an embedded YouTube video player

This enhancement makes it much easier to include video content in blog posts without requiring special Contentful entry types or manual embed code.