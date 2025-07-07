export const stylesObjectToString = (styles: Record<string, unknown>): string => {
    return Object.entries(styles)
        .map(([key, value]) => {
            if (typeof value === 'string' || typeof value === 'number') {
                const kebabKey = key.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
                return `${kebabKey}: ${value};`;
            }
            return '';
        })
        .join(' ');
};