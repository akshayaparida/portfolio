import { render, screen } from '@testing-library/react';
import Header from '../Header';

// Mock the @lobehub/icons to properly handle HuggingFace import
jest.mock('@lobehub/icons', () => ({
  LobeHubIcon: () => <div>LobeHubIcon</div>,
  HuggingFace: {
    Color: () => <div>HuggingFaceIcon</div>
  }
}));

describe('Header Component', () => {
  it('should render the header element', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('should have home link on the left side', () => {
    render(<Header />);
    const homeLink = screen.getByRole('link', { name: /akshaya parida/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('should have navigation with social links on the right side', () => {
    const { container } = render(<Header />);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    
    const githubLink = container.querySelector('a[href="https://github.com/akshayaparida"]');
    const linkedinLink = container.querySelector('a[href*="linkedin.com"]');
    const twitterLink = container.querySelector('a[href*="x.com"]');
    
    expect(githubLink).toBeInTheDocument();
    expect(linkedinLink).toBeInTheDocument();
    expect(twitterLink).toBeInTheDocument();
  });

  it('should have proper structure with home link and nav element as direct children', () => {
    const { container } = render(<Header />);
    const header = container.querySelector('header');

    expect(header?.children.length).toBe(2);

    const firstChild = header?.children[0];
    const secondChild = header?.children[1];

    expect(firstChild?.tagName).toBe('A');
    expect(secondChild?.tagName).toBe('DIV'); // The .header-right div
    // The nav element is inside the second div
    const navElement = secondChild?.querySelector('nav');
    expect(navElement).toBeInTheDocument();
  });

  it('should have all social links opening in new tab', () => {
    const { container } = render(<Header />);
    
    const githubLink = container.querySelector('a[href="https://github.com/akshayaparida"]');
    const linkedinLink = container.querySelector('a[href*="linkedin.com"]');
    const twitterLink = container.querySelector('a[href*="x.com"]');
    
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(twitterLink).toHaveAttribute('target', '_blank');
    
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(twitterLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should have multiple social links in nav', () => {
    const { container } = render(<Header />);
    const nav = container.querySelector('nav');
    const socialLinks = nav?.querySelectorAll('a[target="_blank"]');
    
    expect(socialLinks?.length).toBeGreaterThanOrEqual(3);
  });
});
