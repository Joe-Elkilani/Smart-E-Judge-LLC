class TestimonialSlider {
    constructor(sectionId, prevBtnId, nextBtnId, dotsContainerId) {
        this.section = document.getElementById(sectionId);
        this.testimonials = this.section.querySelectorAll('.testimonial');
        this.currentIndex = 0;
        this.totalSlides = this.testimonials.length;
        this.prevBtn = document.getElementById(prevBtnId);
        this.nextBtn = document.getElementById(nextBtnId);
        this.dotsContainer = document.getElementById(dotsContainerId);
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000;

        this.init();
    }

    init() {
        if (!this.section) return; // حماية لو id مش موجود
        this.createDots();
        this.bindEvents();
        this.goToSlide(0);
        this.startAutoPlay();
    }

    createDots() {
        this.dotsContainer.innerHTML = '';
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => {
                this.goToSlide(i);
                this.restartAutoPlay();
            });
            this.dotsContainer.appendChild(dot);
        }
    }

    bindEvents() {
        this.prevBtn.addEventListener('click', () => {
            this.previousSlide();
            this.restartAutoPlay();
        });

        this.nextBtn.addEventListener('click', () => {
            this.nextSlide();
            this.restartAutoPlay();
        });
    }

    goToSlide(index) {
        this.testimonials.forEach(t => t.classList.remove('active'));
        this.dotsContainer.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));

        this.currentIndex = index;
        this.testimonials[this.currentIndex].classList.add('active');
        this.dotsContainer.querySelectorAll('.dot')[this.currentIndex].classList.add('active');
    }

    nextSlide() {
        this.goToSlide((this.currentIndex + 1) % this.totalSlides);
    }

    previousSlide() {
        this.goToSlide((this.currentIndex - 1 + this.totalSlides) % this.totalSlides);
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => this.nextSlide(), this.autoPlayDelay);
    }

    restartAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);
    }
}

// Initialize sliders
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialSlider("clients1", "prevBtn", "nextBtn", "dotsContainer");
    new TestimonialSlider("clients2", "prevBtn2", "nextBtn2", "dotsContainer2");
});

// Init AOS Animations
AOS.init({
    duration: 1000,
    once: true
});
