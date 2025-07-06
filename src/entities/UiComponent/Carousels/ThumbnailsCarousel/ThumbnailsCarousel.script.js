export default function(rootElement) {
  const mainImage = rootElement.querySelector('.thumbnails-carousel__main-image');
  const thumbButtons = Array.from(rootElement.querySelectorAll('.thumbnails-carousel__thumb-btn'));

  if (!mainImage || thumbButtons.length === 0) return;

  let activeThumb = thumbButtons[0];
  activeThumb.classList.add('is-active');

  thumbButtons.forEach(button => {
    button.addEventListener('click', () => {
      const thumbImage = button.querySelector('.thumbnails-carousel__thumb-image');
      if (!thumbImage) return;

      if (activeThumb) {
        activeThumb.classList.remove('is-active');
      }

      mainImage.style.opacity = '0';
      setTimeout(() => {
        mainImage.src = thumbImage.src;
        mainImage.alt = thumbImage.alt;
        mainImage.style.opacity = '1';
      }, 200);

      button.classList.add('is-active');
      activeThumb = button;
    });
  });
}