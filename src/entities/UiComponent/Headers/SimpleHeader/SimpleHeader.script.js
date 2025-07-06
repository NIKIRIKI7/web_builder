export default function(rootElement) {
  const burgerButton = rootElement.querySelector('.simple-header__burger-btn');
  const nav = rootElement.querySelector('.simple-header__nav');
  const navLinks = rootElement.querySelectorAll('.simple-header__link');

  if (!burgerButton || !nav) {
    return;
  }

  const toggleMenu = () => {
    const isOpen = nav.classList.toggle('simple-header__nav--is-open');
    burgerButton.setAttribute('aria-expanded', String(isOpen));
  };

  burgerButton.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('simple-header__nav--is-open')) {
        toggleMenu();
      }
    });
  });
}