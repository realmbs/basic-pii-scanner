// Class ResultsPanel:
//   constructor(container: HTMLElement)
//   
//   displayResults(document: ProcessedDocument)
//     populate PII category toggles
//     show statistics
//     setup export functionality
//   
//   private createPIIToggle(category: PIICategory)
//     create checkbox for each PII type
//     bind change events
//   
//   private updateStats(matches: PIIMatch[])
//     count matches by type
//     display totals