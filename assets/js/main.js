class TestimonialSlider {
    constructor() {
        this.testimonials = document.querySelectorAll('.testimonial');
        this.currentIndex = 0;
        this.totalSlides = this.testimonials.length;
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.dotsContainer = document.getElementById('dotsContainer');
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000;

        this.init();
    }

    init() {
        this.createDots();
        this.bindEvents();
        this.updateNavigation();
        this.startAutoPlay();
    }

    createDots() {
        this.dotsContainer.innerHTML = '';
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }

    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        const clientsSection = document.querySelector('.clients');
        clientsSection.addEventListener('mouseenter', () => this.stopAutoPlay());
        clientsSection.addEventListener('mouseleave', () => this.startAutoPlay());

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        let startX = 0;
        let endX = 0;
        
        clientsSection.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        clientsSection.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
        });
    }

    goToSlide(index) {
        // Remove active class from all testimonials and dots
        this.testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
        this.currentIndex = index;
        this.testimonials[this.currentIndex].classList.add('active');
        document.querySelectorAll('.dot')[this.currentIndex].classList.add('active');

        this.updateNavigation();
        this.restartAutoPlay();
    }

    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }

    previousSlide() {
        const prevIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevIndex);
    }

    updateNavigation() {
        this.prevBtn.disabled = false;
        this.nextBtn.disabled = false;
    }

    startAutoPlay() {
        this.stopAutoPlay(); // Clear any existing interval
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    restartAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialSlider();
});

// Add smooth scrolling for the "Read More" button
document.querySelector('.btn').addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Read More clicked - implement navigation to full testimonials page');
});