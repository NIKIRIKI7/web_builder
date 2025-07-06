export default function(rootElement: HTMLElement) {
  const navItems = rootElement.querySelectorAll<HTMLElement>('.header-mega-menu__nav-item');

  navItems.forEach(item => {
    const toggleButton = item.querySelector<HTMLButtonElement>('.js-menu-toggle');
    const megaMenu = item.querySelector<HTMLElement>('.js-mega-menu');

    if (!toggleButton || !megaMenu) {
      return;
    }

    toggleButton.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = megaMenu.classList.contains('header-mega-menu__menu--is-open');

      navItems.forEach(otherItem => {
        otherItem.querySelector('.js-mega-menu')?.classList.remove('header-mega-menu__menu--is-open');
      });

      if (!isOpen) {
        megaMenu.classList.add('header-mega-menu__menu--is-open');
      }
    });
  });

  document.addEventListener('click', () => {
    navItems.forEach(item => {
      item.querySelector('.js-mega-menu')?.classList.remove('header-mega-menu__menu--is-open');
    });
  });
}