import React, { useState } from "react";
import { toast } from "sonner";
import { Share2, Check } from "lucide-react";

// Full initial layout template object to prevent App.tsx from crashing on render
export const getInitialPersonaState = () => {
  return {
    name: "Alex Smith",
    tagline: "Seeking seamless integration and clear product experiences.",
    personalityType: "The Pragmatist",
    personalityTypeDetails: "(Reliable / Analytical)",
    about: "An experienced professional focused on maximizing efficiency and utilizing clean, logical workflows in daily digital setups.",
    goals: [
      "Streamline daily operational performance matrices.",
      "Minimize overhead tracking across system modules.",
      "Achieve consistent performance output safely."
    ],
    needs: [
      "Intuitive layouts with immediate documentation access.",
      "Clear indicators showing task completion states.",
      "Reliable interfaces that resist layout breakage."
    ],
    painPoints: [
      "Fragmented software tools that do not communicate.",
      "Vague configuration systems with high friction points.",
      "Excessive onboarding requirements for basic applications."
    ],
    traits: {
      analytical: 20,
      pragmatic: 20,
      patient: 15,
      assertive: 15,
      adaptable: 15
    },
    traitInsights: {
      analytical: "Prefers structural logic over aesthetic flourishes.",
      pragmatic: "Measures design success entirely by utility value.",
      patient: "Willing to troubleshoot structured flows if documentation is clear.",
      assertive: "Quick to abandon systems that mask diagnostic performance.",
      adaptable: "Comfortable adopting clean automation workflows quickly."
    },
    csatTotal: 75,
    csatTooltip: "Measures overall layout sentiment.",
    cesAverage: 80,
    cesTooltip: "Measures task completion friction.",
    npsTotal: 70,
    npsTooltip: "Measures systemic referral probability.",
    income: "$85,000",
    ambassadorRank: "Silver",
    previousVIPStatus: "Active",
    potentialBusinessInterest: "Moderate",
    revenueOpportunity: "Moderate",
    imageUrl: "",
    imageTransform: { x: 0, y: 0, rotation: 0, zoom: 1 },
    nurtureText: "Provide direct diagnostic logs and transparent structural layouts to maximize user retention."
  };
};

export const ShareStateButton: React.FC<{ personaData: any }> = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link.");
    }
  };

  return (
    <button
      className="inline-flex items-center justify-center rounded-md border border-neutral-200 bg-white px-3 py-1 text-xs font-medium h-8 gap-1.5 transition-colors hover:bg-neutral-100 hover:text-neutral-900 shadow-sm cursor-pointer"
      onClick={handleShare}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-green-500" />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Share2 className="h-3.5 w-3.5" />
          <span>Share</span>
        </>
      )}
    </button>
  );
};
