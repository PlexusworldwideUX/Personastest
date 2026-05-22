// PERSONA DATA TEMPLATE
// =====================
// This is the SINGLE SOURCE OF TRUTH for the default persona structure.
//
// WHAT USES THIS TEMPLATE:
// 1. App's initial state on load (all fields start with these default values)
// 2. Blue FAB code editor dialog (shows current values in this format)
// 3. Green FAB LLM instructions (includes this template in prompts)
//
// HOW TO EDIT:
// - Manually edit any values in this template (e.g., change "N/A" to a different default)
// - Add new fields following the same format
// - Remove fields you don't need
// - Changes will automatically flow through to all parts of the app on reload
//
// IMPORTANT: Keep the format as "const [personaData, setPersonaData] = useState({ ... });"

export const PERSONA_TEMPLATE = `const [personaData, setPersonaData] = useState({
  // Identity
  name: "N/A",
  tagline: "N/A",
  quote: "N/A",
  quoteNote: "N/A",

  // Demographics
  age: "N/A",
  gender: "N/A",
  income: "N/A",
  education: "N/A",
  location: "N/A",
  occupation: "N/A",
  family: "N/A",
  spouseOccupation: "N/A",

  // Characteristics (4 tags)
  characteristics: [
      "N/A",
      "N/A",
      "N/A",
      "N/A"
  ],

  // Brand Pills (brand_1, brand_2, brand_3, brand_4 - generic and editable)
  brand_1: "N/A",
  brand_2: "N/A",
  brand_3: "N/A",
  brand_4: "N/A",

  // Platform Pills (platform_1, platform_2, platform_3, platform_4 - generic and editable)
  platform_1: "N/A",
  platform_2: "N/A",
  platform_3: "N/A",
  platform_4: "N/A",

  // Narrative
  about: "N/A",

  // Lists
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

  // Survey Scores
  csatTotal: 0,      // 0-100
  csatTooltip: "N/A",
  cesAverage: 1,      // 1-7
  cesTooltip: "N/A",
  npsTotal: 0,       // -100 to 100
  npsTooltip: "N/A",

  // Tooltips
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

  // Revenue Opportunity
  revenueOpportunity: "N/A",

  // Nurture Text
  nurtureText: "N/A",

  // Personality Traits (0-10 each)
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

  // Trait Insights (editable descriptions shown in code editor)
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

  // Personality Type Fields (editable, not auto-calculated from slider score)
  personalityType: "N/A",
  personalityTypeDetails: "N/A",

  engagementScore: undefined
});`;