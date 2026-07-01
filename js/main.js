

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  
  
  
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
      }, 500);
    });
    
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 3000);
  }

  
  
  
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  
  const savedTheme = getTheme();
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', newTheme);
      saveTheme(newTheme);
      updateThemeIcon(newTheme);
    });
  }

  

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
  }

  
  
  
  const header = document.getElementById('header');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); 

  
  
  
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    
    nav.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('active')) {
        burger.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  
  
  
  const scrollTopBtn = document.getElementById('scrollTop');

  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  
  
  
  const animatedElements = document.querySelectorAll('[data-animate]');

  const animateOnScroll = () => {
    const windowHeight = window.innerHeight;
    
    animatedElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const triggerPoint = windowHeight * 0.85;

      if (elementTop < triggerPoint) {
        el.classList.add('animated');
      }
    });
  };

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); 

  
  
  
  const counters = document.querySelectorAll('[data-count]');
  let countersAnimated = false;

  const animateCounters = () => {
    if (countersAnimated) return;

    counters.forEach(counter => {
      const rect = counter.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        countersAnimated = true;
        const target = parseInt(counter.dataset.count);
        const duration = 2000;
        const start = performance.now();

        const updateCounter = (currentTime) => {
          const elapsed = currentTime - start;
          const progress = Math.min(elapsed / duration, 1);
          
          const eased = 1 - Math.pow(1 - progress, 3);
          counter.textContent = Math.floor(target * eased).toLocaleString('ru-RU');

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toLocaleString('ru-RU');
          }
        };

        requestAnimationFrame(updateCounter);
      }
    });
  };

  if (counters.length > 0) {
    window.addEventListener('scroll', animateCounters);
    animateCounters();
  }

  
  
  
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');
    if (question) {
      question.addEventListener('click', () => {
        
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
          }
        });
        
        item.classList.toggle('active');
      });
    }
  });

  
  
  
  const signupModal = document.getElementById('signupModal');
  const modalClose = document.getElementById('modalClose');
  const heroSignupBtn = document.getElementById('heroSignupBtn');

  
  if (heroSignupBtn && signupModal) {
    heroSignupBtn.addEventListener('click', (e) => {
      e.preventDefault();
      signupModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  
  document.querySelectorAll('.signup-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (signupModal) {
        signupModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        const plan = btn.dataset.plan;
        const planSelect = document.getElementById('formPlan');
        if (plan && planSelect) {
          planSelect.value = plan;
        }
      }
    });
  });

  
  if (modalClose && signupModal) {
    modalClose.addEventListener('click', () => {
      signupModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  
  if (signupModal) {
    signupModal.addEventListener('click', (e) => {
      if (e.target === signupModal) {
        signupModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && signupModal && signupModal.classList.contains('active')) {
      signupModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  
  
  
  const serviceSearch = document.getElementById('serviceSearch');
  const servicesGrid = document.getElementById('servicesGrid');

  if (serviceSearch && servicesGrid) {
    serviceSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const cards = servicesGrid.querySelectorAll('.service-card');

      cards.forEach(card => {
        const title = card.querySelector('.service-card__title').textContent.toLowerCase();
        const text = card.querySelector('.service-card__text').textContent.toLowerCase();
        const matches = title.includes(query) || text.includes(query);
        card.style.display = matches ? '' : 'none';
      });
    });
  }

  
  
  
  const filterBtns = document.querySelectorAll('.filter-btn');
  const trainersGrid = document.getElementById('trainersGrid');

  if (filterBtns.length > 0 && trainersGrid) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        const cards = trainersGrid.querySelectorAll('.trainer-card');

        cards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = '';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  
  
  
  const calcPlan = document.getElementById('calcPlan');
  const calcMonths = document.getElementById('calcMonths');
  const calcTrainer = document.getElementById('calcTrainer');
  const calcNutrition = document.getElementById('calcNutrition');
  const calcLocker = document.getElementById('calcLocker');
  const calcResult = document.getElementById('calcResult');
  const calcSavings = document.getElementById('calcSavings');

  

  const calculatePrice = () => {
    if (!calcPlan || !calcMonths || !calcResult) return;

    const basePricePerMonth = parseInt(calcPlan.value);
    const months = parseInt(calcMonths.value);

    
    let discount = 0;
    if (months === 3) discount = 0.05;
    else if (months === 6) discount = 0.10;
    else if (months === 12) discount = 0.20;

    
    let extras = 0;
    if (calcTrainer && calcTrainer.checked) extras += parseInt(calcTrainer.value);
    if (calcNutrition && calcNutrition.checked) extras += parseInt(calcNutrition.value);
    if (calcLocker && calcLocker.checked) extras += parseInt(calcLocker.value);

    const totalPerMonth = basePricePerMonth + extras;
    const totalWithoutDiscount = totalPerMonth * months;
    const totalWithDiscount = totalWithoutDiscount * (1 - discount);
    const savings = totalWithoutDiscount - totalWithDiscount;

    
    calcResult.textContent = Math.round(totalWithDiscount).toLocaleString('ru-RU') + '₽';
    if (calcSavings) {
      if (savings > 0) {
        calcSavings.textContent = `Вы экономите: ${Math.round(savings).toLocaleString('ru-RU')}₽`;
        calcSavings.style.display = '';
      } else {
        calcSavings.style.display = 'none';
      }
    }
  };

  
  [calcPlan, calcMonths, calcTrainer, calcNutrition, calcLocker].forEach(el => {
    if (el) el.addEventListener('change', calculatePrice);
  });

  
  calculatePrice();
});