export default function(rootElement) {
  const navItems = rootElement.querySelectorAll('.header-mega-menu__nav-item');

  navItems.forEach(item => {
    const toggleButton = item.querySelector('.js-menu-toggle');
    const megaMenu = item.querySelector('.js-mega-menu');

    if (!toggleButton || !megaMenu) {
      return;
    }

    toggleButton.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = megaMenu.classList.contains('header-mega-menu__menu--is-open');

      navItems.forEach(otherItem => {
        const otherMenu = otherItem.querySelector('.js-mega-menu');
        if (otherMenu) {
          otherMenu.classList.remove('header-mega-menu__menu--is-open');
        }
      });

      if (!isOpen) {
        megaMenu.classList.add('header-mega-menu__menu--is-open');
      }
    });
  });

  document.addEventListener('click', () => {
    navItems.forEach(item => {
      const menu = item.querySelector('.js-mega-menu');
      if (menu) {
        menu.classList.remove('header-mega-menu__menu--is-open');
      }
    });
  });
}