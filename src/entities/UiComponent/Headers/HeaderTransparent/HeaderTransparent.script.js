export default function(rootElement) {
  const scrollHandler = () => {
    if (window.scrollY > 50) {
      rootElement.classList.add('header-transparent--scrolled');
    } else {
      rootElement.classList.remove('header-transparent--scrolled');
    }
  };

  window.addEventListener('scroll', scrollHandler, { passive: true });
}