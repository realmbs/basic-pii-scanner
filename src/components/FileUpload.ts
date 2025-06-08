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