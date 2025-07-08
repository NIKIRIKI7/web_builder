export default function (rootElement) {
    const burgerBtn = rootElement.querySelector('.header-with-top-bar__burger-btn');
    const mobileNav = rootElement.querySelector('.header-with-top-bar__nav-mobile');

    if (burgerBtn && mobileNav) {
        burgerBtn.addEventListener('click', () => {
            const isOpen = mobileNav.classList.toggle('header-with-top-bar__nav-mobile--is-open');
            burgerBtn.setAttribute('aria-expanded', isOpen);
        });
    }
}