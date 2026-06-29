/**
 * ============================================
 * IRON TEMPLE - Gallery Module
 * Handles lightbox functionality for gallery page
 * ============================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Gallery elements
  const galleryGrid = document.getElementById('galleryGrid');
  const lightbox = document.getElementById('lightbox');
  
  if (!galleryGrid || !lightbox) return;

  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  // Get all gallery images
  const galleryItems = galleryGrid.querySelectorAll('.gallery__item');
  let currentIndex = 0;

  /**
   * Open lightbox with specific image
   * @param {number} index - Image index to display
   */
  const openLightbox = (index) => {
    currentIndex = index;
    const img = galleryItems[index].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  /**
   * Close lightbox
   */
  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  /**
   * Navigate to next image
   */
  const nextImage = () => {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    const img = galleryItems[currentIndex].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  };

  /**
   * Navigate to previous image
   */
  const prevImage = () => {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    const img = galleryItems[currentIndex].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  };

  // Click on gallery item to open lightbox
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  // Close button
  lightboxClose.addEventListener('click', closeLightbox);

  // Navigation buttons
  lightboxNext.addEventListener('click', nextImage);
  lightboxPrev.addEventListener('click', prevImage);

  // Close on background click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowRight':
        nextImage();
        break;
      case 'ArrowLeft':
        prevImage();
        break;
    }
  });

  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextImage(); // Swipe left = next
      } else {
        prevImage(); // Swipe right = prev
      }
    }
  }, { passive: true });
});