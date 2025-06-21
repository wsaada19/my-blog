import { render, screen } from '@testing-library/react';
import { YouTubeVideo } from '../components/YouTubeVideo';

describe('YouTubeVideo', () => {
  it('should render iframe for valid YouTube URL', () => {
    const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    render(<YouTubeVideo url={url} title="Test Video" />);
    
    const iframe = screen.getByTitle('Test Video');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/dQw4w9WgXcQ');
  });

  it('should render iframe for youtu.be URL', () => {
    const url = 'https://youtu.be/dQw4w9WgXcQ';
    render(<YouTubeVideo url={url} />);
    
    const iframe = screen.getByTitle('YouTube video');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/dQw4w9WgXcQ');
  });

  it('should render regular link for invalid YouTube URL', () => {
    const url = 'https://example.com/not-youtube';
    render(<YouTubeVideo url={url} />);
    
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', url);
    expect(link).toHaveTextContent(url);
  });

  it('should extract video ID from various YouTube URL formats', () => {
    const testCases = [
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'https://youtube.com/watch?v=dQw4w9WgXcQ',
      'https://youtu.be/dQw4w9WgXcQ',
      'https://www.youtube.com/embed/dQw4w9WgXcQ',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30s',
    ];

    testCases.forEach((url) => {
      render(<YouTubeVideo url={url} title={`Test ${url}`} />);
      const iframe = screen.getByTitle(`Test ${url}`);
      expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/dQw4w9WgXcQ');
    });
  });
});