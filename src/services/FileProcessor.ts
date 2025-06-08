// Class FileProcessor:
//   processFile(file: File) -> Promise<string>
//     switch file.type:
//       case 'application/pdf': return processPDF(file)
//       case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': return processDOCX(file)
//       case 'text/plain': return processText(file)
//   
//   processPDF(file) -> use pdfjs-dist to extract text
//   processDOCX(file) -> use mammoth.js to extract text
//   processText(file) -> simple FileReader