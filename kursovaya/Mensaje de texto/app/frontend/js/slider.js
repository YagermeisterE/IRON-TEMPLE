/**
 * ============================================
 * IRON TEMPLE - Slider Module
 * Initializes Swiper testimonials slider
 * ============================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  /**
   * Initialize testimonials Swiper slider
   * Only runs if the slider element exists on the page
   */
  const sliderEl = document.querySelector('.testimonials-slider');
  
  if (sliderEl && typeof Swiper !== 'undefined') {
    const testimonialSwiper = new Swiper('.testimonials-slider', {
      // Slider settings
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      speed: 600,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      // Pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      // Keyboard navigation
      keyboard: {
        enabled: true
      },
      // Accessibility
      a11y: {
        prevSlideMessage: 'Предыдущий отзыв',
        nextSlideMessage: 'Следующий отзыв'
      }
    });

    // Pause autoplay when section is not visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          testimonialSwiper.autoplay.start();
        } else {
          testimonialSwiper.autoplay.stop();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(sliderEl);
  }
});