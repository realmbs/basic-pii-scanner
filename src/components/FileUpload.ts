// Class FileUpload:
//   constructor(container: HTMLElement, onFileProcessed: callback)
//   
//   private setupEventListeners()
//     drag & drop events on upload area
//     file input change event
//     browse button click
//   
//   private handleFile(file: File)
//     validate file type and size
//     show loading state
//     call FileProcessor.processFile()
//     trigger onFileProcessed callback

import { FileProcessor } from '@/services/FileProcessor';
import { PIIDetector } from '@/services/PIIDetector';
import type { FileProcessorCallback } from '@/types';

export class FileUpload {
  private uploadArea: HTMLElement;
  private fileInput: HTMLInputElement;
  private browseButton: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    private onFileProcessed: FileProcessorCallback
  ) {
    this.uploadArea = container.querySelector('#upload-area') as HTMLElement;
    this.fileInput = container.querySelector('#file-input') as HTMLInputElement;
    this.browseButton = container.querySelector('#browse-btn') as HTMLButtonElement;

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    // browse button click
    this.browseButton.addEventListener('click', () => {
      this.fileInput.click();
    });

    // file input change
    this.fileInput.addEventListener('change', (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) this.handleFile(file);
    });

    // drag & drop events
    this.uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      this.uploadArea.classList.add('dragover');
    });

    this.uploadArea.addEventListener('dragleave', () => {
      this.uploadArea.classList.remove('dragover');
    });

    this.uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      this.uploadArea.classList.remove('dragover');
      const file = e.dataTransfer?.files?.[0];
      if (file) this.handleFile(file);
    });
  }

  private async handleFile(file: File): Promise<void> {
    console.log('Processing file', file.name);

    // show loading
    this.showLoading();

    try {
      // process file
      const result = await FileProcessor.processFile(file);

      if (result.success && result.content) {
        // detect pii
        const matches = PIIDetector.detectPII(result.content);
        const cleanText = PIIDetector.createCleanText(result.content, matches);

        console.log(`Found ${matches.length} PII matches in file:`, file.name);

        // trigger callback
        this.onFileProcessed({
          originalText: result.content,
          matches,
          cleanText
        });
      } else {
        this.showError(result.error || 'Unknown error');
      }
    } catch (error) {
      this.showError(error instanceof Error ? error.message : 'Unknown error');
    }
  }

  private showLoading(): void {
    document.getElementById('upload-section')!.hidden = true;
    document.getElementById('loading-section')!.hidden = false;
  }

  private showError(message: string): void {
    document.getElementById('loading-section')!.hidden = true;
    document.getElementById('upload-section')!.hidden = false;
    alert(`Error: ${message}`);
  }
}