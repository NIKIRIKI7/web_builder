/**
 * Собирает все CSS-правила с текущей страницы в одну строку.
 * @returns {string} Строка, содержащая все CSS-стили документа.
 */
export function getDocumentCss(): string {
    let css = '';
    // Проходим по всем таблицам стилей на странице
    for (const sheet of Array.from(document.styleSheets)) {
        try {
            // Проходим по всем правилам внутри каждой таблицы
            for (const rule of Array.from(sheet.cssRules)) {
                css += rule.cssText;
            }
        } catch (e) {
            // Игнорируем ошибки CORS для внешних таблиц стилей
            console.warn('Could not read CSS rules from stylesheet:', sheet.href, e);
        }
    }
    return css;
}