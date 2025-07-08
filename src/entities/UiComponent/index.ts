/* eslint-disable @typescript-eslint/consistent-type-imports */

import { cardCarouselPreview } from './Carousels/CardCarousel';
import { fullwidthCarouselPreview } from './Carousels/FullwidthCarousel';
import { simpleCarouselPreview } from './Carousels/SimpleCarousel';
import { testimonialsCarouselPreview } from './Carousels/TestimonialsCarousel';
import { thumbnailsCarouselPreview } from './Carousels/ThumbnailsCarousel';
import { imageTextSplitPreview } from './Content/ImageTextSplit';
import { imageTextSplitReversedPreview } from './Content/ImageTextSplitReversed';
import { imageWithTextOverlayPreview } from './Content/ImageWithTextOverlay';
import { textThenImagePreview } from './Content/TextThenImage';
import { textWithSideImagePreview } from './Content/TextWithSideImage';
import { footerDetailedPreview } from './Footers/FooterDetailed';
import { footerMinimalistPreview } from './Footers/FooterMinimalist';
import { footerWithNewsletterPreview } from './Footers/FooterWithNewsletter';
import { footerWithSocialsPreview } from './Footers/FooterWithSocials';
import { simpleFooterPreview } from './Footers/SimpleFooter';
import { headerCenteredPreview } from './Headers/HeaderCentered';
import { headerMegaMenuPreview } from './Headers/HeaderMegaMenu';
import { headerTransparentPreview } from './Headers/HeaderTransparent';
import { headerWithSearchPreview } from './Headers/HeaderWithSearch';
import { headerWithSecondaryNavPreview } from './Headers/HeaderWithSecondaryNav';
import { headerWithSocialsPreview } from './Headers/HeaderWithSocials';
import { headerWithTopBarPreview } from './Headers/HeaderWithTopBar';
import { minimalistHeaderPreview } from './Headers/MinimalistHeader';
import { simpleHeaderPreview } from './Headers/SimpleHeader';
import { splitHeaderPreview } from './Headers/SplitHeader';
import { appShowcaseHeroPreview } from './Heros/AppShowcaseHero';
import { centeredHeroPreview } from './Heros/CenteredHero';
import { ecommerceHeroPreview } from './Heros/EcommerceHero';
import { heroWithFormPreview } from './Heros/HeroWithForm';
import { videoBackgroundHeroPreview } from './Heros/VideoBackgroundHero';
import { bestsellersCarouselPreview } from './Products/BestsellersCarousel';
import { categoryShowcasePreview } from './Products/CategoryShowcase';
import { featuredProductsGridPreview } from './Products/FeaturedProductsGrid';
import { horizontalProductCardPreview } from './Products/HorizontalProductCard';
import { productCardWithActionsPreview } from './Products/ProductCardWithActions';
import { productComparisonTablePreview } from './Products/ProductComparisonTable';
import { productGridWithFiltersPreview } from './Products/ProductGridWithFilters';
import { productListViewPreview } from './Products/ProductListView';
import { salesGridPreview } from './Products/SalesGrid';
import { singleFeaturedProductPreview } from './Products/SingleFeaturedProduct';

type AppShowcaseHeroModule = typeof import('./Heros/AppShowcaseHero');
type CardCarouselModule = typeof import('./Carousels/CardCarousel');
type CenteredHeroModule = typeof import('./Heros/CenteredHero');
type EcommerceHeroModule = typeof import('./Heros/EcommerceHero');
type FeaturedProductsGridModule = typeof import('./Products/FeaturedProductsGrid');
type FooterDetailedModule = typeof import('./Footers/FooterDetailed');
type FooterMinimalistModule = typeof import('./Footers/FooterMinimalist');
type FooterWithNewsletterModule = typeof import('./Footers/FooterWithNewsletter');
type FooterWithSocialsModule = typeof import('./Footers/FooterWithSocials');
type FullwidthCarouselModule = typeof import('./Carousels/FullwidthCarousel');
type HeaderCenteredModule = typeof import('./Headers/HeaderCentered');
type HeaderMegaMenuModule = typeof import('./Headers/HeaderMegaMenu');
type HeaderTransparentModule = typeof import('./Headers/HeaderTransparent');
type HeaderWithSearchModule = typeof import('./Headers/HeaderWithSearch');
type HeaderWithTopBarModule = typeof import('./Headers/HeaderWithTopBar');
type HeaderWithSocialsModule = typeof import('./Headers/HeaderWithSocials');
type HeaderWithSecondaryNavModule = typeof import('./Headers/HeaderWithSecondaryNav');
type SplitHeaderModule = typeof import('./Headers/SplitHeader');
type MinimalistHeaderModule = typeof import('./Headers/MinimalistHeader');
type HeroWithFormModule = typeof import('./Heros/HeroWithForm');
type HorizontalProductCardModule = typeof import('./Products/HorizontalProductCard');
type ImageTextSplitModule = typeof import('./Content/ImageTextSplit');
type ImageTextSplitReversedModule = typeof import('./Content/ImageTextSplitReversed');
type ImageWithTextOverlayModule = typeof import('./Content/ImageWithTextOverlay');
type ProductCardWithActionsModule = typeof import('./Products/ProductCardWithActions');
type ProductGridWithFiltersModule = typeof import('./Products/ProductGridWithFilters');
type SalesGridModule = typeof import('./Products/SalesGrid');
type SimpleCarouselModule = typeof import('./Carousels/SimpleCarousel');
type SimpleFooterModule = typeof import('./Footers/SimpleFooter');
type SimpleHeaderModule = typeof import('./Headers/SimpleHeader');
type TestimonialsCarouselModule = typeof import('./Carousels/TestimonialsCarousel');
type TextThenImageModule = typeof import('./Content/TextThenImage');
type TextWithSideImageModule = typeof import('./Content/TextWithSideImage');
type ThumbnailsCarouselModule = typeof import('./Carousels/ThumbnailsCarousel');
type VideoBackgroundHeroModule = typeof import('./Heros/VideoBackgroundHero');
type ProductComparisonTableModule =
    typeof import('./Products/ProductComparisonTable');
type SingleFeaturedProductModule =
    typeof import('./Products/SingleFeaturedProduct');
type ProductListViewModule = typeof import('./Products/ProductListView');
type CategoryShowcaseModule = typeof import('./Products/CategoryShowcase');
type BestsellersCarouselModule = typeof import('./Products/BestsellersCarousel');

export const allPreviews = [
    simpleHeaderPreview,
    headerCenteredPreview,
    headerWithSearchPreview,
    headerTransparentPreview,
    headerMegaMenuPreview,
    headerWithTopBarPreview,
    splitHeaderPreview,
    headerWithSocialsPreview,
    minimalistHeaderPreview,
    headerWithSecondaryNavPreview,
    ecommerceHeroPreview,
    centeredHeroPreview,
    videoBackgroundHeroPreview,
    heroWithFormPreview,
    appShowcaseHeroPreview,
    featuredProductsGridPreview,
    horizontalProductCardPreview,
    productCardWithActionsPreview,
    productGridWithFiltersPreview,
    salesGridPreview,
    productComparisonTablePreview,
    singleFeaturedProductPreview,
    productListViewPreview,
    categoryShowcasePreview,
    bestsellersCarouselPreview,
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
    simpleFooterPreview,
    footerWithSocialsPreview,
    footerDetailedPreview,
    footerWithNewsletterPreview,
    footerMinimalistPreview,
];

export const configLoaders = {
    [simpleHeaderPreview.id]: (): Promise<SimpleHeaderModule> =>
        import('./Headers/SimpleHeader'),
    [headerCenteredPreview.id]: (): Promise<HeaderCenteredModule> =>
        import('./Headers/HeaderCentered'),
    [headerWithSearchPreview.id]: (): Promise<HeaderWithSearchModule> =>
        import('./Headers/HeaderWithSearch'),
    [headerTransparentPreview.id]: (): Promise<HeaderTransparentModule> =>
        import('./Headers/HeaderTransparent'),
    [headerMegaMenuPreview.id]: (): Promise<HeaderMegaMenuModule> =>
        import('./Headers/HeaderMegaMenu'),
    [headerWithTopBarPreview.id]: (): Promise<HeaderWithTopBarModule> =>
        import('./Headers/HeaderWithTopBar'),
    [splitHeaderPreview.id]: (): Promise<SplitHeaderModule> =>
        import('./Headers/SplitHeader'),
    [headerWithSocialsPreview.id]: (): Promise<HeaderWithSocialsModule> =>
        import('./Headers/HeaderWithSocials'),
    [minimalistHeaderPreview.id]: (): Promise<MinimalistHeaderModule> =>
        import('./Headers/MinimalistHeader'),
    [headerWithSecondaryNavPreview.id]: (): Promise<HeaderWithSecondaryNavModule> =>
        import('./Headers/HeaderWithSecondaryNav'),
    [ecommerceHeroPreview.id]: (): Promise<EcommerceHeroModule> =>
        import('./Heros/EcommerceHero'),
    [centeredHeroPreview.id]: (): Promise<CenteredHeroModule> =>
        import('./Heros/CenteredHero'),
    [videoBackgroundHeroPreview.id]: (): Promise<VideoBackgroundHeroModule> =>
        import('./Heros/VideoBackgroundHero'),
    [heroWithFormPreview.id]: (): Promise<HeroWithFormModule> =>
        import('./Heros/HeroWithForm'),
    [appShowcaseHeroPreview.id]: (): Promise<AppShowcaseHeroModule> =>
        import('./Heros/AppShowcaseHero'),
    [featuredProductsGridPreview.id]: (): Promise<FeaturedProductsGridModule> =>
        import('./Products/FeaturedProductsGrid'),
    [horizontalProductCardPreview.id]: (): Promise<HorizontalProductCardModule> =>
        import('./Products/HorizontalProductCard'),
    [productCardWithActionsPreview.id]: (): Promise<ProductCardWithActionsModule> =>
        import('./Products/ProductCardWithActions'),
    [productGridWithFiltersPreview.id]: (): Promise<ProductGridWithFiltersModule> =>
        import('./Products/ProductGridWithFilters'),
    [salesGridPreview.id]: (): Promise<SalesGridModule> =>
        import('./Products/SalesGrid'),
    [productComparisonTablePreview.id]: (): Promise<ProductComparisonTableModule> =>
        import('./Products/ProductComparisonTable'),
    [singleFeaturedProductPreview.id]: (): Promise<SingleFeaturedProductModule> =>
        import('./Products/SingleFeaturedProduct'),
    [productListViewPreview.id]: (): Promise<ProductListViewModule> =>
        import('./Products/ProductListView'),
    [categoryShowcasePreview.id]: (): Promise<CategoryShowcaseModule> =>
        import('./Products/CategoryShowcase'),
    [bestsellersCarouselPreview.id]: (): Promise<BestsellersCarouselModule> =>
        import('./Products/BestsellersCarousel'),
    [imageTextSplitPreview.id]: (): Promise<ImageTextSplitModule> =>
        import('./Content/ImageTextSplit'),
    [imageTextSplitReversedPreview.id]: (): Promise<ImageTextSplitReversedModule> =>
        import('./Content/ImageTextSplitReversed'),
    [textThenImagePreview.id]: (): Promise<TextThenImageModule> =>
        import('./Content/TextThenImage'),
    [imageWithTextOverlayPreview.id]: (): Promise<ImageWithTextOverlayModule> =>
        import('./Content/ImageWithTextOverlay'),
    [textWithSideImagePreview.id]: (): Promise<TextWithSideImageModule> =>
        import('./Content/TextWithSideImage'),
    [simpleCarouselPreview.id]: (): Promise<SimpleCarouselModule> =>
        import('./Carousels/SimpleCarousel'),
    [thumbnailsCarouselPreview.id]: (): Promise<ThumbnailsCarouselModule> =>
        import('./Carousels/ThumbnailsCarousel'),
    [fullwidthCarouselPreview.id]: (): Promise<FullwidthCarouselModule> =>
        import('./Carousels/FullwidthCarousel'),
    [testimonialsCarouselPreview.id]: (): Promise<TestimonialsCarouselModule> =>
        import('./Carousels/TestimonialsCarousel'),
    [cardCarouselPreview.id]: (): Promise<CardCarouselModule> =>
        import('./Carousels/CardCarousel'),
    [simpleFooterPreview.id]: (): Promise<SimpleFooterModule> =>
        import('./Footers/SimpleFooter'),
    [footerWithSocialsPreview.id]: (): Promise<FooterWithSocialsModule> =>
        import('./Footers/FooterWithSocials'),
    [footerDetailedPreview.id]: (): Promise<FooterDetailedModule> =>
        import('./Footers/FooterDetailed'),
    [footerWithNewsletterPreview.id]: (): Promise<FooterWithNewsletterModule> =>
        import('./Footers/FooterWithNewsletter'),
    [footerMinimalistPreview.id]: (): Promise<FooterMinimalistModule> =>
        import('./Footers/FooterMinimalist'),
};