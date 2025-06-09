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

    // log matches for debugging
    console.log('Matches found:', processedDocument.matches);
  }
);

// scan button
document.getElementById('new-scan-btn')?.addEventListener('click', () => {
  document.getElementById('results-section')!.hidden = true;
  document.getElementById('upload-section')!.hidden = false;
});