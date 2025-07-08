export default function (rootElement) {
    const burgerBtn = rootElement.querySelector('.minimalist-header__burger-btn');
    const mobileNav = rootElement.querySelector('.minimalist-header__nav-mobile');

    if (burgerBtn && mobileNav) {
        burgerBtn.addEventListener('click', () => {
            const isOpen = mobileNav.classList.toggle('minimalist-header__nav-mobile--is-open');
            burgerBtn.setAttribute('aria-expanded', isOpen);
        });
    }
}