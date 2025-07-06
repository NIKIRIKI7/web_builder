export default function(rootElement: HTMLElement) {
  const track = rootElement.querySelector<HTMLElement>('.testimonials-carousel__track');
  const slides = Array.from(rootElement.querySelectorAll('.testimonials-carousel__slide'));
  const paginationContainer = rootElement.querySelector<HTMLElement>('.testimonials-carousel__pagination');

  if (!track || slides.length === 0 || !paginationContainer) return;

  let currentIndex = 0;
  const slideCount = slides.length;
  let dots: HTMLElement[] = [];

  const updateDots = () => {
    dots.forEach((dot, index) => {
      dot.classList.toggle('is-active', index === currentIndex);
    });
  };

  const goToSlide = (index: number) => {
    currentIndex = (index + slideCount) % slideCount;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
  };

  const createPagination = () => {
    for (let i = 0; i < slideCount; i++) {
      const dot = document.createElement('button');
      dot.classList.add('testimonials-carousel__dot');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      paginationContainer.appendChild(dot);
      dots.push(dot);
    }
  };

  createPagination();
  goToSlide(0);
}