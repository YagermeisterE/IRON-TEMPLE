

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  

  const sliderEl = document.querySelector('.testimonials-slider');
  
  if (sliderEl && typeof Swiper !== 'undefined') {
    const testimonialSwiper = new Swiper('.testimonials-slider', {
      
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
      
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      
      keyboard: {
        enabled: true
      },
      
      a11y: {
        prevSlideMessage: 'Предыдущий отзыв',
        nextSlideMessage: 'Следующий отзыв'
      }
    });

    
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