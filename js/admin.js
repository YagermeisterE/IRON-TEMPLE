

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  
  const tableBody = document.getElementById('adminTableBody');
  const searchInput = document.getElementById('adminSearch');
  const sortSelect = document.getElementById('adminSort');
  const clearAllBtn = document.getElementById('clearAllBtn');
  const emptyMessage = document.getElementById('emptyMessage');
  const totalEl = document.getElementById('totalApplications');
  const todayEl = document.getElementById('todayApplications');
  const popularEl = document.getElementById('popularPlan');

  if (!tableBody) return;

  

  const renderTable = (applications) => {
    if (applications.length === 0) {
      tableBody.innerHTML = '';
      if (emptyMessage) emptyMessage.style.display = 'block';
      return;
    }

    if (emptyMessage) emptyMessage.style.display = 'none';

    tableBody.innerHTML = applications.map((app, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${escapeHtml(app.name)}</td>
        <td>${escapeHtml(app.phone)}</td>
        <td>${escapeHtml(app.email)}</td>
        <td><span style="text-transform:capitalize;">${escapeHtml(app.plan || '—')}</span></td>
        <td>${formatDate(app.createdAt)}</td>
        <td>
          <button class="btn-delete" data-id="${app.id}" title="Удалить">
            <i class="fas fa-trash-alt"></i>
          </button>
        </td>
      </tr>
    `).join('');

    
    tableBody.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        if (confirm('Удалить эту заявку?')) {
          deleteApplication(id);
          refreshData();
        }
      });
    });
  };

  

  const escapeHtml = (str) => {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };

  

  const formatDate = (isoDate) => {
    if (!isoDate) return '—';
    const date = new Date(isoDate);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  

  const sortApplications = (apps, criteria) => {
    const sorted = [...apps];
    switch (criteria) {
      case 'date-desc':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'date-asc':
        return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name, 'ru'));
      default:
        return sorted;
    }
  };

  

  const filterApplications = (apps, query) => {
    if (!query) return apps;
    const lowerQuery = query.toLowerCase();
    return apps.filter(app => 
      app.name.toLowerCase().includes(lowerQuery) ||
      app.email.toLowerCase().includes(lowerQuery) ||
      (app.phone && app.phone.includes(query))
    );
  };

  

  const updateStats = () => {
    const stats = getStats();
    if (totalEl) totalEl.textContent = stats.total;
    if (todayEl) todayEl.textContent = stats.today;
    if (popularEl) popularEl.textContent = stats.popularPlan;
  };

  

  const renderChart = () => {
    const canvas = document.getElementById('plansChart');
    if (!canvas || typeof Chart === 'undefined') return;

    const stats = getStats();
    const planLabels = {
      start: 'Start',
      standard: 'Standard',
      premium: 'Premium',
      vip: 'VIP'
    };

    const labels = Object.keys(planLabels).map(k => planLabels[k]);
    const data = Object.keys(planLabels).map(k => stats.planCounts[k] || 0);

    
    const existingChart = Chart.getChart(canvas);
    if (existingChart) existingChart.destroy();

    new Chart(canvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Количество заявок',
          data,
          backgroundColor: [
            'rgba(229, 57, 53, 0.6)',
            'rgba(229, 57, 53, 0.7)',
            'rgba(229, 57, 53, 0.8)',
            'rgba(229, 57, 53, 0.9)'
          ],
          borderColor: '#E53935',
          borderWidth: 1,
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#b0b0b0',
              stepSize: 1
            },
            grid: {
              color: 'rgba(255,255,255,0.05)'
            }
          },
          x: {
            ticks: {
              color: '#b0b0b0'
            },
            grid: {
              display: false
            }
          }
        }
      }
    });
  };

  

  const refreshData = () => {
    let apps = getApplications();
    const query = searchInput ? searchInput.value : '';
    const sortCriteria = sortSelect ? sortSelect.value : 'date-desc';

    apps = filterApplications(apps, query);
    apps = sortApplications(apps, sortCriteria);

    renderTable(apps);
    updateStats();
    renderChart();
  };

  
  if (searchInput) {
    searchInput.addEventListener('input', refreshData);
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', refreshData);
  }

  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
      if (confirm('Вы уверены, что хотите удалить все заявки? Это действие необратимо.')) {
        clearAllApplications();
        refreshData();
      }
    });
  }

  
  refreshData();
});