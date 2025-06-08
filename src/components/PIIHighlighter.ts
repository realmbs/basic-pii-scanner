// Class PIIHighlighter:
//   constructor(container: HTMLElement)
//   
//   highlightPII(text: string, matches: PIIMatch[])
//     create HTML with <mark> tags for each PII match
//     add data attributes for PII type
//     insert into container
//   
//   togglePIIType(type: string, visible: boolean)
//     show/hide highlights for specific PII type
//   
//   updateHighlights(enabledTypes: string[])
//     refresh display based on enabled types