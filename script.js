class ImageSlider {
    constructor() {
        this.slider = document.querySelector('.slider');
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        
        this.currentSlide = 0;
        this.slideCount = this.slides.length;
        this.autoPlayInterval = null;
        this.touchStartX = 0;
        this.touchEndX = 0;

        this.init();
    }

    init() {
        
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        
        this.slider.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.slider.addEventListener('touchend', (e) => this.handleTouchEnd(e));

        
        this.slider.addEventListener('mouseenter', () => this.pauseAutoPlay());
        this.slider.addEventListener('mouseleave', () => this.startAutoPlay());

        
        this.startAutoPlay();
    }

    updateSlider() {
        
        this.slider.style.transform = `translateX(-${this.currentSlide * 33.333}%)`;
        
        
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slideCount;
        this.updateSlider();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slideCount) % this.slideCount;
        this.updateSlider();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlider();
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
    }

    pauseAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }

    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.pauseAutoPlay();
    }

    handleTouchEnd(e) {
        this.touchEndX = e.changedTouches[0].clientX;
        this.handleSwipe();
        this.startAutoPlay();
    }

    handleSwipe() {
        const swipeDistance = this.touchEndX - this.touchStartX;
        const minSwipeDistance = 50;

        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                this.prevSlide();
            } else {
                this.nextSlide();
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ImageSlider();
}); 