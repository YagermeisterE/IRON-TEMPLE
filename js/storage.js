

'use strict';

const STORAGE_KEYS = {
  APPLICATIONS: 'irontemple_applications',
  THEME: 'irontemple_theme'
};

const getApplications = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading applications from LocalStorage:', error);
    return [];
  }
};

const saveApplication = (application) => {
  try {
    const applications = getApplications();
    
    application.id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    application.createdAt = new Date().toISOString();
    applications.push(application);
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
    return true;
  } catch (error) {
    console.error('Error saving application to LocalStorage:', error);
    return false;
  }
};

const deleteApplication = (id) => {
  try {
    const applications = getApplications();
    const filtered = applications.filter(app => app.id !== id);
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting application:', error);
    return false;
  }
};

const clearAllApplications = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.APPLICATIONS);
    return true;
  } catch (error) {
    console.error('Error clearing applications:', error);
    return false;
  }
};

const getTheme = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
  } catch (error) {
    return 'dark';
  }
};

const saveTheme = (theme) => {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (error) {
    console.error('Error saving theme:', error);
  }
};

const getStats = () => {
  const applications = getApplications();
  const today = new Date().toDateString();
  const todayCount = applications.filter(app => 
    new Date(app.createdAt).toDateString() === today
  ).length;

  
  const planCounts = {};
  applications.forEach(app => {
    const plan = app.plan || 'unknown';
    planCounts[plan] = (planCounts[plan] || 0) + 1;
  });

  
  let popularPlan = '—';
  let maxCount = 0;
  Object.entries(planCounts).forEach(([plan, count]) => {
    if (count > maxCount) {
      maxCount = count;
      popularPlan = plan.charAt(0).toUpperCase() + plan.slice(1);
    }
  });

  return {
    total: applications.length,
    today: todayCount,
    popularPlan,
    planCounts
  };
};