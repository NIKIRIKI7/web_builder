// Headers
import { simpleHeaderPreview } from './Headers/SimpleHeader';
import { simpleFooterPreview } from './Footers/SimpleFooter';

// Хедеры
import { headerCenteredPreview } from './Headers/HeaderCentered';
import { headerWithSearchPreview } from './Headers/HeaderWithSearch';
import { headerTransparentPreview } from './Headers/HeaderTransparent';
import { headerMegaMenuPreview } from './Headers/HeaderMegaMenu';

// Футеры
import { footerWithSocialsPreview } from './Footers/FooterWithSocials';
import { footerDetailedPreview } from './Footers/FooterDetailed';
import { footerWithNewsletterPreview } from './Footers/FooterWithNewsletter';
import { footerMinimalistPreview } from './Footers/FooterMinimalist';

// Контент
import { imageTextSplitPreview } from './Content/ImageTextSplit';
import { imageTextSplitReversedPreview } from './Content/ImageTextSplitReversed';
import { textThenImagePreview } from './Content/TextThenImage';
import { imageWithTextOverlayPreview } from './Content/ImageWithTextOverlay';
import { textWithSideImagePreview } from './Content/TextWithSideImage';

// Карусели
import { simpleCarouselPreview } from './Carousels/SimpleCarousel';
import { thumbnailsCarouselPreview } from './Carousels/ThumbnailsCarousel';
import { fullwidthCarouselPreview } from './Carousels/FullwidthCarousel';
import { testimonialsCarouselPreview } from './Carousels/TestimonialsCarousel';
import { cardCarouselPreview } from './Carousels/CardCarousel';

// Heros
import { ecommerceHeroPreview } from './Heros/EcommerceHero';
import { centeredHeroPreview } from './Heros/CenteredHero';
import { videoBackgroundHeroPreview } from './Heros/VideoBackgroundHero';
import { heroWithFormPreview } from './Heros/HeroWithForm';
import { appShowcaseHeroPreview } from './Heros/AppShowcaseHero';

export const allPreviews = [
  simpleHeaderPreview,
  headerCenteredPreview,
  headerWithSearchPreview,
  headerTransparentPreview,
  headerMegaMenuPreview,
  imageTextSplitPreview,
  imageTextSplitReversedPreview,
  textThenImagePreview,
  imageWithTextOverlayPreview,
  textWithSideImagePreview,
  simpleCarouselPreview,
  thumbnailsCarouselPreview,
  fullwidthCarouselPreview,
  testimonialsCarouselPreview,
  cardCarouselPreview,
  ecommerceHeroPreview,
  centeredHeroPreview,
  videoBackgroundHeroPreview,
  heroWithFormPreview,
  appShowcaseHeroPreview,
  simpleFooterPreview,
  footerWithSocialsPreview,
  footerDetailedPreview,
  footerWithNewsletterPreview,
  footerMinimalistPreview,
];

export const configLoaders = {
  [simpleHeaderPreview.id]: () => import('./Headers/SimpleHeader'),
  [headerCenteredPreview.id]: () => import('./Headers/HeaderCentered'),
  [headerWithSearchPreview.id]: () => import('./Headers/HeaderWithSearch'),
  [headerTransparentPreview.id]: () => import('./Headers/HeaderTransparent'),
  [headerMegaMenuPreview.id]: () => import('./Headers/HeaderMegaMenu'),

  [imageTextSplitPreview.id]: () => import('./Content/ImageTextSplit'),
  [imageTextSplitReversedPreview.id]: () => import('./Content/ImageTextSplitReversed'),
  [textThenImagePreview.id]: () => import('./Content/TextThenImage'),
  [imageWithTextOverlayPreview.id]: () => import('./Content/ImageWithTextOverlay'),
  [textWithSideImagePreview.id]: () => import('./Content/TextWithSideImage'),

  [simpleCarouselPreview.id]: () => import('./Carousels/SimpleCarousel'),
  [thumbnailsCarouselPreview.id]: () => import('./Carousels/ThumbnailsCarousel'),
  [fullwidthCarouselPreview.id]: () => import('./Carousels/FullwidthCarousel'),
  [testimonialsCarouselPreview.id]: () => import('./Carousels/TestimonialsCarousel'),
  [cardCarouselPreview.id]: () => import('./Carousels/CardCarousel'),

  [ecommerceHeroPreview.id]: () => import('./Heros/EcommerceHero'),
  [centeredHeroPreview.id]: () => import('./Heros/CenteredHero'),
  [videoBackgroundHeroPreview.id]: () => import('./Heros/VideoBackgroundHero'),
  [heroWithFormPreview.id]: () => import('./Heros/HeroWithForm'),
  [appShowcaseHeroPreview.id]: () => import('./Heros/AppShowcaseHero'),

  [simpleFooterPreview.id]: () => import('./Footers/SimpleFooter'),
  [footerWithSocialsPreview.id]: () => import('./Footers/FooterWithSocials'),
  [footerDetailedPreview.id]: () => import('./Footers/FooterDetailed'),
  [footerWithNewsletterPreview.id]: () => import('./Footers/FooterWithNewsletter'),
  [footerMinimalistPreview.id]: () => import('./Footers/FooterMinimalist'),
}