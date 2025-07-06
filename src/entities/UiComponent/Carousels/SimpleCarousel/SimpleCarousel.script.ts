export default function(rootElement: HTMLElement) {
  const track = rootElement.querySelector<HTMLElement>('.simple-carousel__track');
  const slides = Array.from(rootElement.querySelectorAll<HTMLElement>('.simple-carousel__slide'));
  const nextButton = rootElement.querySelector<HTMLButtonElement>('.simple-carousel__btn--next');
  const prevButton = rootElement.querySelector<HTMLButtonElement>('.simple-carousel__btn--prev');

  if (!track || !slides.length || !nextButton || !prevButton) {
    return;
  }

  let currentIndex = 0;
  const slideCount = slides.length;

  const goToSlide = (index: number) => {
    if (index < 0) {
      currentIndex = slideCount - 1;
    } else if (index >= slideCount) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  };

  nextButton.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
  });

  prevButton.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
  });
}