import type { FileProcessingResult } from '@/types';

export class FileProcessor {
  static async processFile(file: File): Promise<FileProcessingResult> {
    try {
      // validate file exists
      if (!file) {
        throw new Error('No file provided for processing.');
      }

      // validate file size (10MB max)
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new Error('File size exceeds the maximum limit of 10MB.');
      }

      // validate file is supported
      if (!this.isSupported(file)) {
        throw new Error(`Unsupported file type: ${file.type || file.name}`);
      }

      switch (file.type) {
        case 'text/plain':
          return await this.processText(file);
        case 'application/pdf':
          return await this.processPDF(file);
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          return await this.processDOCX(file);
        default:
          // extension based processing
          const extension = file.name.toLowerCase().split('.').pop();
          if (extension === 'txt') {
            return await this.processText(file);
          } else if (extension === 'pdf') {
            return await this.processPDF(file);
          } else if (extension === 'docx') {
            return await this.processDOCX(file);
          }
          throw new Error(`Unsupported file type: ${file.type || extension}`);
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  private static async processText(file: File): Promise<FileProcessingResult> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;

          if (!content || content.trim().length === 0) {
            reject(new Error('File is empty or contains only whitespace.'));
            return;
          }

          resolve({
            success: true,
            content: content
          });
        } catch (error) {
          reject(new Error('Failed to read text file'));
        }
      };

      reader.onerror = () => {
        reject(new Error('Failed to read text file'));
      };

      reader.readAsText(file);
    });
  }

  private static async processPDF(file: File): Promise<FileProcessingResult> {
    // placeholder for pdfjs-dist or similar
    return {
      success: false,
      error: 'PDF processing not implemented yet. Please use TXT files for now.'
    };
  }

  private static async processDOCX(file: File): Promise<FileProcessingResult> {
    // placeholder for mammoth.js or similar
    return {
      success: false,
      error: 'DOCX processing not implemented yet. Please use TXT files for now.'
    };
  }

  static getSupportedTypes(): string[] {
    return ['.txt', '.pdf', '.docx'];
  }

  static isSupported(file: File): boolean {
    if (!file) return false;

    const supportedTypes = [
      'text/plain',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    const supportedExtensions = ['txt', 'pdf', 'docx'];
    const extension = file.name.toLowerCase().split('.').pop();

    return supportedTypes.includes(file.type) || (typeof extension === 'string' && supportedExtensions.includes(extension));
  }

  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }
}