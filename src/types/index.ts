// Define interfaces for:
// - PIIMatch (type, text, startIndex, endIndex, confidence)
// - PIICategory (name, color, enabled, count)
// - ProcessedDocument (originalText, matches, cleanText)
// - FileProcessingResult (success, content, error)

export interface PIIMatch {
  type: string; // type of the match ('pii', 'piicategory', etc)
  text: string; // matched text
  startIndex: number; // start index of match in original text
  endIndex: number; // end index of match in original text
  confidence: number; // confidence score of the match ( 0.0 to 1.0)
}

export interface PIICategory {
  name: string; // name of the pii category
  type: string; // type of the pii category ('pii', 'piicategory', etc)
  color: string; // associated color for the category (# code)
  enabled: boolean; // is the category enabled for processing
  count: number; // number of matches found in the document
}

export interface ProcessedDocument {
  originalText: string; // the original text of the orig document
  matches: PIIMatch[]; // array of pii matches found (if any)
  cleanText: string; // output text after pii removal
}

export interface FileProcessingResult {
  success: boolean; // was the file successfully processed
  content?: string; // content of the processed file (if success == true)
  error?: string; // error message (if success == false)
}

export type FileProcessorCallback = (result: ProcessedDocument) => void;