import { Share2 } from "lucide-react";
import { toast } from "sonner";
import pako from "pako";
import { getDefaultPersonaFromTemplate } from "../utils/parsePersonaTemplate";

interface ShareStateButtonProps {
  personaData: any;
}

export function ShareStateButton({ personaData }: ShareStateButtonProps) {
  const generateShareableLink = () => {
    try {
      // Share only persona data (tooltips are now part of personaData)
      const shareableState = {
        persona: personaData
      };
      
      console.log('State being shared:', shareableState);
      const jsonString = JSON.stringify(shareableState);
      console.log('JSON length:', jsonString.length);
      
      // 2. COMPRESS the data using pako (makes it smaller)
      const compressed = pako.deflate(jsonString, { level: 9 });
      
      // 3. CONVERT to base64 (text format)
      const base64 = btoa(String.fromCharCode.apply(null, Array.from(compressed)));
      
      // 4. MAKE IT URL-SAFE (replace special characters)
      const urlSafe = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
      
      console.log('Compressed length:', urlSafe.length);
      
      // 5. BUILD the shareable URL with ?share= parameter
      const shareableUrl = `${window.location.origin}${window.location.pathname}?share=${urlSafe}`;
      console.log('Full URL:', shareableUrl);
      
      // 6. COPY to clipboard
      navigator.clipboard.writeText(shareableUrl).then(() => {
        toast.success('Shareable link copied to clipboard!', {
          description: `Persona: ${personaData.name || 'N/A'}`,
        });
      }).catch((err) => {
        console.error('Clipboard error:', err);
        toast.error('Failed to copy link to clipboard');
      });
    } catch (err) {
      console.error('Error generating share link:', err);
      toast.error('Failed to generate shareable link');
    }
  };

  return (
    <button
      onClick={() => {
        generateShareableLink();
        // Open TinyURL in a new tab after copying link to clipboard
        setTimeout(() => {
          window.open('https://tinyurl.com/', '_blank');
        }, 100);
      }}
      className="fixed top-[264px] right-8 z-50 size-14 rounded-full bg-red-500 hover:bg-red-600 active:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
      title="Share Persona (Copy URL)"
    >
      <Share2 className="size-6" />
      <span className="absolute right-full mr-3 px-3 py-1.5 bg-black/90 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Share Persona
      </span>
    </button>
  );
}

// Utility function to restore state from URL ?share= parameter
export function restoreStateFromURL(): any | null {
  try {
    console.log("=== Starting URL state restoration ===");
    const urlParams = new URLSearchParams(window.location.search);
    const shareParam = urlParams.get('share');
    
    console.log("Share parameter:", shareParam ? "Found" : "Not found");
    
    if (!shareParam) {
      console.log("No share parameter found");
      return null;
    }
    
    console.log("Compressed data length:", shareParam.length);
    
    // 1. REVERSE URL-SAFE encoding
    let base64 = shareParam.replace(/-/g, '+').replace(/_/g, '/');
    // Add back padding if needed
    while (base64.length % 4) {
      base64 += '=';
    }
    
    // 2. CONVERT from base64
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    // 3. DECOMPRESS using pako
    const decompressed = pako.inflate(bytes, { to: 'string' });
    console.log("Decompressed data:", decompressed ? "SUCCESS" : "FAILED");
    
    if (!decompressed) {
      console.error("Failed to decompress state");
      return null;
    }
    
    // 4. PARSE JSON
    const shareableState = JSON.parse(decompressed);
    console.log("Successfully restored state from URL. Name:", shareableState.persona.name);
    return shareableState;
  } catch (error) {
    console.error("Failed to restore state from URL:", error);
    return null;
  }
}

// Function to get initial state - either from URL or default
export function getInitialPersonaState() {
  console.log("=== Getting initial persona state ===");
  const restoredState = restoreStateFromURL();
  
  if (restoredState) {
    console.log("Using restored state from URL");
    // Show toast after a short delay to ensure toast system is ready
    setTimeout(() => {
      toast.success("Persona loaded from URL!", {
        description: `Loaded: ${restoredState.persona.name || "Unknown"}`,
      });
    }, 500);
    return restoredState.persona;
  }
  
  console.log("Using default state from template");
  // Get default state from the shared PERSONA_TEMPLATE
  return getDefaultPersonaFromTemplate();
}

// Function to get initial tooltip state - either from URL or empty
export function getInitialTooltipState(): Record<string, string> {
  console.log("=== Getting initial tooltip state ===");
  const restoredState = restoreStateFromURL();
  
  if (restoredState && restoredState.tooltips) {
    console.log("Using restored tooltips from URL");
    console.log("Number of edited tooltips:", Object.keys(restoredState.tooltips).length);
    return restoredState.tooltips;
  }
  
  console.log("Using empty tooltip state");
  return {};
}
