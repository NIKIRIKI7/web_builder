export default function(rootElement: HTMLElement) {
  const burgerButton = rootElement.querySelector<HTMLButtonElement>('.header-centered__burger-btn');
  const mobileNav = rootElement.querySelector<HTMLElement>('.header-centered__nav-mobile');

  if (!burgerButton || !mobileNav) {
    return;
  }

  const navLinks = mobileNav.querySelectorAll<HTMLAnchorElement | HTMLButtonElement>('.header-centered__link, .header-centered__cta');

  const toggleMenu = () => {
    const isOpen = mobileNav.classList.toggle('header-centered__nav-mobile--is-open');
    burgerButton.setAttribute('aria-expanded', String(isOpen));
  };

  burgerButton.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileNav.classList.contains('header-centered__nav-mobile--is-open')) {
        toggleMenu();
      }
    });
  });
}