import './styles/main.scss';
import { FileUpload } from './components/FileUpload';

// initialize theme
document.documentElement.setAttribute('data-theme', 'dark');

// theme toggle logic
const themeToggle = document.getElementById('theme-toggle');
themeToggle?.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

const fileUpload = new FileUpload(
  document.querySelector('main')!,
  (processedDocument) => {
    console.log('File processed:', processedDocument);

    // show results
    const resultsSection = document.getElementById('results-section')!;
    resultsSection.hidden = false;

    // hide loading
    document.getElementById('loading-section')!.hidden = true;

    // populate document content
    const documentContent = document.getElementById('document-content')!;
    documentContent.textContent = processedDocument.originalText;

    // generate pii category toggles
    const piiToggles = document.getElementById('pii-toggles')!;
    const piiStats = document.getElementById('pii-stats')!;

    if (processedDocument.matches.length > 0) {
      // create category map
      const categoryMap = new Map<string, { count: number; color: string }>();
      const colors = {
        email: '#ef4444',
        phone: '#f59e0b',
        ssn: '#10b981',
        creditCard: '#6366f1',
        address: '#8b5cf6',
        dob: '#06b6d4'
      };

      processedDocument.matches.forEach(match => {
        const current = categoryMap.get(match.type) || { count: 0, color: colors[match.type] || '#64748b' };
        categoryMap.set(match.type, { count: current.count + 1, color: current.color });
      });

      // generate toggle html
      piiToggles.innerHTML = Array.from(categoryMap.entries()).map(([type, data]) => `
      <div class="toggle-item">
        <label>
          <input type="checkbox" data-type="${type}" checked>
          ${type.charAt(0).toUpperCase() + type.slice(1)}
        </label>
        <span class="count" style="background-color: ${data.color}">${data.count}</span>
        </div>
      `).join('');

      // generate stats
      const totalMatches = processedDocument.matches.length;
      piiStats.innerHTML = `
        <h4>Summary</h4>
        <div class="stat-item">
          <span>Total PII Found:</span>
          <span class="count">${totalMatches}</span>
        </div>
        <div class="stat-item">
          <span>Categories:</span>
          <span class="count">${categoryMap.size}</span>
        </div>
        `;
    } else {
      piiToggles.innerHTML = `
        <h4>Summary</h4>
        <div class="stat-item">
          <span>Total PII Found:</span>
          <span class="count">0</span>
        </div>
      `;
    }

    // log matches for debugging
    console.log('Matches found:', processedDocument.matches);
  }
);

// scan button
document.getElementById('new-scan-btn')?.addEventListener('click', () => {
  document.getElementById('results-section')!.hidden = true;
  document.getElementById('upload-section')!.hidden = false;
});