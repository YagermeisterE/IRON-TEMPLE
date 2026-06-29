/**
 * ============================================
 * IRON TEMPLE - Form Module
 * Handles form validation and submission
 * ============================================
 */

'use strict';

/**
 * Initialize form functionality when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');
  if (!signupForm) return;

  // Form elements
  const nameInput = document.getElementById('formName');
  const phoneInput = document.getElementById('formPhone');
  const emailInput = document.getElementById('formEmail');
  const planSelect = document.getElementById('formPlan');
  const dateInput = document.getElementById('formDate');
  const commentInput = document.getElementById('formComment');

  /**
   * Validate email format
   * @param {string} email - Email string to validate
   * @returns {boolean} Is valid
   */
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  /**
   * Validate phone format (Russian)
   * @param {string} phone - Phone string to validate
   * @returns {boolean} Is valid
   */
  const isValidPhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 12;
  };

  /**
   * Show error for a field
   * @param {HTMLElement} input - Input element
   * @param {string} errorId - Error span ID
   */
  const showError = (input, errorId) => {
    input.classList.add('error');
    const errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.style.display = 'block';
  };

  /**
   * Clear error for a field
   * @param {HTMLElement} input - Input element
   * @param {string} errorId - Error span ID
   */
  const clearError = (input, errorId) => {
    input.classList.remove('error');
    const errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.style.display = 'none';
  };

  /**
   * Show toast notification
   * @param {string} message - Notification message
   * @param {string} type - 'success' or 'error'
   */
  const showToast = (message, type = 'success') => {
    const toast = document.getElementById('toast');
    if (!toast) return;

    const icon = toast.querySelector('.toast__icon');
    const msg = toast.querySelector('.toast__message');

    // Update toast content
    msg.textContent = message;
    toast.className = `toast toast--${type} show`;
    
    if (type === 'success') {
      icon.className = 'toast__icon fas fa-check-circle';
    } else {
      icon.className = 'toast__icon fas fa-exclamation-circle';
    }

    // Auto-hide after 4 seconds
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  };

  /**
   * Validate all form fields
   * @returns {boolean} All fields valid
   */
  const validateForm = () => {
    let isValid = true;

    // Validate name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      showError(nameInput, 'nameError');
      isValid = false;
    } else {
      clearError(nameInput, 'nameError');
    }

    // Validate phone
    if (!isValidPhone(phoneInput.value)) {
      showError(phoneInput, 'phoneError');
      isValid = false;
    } else {
      clearError(phoneInput, 'phoneError');
    }

    // Validate email
    if (!isValidEmail(emailInput.value)) {
      showError(emailInput, 'emailError');
      isValid = false;
    } else {
      clearError(emailInput, 'emailError');
    }

    return isValid;
  };

  /**
   * Handle form submission
   */
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate
    if (!validateForm()) {
      showToast('Пожалуйста, заполните все обязательные поля', 'error');
      return;
    }

    // Collect form data
    const applicationData = {
      name: nameInput.value.trim(),
      phone: phoneInput.value.trim(),
      email: emailInput.value.trim(),
      plan: planSelect ? planSelect.value : 'standard',
      date: dateInput ? dateInput.value : '',
      comment: commentInput ? commentInput.value.trim() : ''
    };

    // Save to LocalStorage
    const saved = saveApplication(applicationData);

    if (saved) {
      showToast('Заявка успешно отправлена! Мы свяжемся с вами.', 'success');
      signupForm.reset();
      
      // Close modal if open
      const modal = document.getElementById('signupModal');
      if (modal && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    } else {
      showToast('Ошибка при отправке. Попробуйте ещё раз.', 'error');
    }
  });

  // Real-time validation on blur
  nameInput.addEventListener('blur', () => {
    if (nameInput.value.trim().length >= 2) {
      clearError(nameInput, 'nameError');
    }
  });

  phoneInput.addEventListener('blur', () => {
    if (isValidPhone(phoneInput.value)) {
      clearError(phoneInput, 'phoneError');
    }
  });

  emailInput.addEventListener('blur', () => {
    if (isValidEmail(emailInput.value)) {
      clearError(emailInput, 'emailError');
    }
  });

  // Phone mask (basic formatting)
  phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0 && value[0] === '8') {
      value = '7' + value.slice(1);
    }
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    if (value.length > 0) {
      let formatted = '+7';
      if (value.length > 1) formatted += ' (' + value.slice(1, 4);
      if (value.length > 4) formatted += ') ' + value.slice(4, 7);
      if (value.length > 7) formatted += '-' + value.slice(7, 9);
      if (value.length > 9) formatted += '-' + value.slice(9, 11);
      e.target.value = formatted;
    }
  });
});