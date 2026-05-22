import { PERSONA_TEMPLATE } from "./personaTemplate";

/**
 * Parses the PERSONA_TEMPLATE string and extracts the default values
 * This ensures the app's initial state always matches the template
 */
export function getDefaultPersonaFromTemplate(): any {
  try {
    console.log("📋 Parsing PERSONA_TEMPLATE for initial state...");
    
    // Extract just the object part from the template (everything between { and });)
    // The template format is: const [personaData, setPersonaData] = useState({ ... });
    const objectMatch = PERSONA_TEMPLATE.match(/useState\(\{([\s\S]*)\}\);/);
    
    if (!objectMatch) {
      console.error("❌ Could not parse template - using hardcoded defaults");
      return getHardcodedDefaults();
    }
    
    // Wrap it in curly braces to make it valid JavaScript object literal
    const objectString = `{${objectMatch[1]}}`;
    
    // Log the first 500 chars of what we're trying to parse
    console.log("🔍 Attempting to parse object string (first 500 chars):");
    console.log(objectString.substring(0, 500));
    
    // Use Function constructor to safely parse the JavaScript object literal
    // This is safe because PERSONA_TEMPLATE is our own code, not user input
    const parsed = new Function(`'use strict'; return ${objectString}`)();
    
    console.log("✅ Successfully parsed PERSONA_TEMPLATE");
    console.log("📊 Sample fields:", {
      name: parsed.name,
      age: parsed.age,
      consumerType: parsed.consumerType
    });
    
    // Add fields that aren't in the template but are needed by the app
    return {
      ...parsed,
      // Image-related fields
      imageUrl: "",
      imageTransform: { x: 0, y: 0, rotation: 0, zoom: 1 },
      // These were in the old default but might not be in template
      role: "N/A",
      subtitle: "N/A",
      ambassadorRank: parsed.ambassadorRank || "N/A",
      previousVIPStatus: parsed.previousVIPStatus || "N/A",
      potentialBusinessInterest: parsed.potentialBusinessInterest || "N/A"
    };
  } catch (error) {
    console.error("❌ Error parsing template:", error);
    
    // Try to show more details about what failed
    if (error instanceof SyntaxError) {
      console.error("💡 Syntax Error Details:", error.message);
      // Try to extract the problematic part
      try {
        const objectMatch = PERSONA_TEMPLATE.match(/useState\(\{([\s\S]*)\}\);/);
        if (objectMatch) {
          const objectString = `{${objectMatch[1]}}`;
          console.error("📄 Full object string being parsed:");
          console.error(objectString);
        }
      } catch (e) {
        // Ignore
      }
    }
    
    console.error("⚠️ Falling back to hardcoded defaults");
    return getHardcodedDefaults();
  }
}

// Fallback hardcoded defaults in case parsing fails
function getHardcodedDefaults() {
  return {
    // --- Identity ---
    name: "N/A",
    tagline: "N/A",
    role: "N/A",
    subtitle: "N/A",
    quote: "N/A",
    quoteNote: "N/A",
 
    // --- Demographics ---
    age: "N/A",
    gender: "N/A",
    income: "N/A",
    education: "N/A",
    location: "N/A",
    occupation: "N/A",
    family: "N/A",
    spouseOccupation: "N/A",
 
    // --- Consumer details ---
    consumerType: "N/A",
    consumerGeneration: "N/A",
    consumerAge: 0,
    personalityScore: 0,
    
    // --- Profile Image ---
    imageUrl: "",
    imageTransform: { x: 0, y: 0, rotation: 0, zoom: 1 },
    
    favoriteBrands: {
      apparel: "N/A",
      supplement: "N/A",
      fitnessEducation: "N/A",
      shoppingStore: "N/A",
      plexus: "N/A"
    },
 
    // --- Lifestyle & Behaviors (used for quick tags) ---
    characteristics: [
      "N/A",
      "N/A",
      "N/A",
      "N/A"
    ],
 
    // --- Profile Brand Names (displayed in left column) ---
    brand_1: "N/A",
    brand_2: "N/A",
    brand_3: "N/A",
    brand_4: "N/A",
 
    // --- Profile Platform Names (displayed in left column) ---
    platform_1: "N/A",
    platform_2: "N/A",
    platform_3: "N/A",
    platform_4: "N/A",
 
    // --- Persona Content ---
    about: "N/A",
 
    goals: [
      "N/A",
      "N/A",
      "N/A",
      "N/A"
    ],
 
    needs: [
      "N/A",
      "N/A",
      "N/A",
      "N/A"
    ],
 
    painPoints: [
      "N/A",
      "N/A",
      "N/A",
      "N/A"
    ],
 
    // --- Personality Traits (0–10 scale) ---
    traits: {
      valueHunter: 0,
      researcher: 0,
      brandDevoted: 0,
      impulseShopping: 0,
      socialButterfly: 0,
      replenisher: 0,
      mobileShopping: 0,
      ethicalIngredients: 0,
      gifter: 0,
      techSavvy: 0
    },
    
    // --- Trait Insights (editable descriptions) ---
    traitInsights: {
      valueHunter: "N/A",
      researcher: "N/A",
      brandDevoted: "N/A",
      impulseShopping: "N/A",
      socialButterfly: "N/A",
      replenisher: "N/A",
      mobileShopping: "N/A",
      ethicalIngredients: "N/A",
      gifter: "N/A",
      techSavvy: "N/A"
    },
    
    // --- Personality Type Fields (editable, not auto-calculated) ---
    personalityType: "N/A",
    personalityTypeDetails: "N/A",
 
    // --- Customer Experience Metrics ---
    csatTotal: 0,
    csatTooltip: "N/A",
    cesAverage: 1,
    cesTooltip: "N/A",
    npsTotal: 0,
    npsTooltip: "N/A",
 
    // --- Tooltips ---
    cxRequirementsTooltip: "N/A",
    ageTooltip: "N/A",
    genderTooltip: "N/A",
    incomeTooltip: "N/A",
    educationTooltip: "N/A",
    locationTooltip: "N/A",
    occupationTooltip: "N/A",
    familyTooltip: "N/A",
    spouseOccupationTooltip: "N/A",
    ambassadorRankTooltip: "N/A",
    ambassadorRank: "N/A",
    vipTooltip: "N/A",
    previousVIPStatus: "N/A",
    timeTooltip: "N/A",
    potentialBusinessInterest: "N/A",
    revenueTooltip: "N/A",
 
    // --- Revenue Opportunity ---
    revenueOpportunity: "N/A",
    
    // --- Nurture Text ---
    nurtureText: "N/A",
    
    // --- Consumer Habits ---
    consumerHabits: {
      discovery: "N/A",
      purchase: "N/A",
      comparison: "N/A"
    },

    networkBuilding: {
      millennial: "N/A",
      genZ: "N/A",
      genX: "N/A",
      boomer: "N/A"
    }
  };
}