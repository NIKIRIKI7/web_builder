export default function(rootElement) {
  const viewport = rootElement.querySelector('.card-carousel__viewport');
  const track = rootElement.querySelector('.card-carousel__track');
  const slides = Array.from(rootElement.querySelectorAll('.card-carousel__slide'));
  const nextButton = rootElement.querySelector('.card-carousel__btn--next');
  const prevButton = rootElement.querySelector('.card-carousel__btn--prev');

  if (!viewport || !track || !slides.length || !nextButton || !prevButton) {
    return;
  }

  let currentIndex = 0;
  let slidesPerView = 3;

  const updateSlidesPerView = () => {
    const viewportWidth = viewport.offsetWidth;
    if (viewportWidth < 768 && viewportWidth >= 576) {
      slidesPerView = 2;
    } else if (viewportWidth < 576) {
      slidesPerView = 1;
    } else {
      slidesPerView = 3;
    }
  };

  const slideCount = slides.length;
  const maxIndex = Math.ceil(slideCount / slidesPerView) - 1;

  const goToSlide = (index) => {
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    const gap = parseFloat(getComputedStyle(track).gap) || 24;
    const slideWidth = slides[0].offsetWidth;
    const offset = currentIndex * (slidesPerView * slideWidth + (slidesPerView - 1) * gap);
    track.style.transform = `translateX(-${offset}px)`;
  };

  nextButton.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
  });

  prevButton.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
  });

  window.addEventListener('resize', () => {
    updateSlidesPerView();
    goToSlide(currentIndex);
  });

  updateSlidesPerView();
  goToSlide(0);
}