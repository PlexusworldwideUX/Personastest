import { Code } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner@2.0.3";
import { parsePersonaCode } from "../utils/personaParser";
import { PERSONA_TEMPLATE } from "../utils/personaTemplate";
import { parsePersonaTemplate } from "../utils/parsePersonaTemplate";

interface CodeEditorButtonProps {
  personaData: any;
  onPersonaUpdate: (updatedPersona: any) => void;
}

// Helper function to strip HTML tags and get plain text
function stripHtml(html: string): string {
  if (!html || html === "N/A") return "N/A";
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "N/A";
}

// Helper to deeply get a value from an object using dot notation
function deepGet(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

// Helper to convert value to JSON string representation
function toJsonString(value: any): string {
  if (value === undefined) return "undefined";
  if (value === null) return "null";
  return JSON.stringify(value);
}

export function CodeEditorButton({ personaData, onPersonaUpdate }: CodeEditorButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [codeText, setCodeText] = useState("");

  const generateCodeString = () => {
    // Start with the template string
    let code = PERSONA_TEMPLATE;
    
    if (!personaData) {
      console.error("No persona data provided to CodeEditorButton");
      return code;
    }
    
    // Helper to safely stringify a value WITHOUT stripping HTML (preserve formatting)
    const safe = (val: any) => {
      try {
        if (val === undefined) return "undefined";
        if (val === null) return "null";
        
        if (typeof val === 'string') {
          // Do NOT strip HTML - preserve bold/italic/underline formatting
          return JSON.stringify(val);
        }
        return JSON.stringify(val);
      } catch (e) {
        console.error("Error stringifying value:", val, e);
        return '"Error"';
      }
    };
    
    // Helper to safely replace a field value in the template
    const replaceField = (fieldName: string, value: any) => {
      // Match patterns like:  fieldName: "value",  or  fieldName: 123,
      const regex = new RegExp(`(\\s+${fieldName}:\\s*)([^,\\n]+)(,?)`, 'g');
      // Use a function to avoid $ being interpreted as replacement pattern
      code = code.replace(regex, (match, p1, p2, p3) => `${p1}${safe(value)}${p3}`);
    };
    
    // Helper to replace array values
    const replaceArray = (fieldName: string, values: any[]) => {
      if (!Array.isArray(values)) return;
      const regex = new RegExp(`(\\s+${fieldName}:\\s*\\[)([^\\]]*)(\\])`, 's');
      const match = code.match(regex);
      if (match) {
        const arrayContent = values.map(item => `\n      ${safe(item)}`).join(',') + '\n  ';
        code = code.replace(regex, (m, p1, p2, p3) => `${p1}${arrayContent}${p3}`);
      }
    };
    
    // Helper to replace nested object values
    const replaceNestedField = (parentField: string, childField: string, value: any) => {
      const regex = new RegExp(`(${parentField}:\\s*\\{[^}]*${childField}:\\s*)([^,\\n]+)(,?)`, 's');
      code = code.replace(regex, (match, p1, p2, p3) => `${p1}${safe(value)}${p3}`);
    };
    
    try {
      // Replace all simple fields from personaData
      replaceField('name', personaData.name);
      replaceField('tagline', personaData.tagline);
      replaceField('quote', personaData.quote);
      replaceField('quoteNote', personaData.quoteNote);
      replaceField('age', personaData.age);
      replaceField('gender', personaData.gender);
      replaceField('income', personaData.income);
      replaceField('education', personaData.education);
      replaceField('location', personaData.location);
      replaceField('occupation', personaData.occupation);
      replaceField('family', personaData.family);
      replaceField('spouseOccupation', personaData.spouseOccupation);
      replaceField('brand_1', personaData.brand_1);
      replaceField('brand_2', personaData.brand_2);
      replaceField('brand_3', personaData.brand_3);
      replaceField('brand_4', personaData.brand_4);
      replaceField('platform_1', personaData.platform_1);
      replaceField('platform_2', personaData.platform_2);
      replaceField('platform_3', personaData.platform_3);
      replaceField('platform_4', personaData.platform_4);
      replaceField('about', personaData.about);
      replaceField('csatTotal', personaData.csatTotal);
      replaceField('csatTooltip', personaData.csatTooltip);
      replaceField('cesAverage', personaData.cesAverage);
      replaceField('cesTooltip', personaData.cesTooltip);
      replaceField('npsTotal', personaData.npsTotal);
      replaceField('npsTooltip', personaData.npsTooltip);
      replaceField('cxRequirementsTooltip', personaData.cxRequirementsTooltip);
      replaceField('ageTooltip', personaData.ageTooltip);
      replaceField('genderTooltip', personaData.genderTooltip);
      replaceField('incomeTooltip', personaData.incomeTooltip);
      replaceField('educationTooltip', personaData.educationTooltip);
      replaceField('locationTooltip', personaData.locationTooltip);
      replaceField('occupationTooltip', personaData.occupationTooltip);
      replaceField('familyTooltip', personaData.familyTooltip);
      replaceField('spouseOccupationTooltip', personaData.spouseOccupationTooltip);
      replaceField('ambassadorRankTooltip', personaData.ambassadorRankTooltip);
      replaceField('ambassadorRank', personaData.ambassadorRank);
      replaceField('vipTooltip', personaData.vipTooltip);
      replaceField('previousVIPStatus', personaData.previousVIPStatus);
      replaceField('timeTooltip', personaData.timeTooltip);
      replaceField('potentialBusinessInterest', personaData.potentialBusinessInterest);
      replaceField('revenueTooltip', personaData.revenueTooltip);
      replaceField('revenueOpportunity', personaData.revenueOpportunity);
      replaceField('nurtureText', personaData.nurtureText);
      replaceField('personalityType', personaData.personalityType);
      replaceField('personalityTypeDetails', personaData.personalityTypeDetails);
      replaceField('engagementScore', personaData.engagementScore);
      
      // Replace arrays
      if (personaData.characteristics) replaceArray('characteristics', personaData.characteristics);
      if (personaData.goals) replaceArray('goals', personaData.goals);
      if (personaData.needs) replaceArray('needs', personaData.needs);
      if (personaData.painPoints) replaceArray('painPoints', personaData.painPoints);
      
      // Replace nested trait values
      if (personaData.traits) {
        replaceNestedField('traits', 'valueHunter', personaData.traits?.valueHunter);
        replaceNestedField('traits', 'researcher', personaData.traits?.researcher);
        replaceNestedField('traits', 'brandDevoted', personaData.traits?.brandDevoted);
        replaceNestedField('traits', 'impulseShopping', personaData.traits?.impulseShopping);
        replaceNestedField('traits', 'socialButterfly', personaData.traits?.socialButterfly);
        replaceNestedField('traits', 'replenisher', personaData.traits?.replenisher);
        replaceNestedField('traits', 'mobileShopping', personaData.traits?.mobileShopping);
        replaceNestedField('traits', 'ethicalIngredients', personaData.traits?.ethicalIngredients);
        replaceNestedField('traits', 'gifter', personaData.traits?.gifter);
        replaceNestedField('traits', 'techSavvy', personaData.traits?.techSavvy);
      }
      
      // Replace nested traitInsights values
      if (personaData.traitInsights) {
        replaceNestedField('traitInsights', 'valueHunter', personaData.traitInsights?.valueHunter);
        replaceNestedField('traitInsights', 'researcher', personaData.traitInsights?.researcher);
        replaceNestedField('traitInsights', 'brandDevoted', personaData.traitInsights?.brandDevoted);
        replaceNestedField('traitInsights', 'impulseShopping', personaData.traitInsights?.impulseShopping);
        replaceNestedField('traitInsights', 'socialButterfly', personaData.traitInsights?.socialButterfly);
        replaceNestedField('traitInsights', 'replenisher', personaData.traitInsights?.replenisher);
        replaceNestedField('traitInsights', 'mobileShopping', personaData.traitInsights?.mobileShopping);
        replaceNestedField('traitInsights', 'ethicalIngredients', personaData.traitInsights?.ethicalIngredients);
        replaceNestedField('traitInsights', 'gifter', personaData.traitInsights?.gifter);
        replaceNestedField('traitInsights', 'techSavvy', personaData.traitInsights?.techSavvy);
      }
    } catch (err) {
      console.error("Error generating code string:", err);
      // In case of error, return the template so the user at least sees something
      return code;
    }
    
    return code;
  };

  const handleOpen = (open: boolean) => {
    if (open) {
      try {
        setCodeText(generateCodeString());
      } catch (err) {
        console.error("Critical error in generateCodeString:", err);
        setCodeText(PERSONA_TEMPLATE);
        toast.error("Error generating code view. Showing default template.");
      }
    }
    setIsOpen(open);
  };

  const handleApply = () => {
    const result = parsePersonaCode(codeText);
    
    if (!result.success) {
      toast.error(result.error || "Failed to parse persona data");
      return;
    }

    console.log("Calling onPersonaUpdate with updated persona");
    onPersonaUpdate(result.data);
    setIsOpen(false);
    toast.success("Persona data updated successfully!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button
          className="fixed top-48 right-8 z-50 rounded-full w-14 h-14 shadow-lg bg-[#0066cc] hover:bg-[#0052a3] text-white"
          title="Edit Persona Code"
        >
          <Code className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit Persona Data</DialogTitle>
          <DialogDescription>
            Edit the persona data as code. Changes will be applied when you click "Apply Changes".
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-auto">
          <Textarea
            value={codeText}
            onChange={(e) => setCodeText(e.target.value)}
            className="font-mono text-sm min-h-[500px] resize-none"
            spellCheck={false}
          />
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleApply} className="bg-[#e30646] hover:bg-[#c00538]">
            Apply Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}