export default function (rootElement) {
    const table = rootElement.querySelector('.product-comparison__table');
    if (!table) return;

    const headers = Array.from(table.querySelectorAll('thead th')).map((th) =>
        th.querySelector('.product-comparison__product-name')?.textContent.trim(),
    );

    const featureRows = table.querySelectorAll('tbody tr');

    featureRows.forEach((row) => {
        const featureName = row
            .querySelector('.product-comparison__td--feature-name')
            ?.textContent.trim();
        const cells = row.querySelectorAll(
            '.product-comparison__td:not(.product-comparison__td--feature-name)',
        );
        cells.forEach((cell, index) => {
            const productName = headers[index + 1];
            cell.setAttribute('data-label', `${productName} - ${featureName}`);
        });
    });
}