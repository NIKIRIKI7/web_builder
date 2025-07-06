import type { Project } from '@/entities/Project/model/types';

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  canvasState: Project['canvasState'];
}

export const projectTemplates: ProjectTemplate[] = [
  {
    id: 'template_landing',
    name: 'Landing Page',
    description: 'A simple one-page layout to showcase your product.',
    thumbnail: '#3498db',
    canvasState: {
      componentInstances: [
        {
          instanceId: 1,
          componentId: 'simple-header-v1',
          props: { logoText: 'Landing.', ctaText: 'Sign Up', links: [{ id: 1, text: 'Features', url: '#' }, { id: 2, text: 'Pricing', url: '#' }] },
          styles: { paddingTop: '16px', paddingBottom: '16px', paddingLeft: '32px', paddingRight: '32px', backgroundColor: '#ffffff', borderBottom: '1px solid #e0e0e0', color: '#34495e' },
          scripts: []
        },
        {
          instanceId: 2,
          componentId: 'centered-hero-v1',
          props: { title: 'Your Awesome Product', subtitle: 'A brief and compelling description of what makes your product great and why people should be excited about it.', ctaPrimaryText: 'Get Started', ctaPrimaryUrl: '#', ctaSecondaryText: 'Learn More', ctaSecondaryUrl: '#' },
          styles: { backgroundColor: '#ffffff', paddingTop: '100px', paddingBottom: '100px' },
          scripts: []
        },
        {
          instanceId: 3,
          componentId: 'simple-footer-v1',
          props: { copyrightText: '© 2025 Landing Inc.', links: [{ id: 1, text: 'Privacy', url: '#' }, { id: 2, text: 'Terms', url: '#' }] },
          styles: { backgroundColor: '#2c3e50', paddingTop: '32px', paddingBottom: '32px', color: '#ecf0f1' },
          scripts: []
        },
      ],
      selectedComponentInstanceId: null,
      isEditorOpen: false,
    },
  },
  {
    id: 'template_portfolio',
    name: 'Portfolio',
    description: 'A clean layout to display your creative work.',
    thumbnail: '#2ecc71',
    canvasState: {
      componentInstances: [
        {
          instanceId: 1620000001,
          componentId: 'simple-header-v1',
          props: { logoText: 'My Work', ctaText: 'Contact Me', links: [{ id: 1, text: 'About', url: '#about' }, { id: 2, text: 'Contact', url: '#contact' }] },
          styles: { paddingTop: '16px', paddingBottom: '16px', paddingLeft: '32px', paddingRight: '32px', backgroundColor: '#ffffff', borderBottom: '1px solid #e0e0e0', color: '#34495e' },
          scripts: []
        },
        {
          instanceId: 1620000002,
          componentId: 'centered-hero-v1',
          props: { title: 'Creative Designer & Developer', subtitle: 'I design and code beautifully simple things, and I love what I do. Based in New York.', ctaPrimaryText: 'See My Work', ctaPrimaryUrl: '#work', ctaSecondaryText: 'About Me', ctaSecondaryUrl: '#about' },
          styles: { backgroundColor: '#ffffff', paddingTop: '100px', paddingBottom: '100px' },
          scripts: []
        },
        {
          instanceId: 1620000003,
          componentId: 'product-grid-with-filters-v1',
          props: {
            title: 'My Portfolio',
            filters: [
              { key: 'all', label: 'All' },
              { key: 'web', label: 'Web Design' },
              { key: 'branding', label: 'Branding' },
              { key: 'illustration', label: 'Illustration' },
            ],
            products: [
              { id: 1, imageUrl: 'https://source.unsplash.com/random/400x400?website,design', name: 'Corporate Website', price: 0, category: 'web' },
              { id: 2, imageUrl: 'https://source.unsplash.com/random/400x400?logo,branding', name: 'Startup Logo', price: 0, category: 'branding' },
              { id: 3, imageUrl: 'https://source.unsplash.com/random/400x400?art,illustration', name: 'Digital Painting', price: 0, category: 'illustration' },
              { id: 4, imageUrl: 'https://source.unsplash.com/random/400x400?app,interface', name: 'Mobile App UI', price: 0, category: 'web' },
              { id: 5, imageUrl: 'https://source.unsplash.com/random/400x400?icon,set', name: 'Iconography Set', price: 0, category: 'branding' },
              { id: 6, imageUrl: 'https://source.unsplash.com/random/400x400?character,design', name: 'Character Design', price: 0, category: 'illustration' },
            ],
          },
          styles: { backgroundColor: '#f8f9fa', paddingTop: '80px', paddingBottom: '80px' },
          scripts: []
        },
        {
          instanceId: 1620000004,
          componentId: 'footer-with-socials-v1',
          props: { copyrightText: `© ${new Date().getFullYear()} My Work`, socialLinks: [ { id: 1, name: 'Dribbble', url: '#' }, { id: 2, name: 'GitHub', url: '#' }, { id: 3, name: 'LinkedIn', url: '#' }] },
          styles: { backgroundColor: '#2c3e50', paddingTop: '40px', paddingBottom: '40px', color: '#ecf0f1' },
          scripts: []
        }
      ],
      selectedComponentInstanceId: null,
      isEditorOpen: false,
    },
  },
];