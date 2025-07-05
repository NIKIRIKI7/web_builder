interface PageParts {
  title: string;
  bodyHtml: string;
  css: string;
  js: string;
}

export function buildHtml(parts: PageParts): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${parts.title}</title>
    <style>
        ${parts.css}
    </style>
</head>
<body>
    ${parts.bodyHtml}
    ${parts.js}
</body>
</html>`;
}