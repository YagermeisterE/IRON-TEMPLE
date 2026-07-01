

'use strict';

const EMAILJS_CONFIG = {
  publicKey: 'jSFe7I9jEgEWQYWM4',
  serviceId: 'service_a9vhd5h',
  templateAdmin: 'template_p4s14ht',
  templateUser: 'template_10a7u1o'
};

document.addEventListener('DOMContentLoaded', () => {
  
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_CONFIG.publicKey);
    console.log('EmailJS initialized');
  } else {
    console.error('EmailJS SDK not loaded');
    return;
  }

  
  document.addEventListener('applicationSaved', (e) => {
    const formData = e.detail;
    if (formData) {
      sendEmails(formData);
    }
  });
});

function sendEmails(formData) {
  if (typeof emailjs === 'undefined') {
    console.error('EmailJS SDK not loaded');
    return;
  }

  
  const templateParams = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    plan: formData.plan || 'standard',
    date: formData.date || 'Не указана',
    message: formData.comment || 'Без комментария'
  };

  
  emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateAdmin, templateParams)
    .then(() => {
      console.log('Admin email sent');
    })
    .catch((error) => {
      if (error.text && error.text.includes('template')) {
        console.error('Template not found:', error.text);
      } else if (error.text && error.text.includes('public key')) {
        console.error('Invalid Public Key:', error.text);
      } else if (error.text && error.text.includes('service')) {
        console.error('Service not found:', error.text);
      } else {
        console.error('Network error (admin email):', error);
      }
    });

  
  emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateUser, templateParams)
    .then(() => {
      console.log('User email sent');
    })
    .catch((error) => {
      if (error.text && error.text.includes('template')) {
        console.error('Template not found:', error.text);
      } else if (error.text && error.text.includes('public key')) {
        console.error('Invalid Public Key:', error.text);
      } else if (error.text && error.text.includes('service')) {
        console.error('Service not found:', error.text);
      } else {
        console.error('Network error (user email):', error);
      }
    });
}