export default function (rootElement) {
    const track = rootElement.querySelector('.bestsellers-carousel__track');
    const slides = Array.from(
        rootElement.querySelectorAll('.bestsellers-carousel__slide'),
    );
    const nextButton = rootElement.querySelector(
        '.bestsellers-carousel__btn--next',
    );
    const prevButton = rootElement.querySelector(
        '.bestsellers-carousel__btn--prev',
    );

    if (!track || !slides.length || !nextButton || !prevButton) return;

    let currentIndex = 0;
    let slidesPerPage = getSlidesPerPage();

    function getSlidesPerPage() {
        if (slides.length === 0) return 1;
        const slideWidth = slides.offsetWidth;
        const trackWidth = track.offsetWidth;
        return Math.max(1, Math.round(trackWidth / slideWidth));
    }

    function updateCarousel() {
        if (slides.length === 0) return;
        const slideWidth = slides.offsetWidth;
        const gap = parseInt(window.getComputedStyle(track).gap, 10) || 0;
        const totalSlideWidth = slideWidth + gap;
        track.style.transform = `translateX(-${currentIndex * totalSlideWidth}px)`;

        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= slides.length - slidesPerPage;
    }

    nextButton.addEventListener('click', () => {
        if (currentIndex < slides.length - slidesPerPage) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    const resizeObserver = new ResizeObserver(() => {
        slidesPerPage = getSlidesPerPage();
        if (currentIndex > slides.length - slidesPerPage) {
            currentIndex = Math.max(0, slides.length - slidesPerPage);
        }
        updateCarousel();
    });

    resizeObserver.observe(track);
    updateCarousel();
}