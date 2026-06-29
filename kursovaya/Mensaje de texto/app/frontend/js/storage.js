/**
 * ============================================
 * IRON TEMPLE - Storage Module
 * Handles all LocalStorage operations
 * ============================================
 */

'use strict';

/**
 * Storage key constants
 */
const STORAGE_KEYS = {
  APPLICATIONS: 'irontemple_applications',
  THEME: 'irontemple_theme'
};

/**
 * Get all applications from LocalStorage
 * @returns {Array} Array of application objects
 */
const getApplications = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading applications from LocalStorage:', error);
    return [];
  }
};

/**
 * Save a new application to LocalStorage
 * @param {Object} application - Application data object
 * @returns {boolean} Success status
 */
const saveApplication = (application) => {
  try {
    const applications = getApplications();
    // Add unique ID and timestamp
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

/**
 * Delete an application by ID
 * @param {string} id - Application ID
 * @returns {boolean} Success status
 */
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

/**
 * Clear all applications from LocalStorage
 * @returns {boolean} Success status
 */
const clearAllApplications = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.APPLICATIONS);
    return true;
  } catch (error) {
    console.error('Error clearing applications:', error);
    return false;
  }
};

/**
 * Get saved theme preference
 * @returns {string} Theme name ('dark' or 'light')
 */
const getTheme = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
  } catch (error) {
    return 'dark';
  }
};

/**
 * Save theme preference
 * @param {string} theme - Theme name ('dark' or 'light')
 */
const saveTheme = (theme) => {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (error) {
    console.error('Error saving theme:', error);
  }
};

/**
 * Get application statistics
 * @returns {Object} Stats object with counts
 */
const getStats = () => {
  const applications = getApplications();
  const today = new Date().toDateString();
  const todayCount = applications.filter(app => 
    new Date(app.createdAt).toDateString() === today
  ).length;

  // Count plans
  const planCounts = {};
  applications.forEach(app => {
    const plan = app.plan || 'unknown';
    planCounts[plan] = (planCounts[plan] || 0) + 1;
  });

  // Find most popular plan
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