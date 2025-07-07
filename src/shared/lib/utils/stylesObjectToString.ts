export const stylesObjectToString = (styles: Record<string, any>): string => {
  return Object.entries(styles)
    .map(([key, value]) => {
      const kebabKey = key.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
      return `${kebabKey}: ${value};`;
    })
    .join(' ');
};