export default function (rootElement) {
    const burgerBtn = rootElement.querySelector('.split-header__burger-btn');
    const mobileNav = rootElement.querySelector('.split-header__nav-mobile');

    if (burgerBtn && mobileNav) {
        burgerBtn.addEventListener('click', () => {
            const isOpen = mobileNav.classList.toggle('split-header__nav-mobile--is-open');
            burgerBtn.setAttribute('aria-expanded', isOpen);
        });
    }
}