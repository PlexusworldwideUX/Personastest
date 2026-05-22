// Shared utility for parsing persona data from code strings

// Helper function to strip HTML tags and get plain text
function stripHtml(html: string): string {
  if (!html || html === "N/A") return "N/A";
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "N/A";
}

export interface ParseResult {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * Parses persona data from a code string containing either:
 * - `const [personaData, setPersonaData] = useState({...});` (app format)
 * - `const personaData = {...};` (LLM output format)
 * @param codeText - The code text to parse
 * @returns ParseResult with success status, parsed data, or error message
 */
export function parsePersonaCode(codeText: string): ParseResult {
  try {
    console.log("Attempting to parse persona code...");
    console.log("Code text length:", codeText.length);
    
    // Try to find useState first (app format)
    let stateStart = codeText.indexOf("useState(");
    let openBraceIndex = -1;
    
    if (stateStart !== -1) {
      // Format: const [personaData, setPersonaData] = useState({...});
      openBraceIndex = codeText.indexOf("{", stateStart);
    } else {
      // Try to find plain const personaData format (LLM output)
      const constMatch = codeText.match(/const\s+personaData\s*=\s*\{/);
      if (constMatch) {
        openBraceIndex = codeText.indexOf("{", constMatch.index);
      }
    }
    
    if (openBraceIndex === -1) {
      return {
        success: false,
        error: "Invalid code format. Could not find personaData object."
      };
    }
    
    // Count braces to find the matching closing brace
    let braceCount = 0;
    let endIndex = openBraceIndex;
    let inString = false;
    let stringChar = '';
    let escaped = false;
    
    for (let i = openBraceIndex; i < codeText.length; i++) {
      const char = codeText[i];
      
      // Handle escape sequences
      if (escaped) {
        escaped = false;
        continue;
      }
      
      if (char === '\\') {
        escaped = true;
        continue;
      }
      
      // Handle string boundaries
      if (char === '"' || char === "'") {
        if (!inString) {
          inString = true;
          stringChar = char;
        } else if (char === stringChar) {
          inString = false;
        }
        continue;
      }
      
      // Only count braces outside of strings
      if (!inString) {
        if (char === '{') {
          braceCount++;
        } else if (char === '}') {
          braceCount--;
          if (braceCount === 0) {
            endIndex = i;
            break;
          }
        }
      }
    }
    
    if (braceCount !== 0) {
      return {
        success: false,
        error: "Invalid code format. Mismatched braces."
      };
    }
    
    // Extract the object string (including braces)
    let objString = codeText.substring(openBraceIndex, endIndex + 1);
    console.log("Object string extracted, length:", objString.length);
    console.log("Object string first 500 chars:", objString.substring(0, 500));
    
    // Preprocess to fix common syntax errors
    // Fix duplicate field definitions where first has unclosed string
    // Pattern: fieldName: "\n  fieldName: value  -> fieldName: value
    objString = objString.replace(/(\w+):\s*["']\s*\n\s*\1:\s*/g, (match, p1) => `${p1}: `);
    
    // Fix standalone numbers that should be strings (e.g., 066 -> "066")
    // This handles cases like: revenueOpportunity: 066
    // Use replacement function to avoid $ character issues
    objString = objString.replace(/:\s*0(\d+)([,\s\n])/g, (match, p1, p2) => `: "0${p1}"${p2}`);
    
    // Use Function constructor to safely parse the object
    let parsedData;
    try {
      // Wrap in parentheses to ensure it's treated as an expression
      parsedData = new Function(`'use strict'; return (${objString})`)();
      console.log("Parsed data successfully:", Object.keys(parsedData));
    } catch (parseError: any) {
      console.error("Parse error:", parseError);
      console.error("Parse error details:", parseError.message);
      
      // Log more context about where the error occurred
      console.error("Object string that failed to parse:");
      console.error(objString);
      
      return {
        success: false,
        error: `Failed to parse code: ${parseError.message}`
      };
    }
    
    // Validate that we have the required fields
    if (!parsedData.name || !parsedData.traits) {
      console.error("Missing required fields. Has name:", !!parsedData.name, "Has traits:", !!parsedData.traits);
      return {
        success: false,
        error: "Missing required fields (name or traits)"
      };
    }

    // Strip HTML tags from certain fields
    const updatedPersona = {
      ...parsedData,
      quoteNote: stripHtml(parsedData.quoteNote),
      csatTooltip: stripHtml(parsedData.csatTooltip),
      cesTooltip: stripHtml(parsedData.cesTooltip),
      npsTooltip: stripHtml(parsedData.npsTooltip),
      cxRequirementsTooltip: stripHtml(parsedData.cxRequirementsTooltip),
      ageTooltip: stripHtml(parsedData.ageTooltip),
      genderTooltip: stripHtml(parsedData.genderTooltip),
      incomeTooltip: stripHtml(parsedData.incomeTooltip),
      educationTooltip: stripHtml(parsedData.educationTooltip),
      locationTooltip: stripHtml(parsedData.locationTooltip),
      occupationTooltip: stripHtml(parsedData.occupationTooltip),
      familyTooltip: stripHtml(parsedData.familyTooltip),
      spouseOccupationTooltip: stripHtml(parsedData.spouseOccupationTooltip),
      ambassadorRankTooltip: stripHtml(parsedData.ambassadorRankTooltip),
      vipTooltip: stripHtml(parsedData.vipTooltip),
      timeTooltip: stripHtml(parsedData.timeTooltip),
      revenueTooltip: stripHtml(parsedData.revenueTooltip),
      nurtureText: stripHtml(parsedData.nurtureText),
      // Auto-calculate engagementScore from personalityScore if undefined
      engagementScore: parsedData.engagementScore !== undefined 
        ? parsedData.engagementScore 
        : parsedData.personalityScore
    };

    console.log("Successfully parsed and cleaned persona data");
    return {
      success: true,
      data: updatedPersona
    };
  } catch (error: any) {
    console.error("Unexpected error in parsePersonaCode:", error);
    return {
      success: false,
      error: `Failed to parse: ${error.message}`
    };
  }
}