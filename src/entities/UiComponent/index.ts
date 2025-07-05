import { simpleHeaderPreview } from './Headers/SimpleHeader';
import { simpleFooterPreview } from './Footers/SimpleFooter';

export const allPreviews = [simpleHeaderPreview, simpleFooterPreview];

export const configLoaders = {
    [simpleHeaderPreview.id]: () => import('./Headers/SimpleHeader'),
    [simpleFooterPreview.id]: () => import('./Footers/SimpleFooter'),
};