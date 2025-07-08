export default function (rootElement) {
    const burgerBtn = rootElement.querySelector('.secondary-nav-header__burger-btn');
    const mobileNav = rootElement.querySelector('.secondary-nav-header__nav-mobile');

    if (burgerBtn && mobileNav) {
        burgerBtn.addEventListener('click', () => {
            const isOpen = mobileNav.classList.toggle('secondary-nav-header__nav-mobile--is-open');
            burgerBtn.setAttribute('aria-expanded', isOpen);
        });
    }
}