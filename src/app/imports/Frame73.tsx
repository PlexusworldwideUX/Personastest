import svgPaths from "./svg-5m5h58qode";
import { useState, useRef, useEffect } from "react";

function Ruby() {
  return (
    <div className="aspect-[20/15.0633] content-stretch flex flex-col gap-[10px] items-start overflow-clip relative shrink-0 w-72px" data-name="Ruby">
      <div className="aspect-[20/15.0633] relative shrink-0 w-88px" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
          <path d={svgPaths.p2285e000} fill="var(--fill-0, #E30646)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function AmbRuby() {
  return (
    <div className="aspect-[20/20] basis-0 content-stretch flex flex-col gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0" data-name="AMB_Ruby">
      <Ruby />
    </div>
  );
}

function IconAmbassadorLevels() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-center justify-center px-0 py-[2px] relative shrink-0 size-[24px]" data-name="icon / ambassador levels">
      <AmbRuby />
    </div>
  );
}

function LeadingElement() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Leading element">
      <IconAmbassadorLevels />
    </div>
  );
}

function Overline() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0" data-name="🟢 Overline">
      <p className="css-1u11im font-['DM_Sans:Light',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[#111111] text-[16px] text-nowrap whitespace-pre">Starting Potential</p>
    </div>
  );
}

function Headline({ rank, onRankChange }: { rank: string; onRankChange?: (newRank: string) => void }) {
  const pRef = useRef<HTMLParagraphElement>(null);

  const handleBlur = () => {
    if (pRef.current && onRankChange) {
      const newRank = pRef.current.textContent || "N/A";
      onRankChange(newRank);
    }
  };

  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0" data-name="🟢 Headline">
      <p 
        ref={pRef}
        className="css-1u11im font-['DM_Sans:Medium',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[#111111] text-[16px] text-nowrap whitespace-pre outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 rounded px-1 cursor-text hover:bg-gray-100"
        contentEditable
        suppressContentEditableWarning
        onBlur={handleBlur}
      >
        {rank}
      </p>
    </div>
  );
}

function Content({ rank, onRankChange }: { rank: string; onRankChange?: (newRank: string) => void }) {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0" data-name="Content">
      <Overline />
      <Headline rank={rank} onRankChange={onRankChange} />
    </div>
  );
}

function StateLayer({ rank, onHoverChange, onRankChange }: { rank: string; onHoverChange?: (isHovering: boolean, element: HTMLDivElement | null) => void; onRankChange?: (newRank: string) => void }) {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (onHoverChange && divRef.current) {
      onHoverChange(true, divRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (onHoverChange) {
      onHoverChange(false, null);
    }
  };

  return (
    <div 
      ref={divRef}
      className="basis-0 box-border content-stretch flex gap-[16px] grow items-center min-h-px min-w-px pl-[16px] pr-0 py-[8px] relative shrink-0" 
      data-name="state-layer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <LeadingElement />
      <Content rank={rank} onRankChange={onRankChange} />
    </div>
  );
}

function MenuListItem({ ambassadorRank, onHoverChange, onRankChange }: { ambassadorRank: string; onHoverChange?: (isHovering: boolean, element: HTMLDivElement | null) => void; onRankChange?: (newRank: string) => void }) {
  return (
    <div className="content-stretch flex flex-col h-[40px] items-center relative rounded-[6px] shrink-0" data-name="Menu List Item">
      <StateLayer rank={ambassadorRank} onHoverChange={onHoverChange} onRankChange={onRankChange} />
    </div>
  );
}

function BookmarkStarFill() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="bookmark-star-fill">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="bookmark-star-fill">
          <path d={svgPaths.p1fc6f600} fill="var(--fill-0, #E30646)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function LeadingElement1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Leading element">
      <BookmarkStarFill />
    </div>
  );
}

function Overline1() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0" data-name="🟢 Overline">
      <p className="css-1u11im font-['DM_Sans:Light',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[#111111] text-[16px] text-nowrap whitespace-pre">Brand Awareness</p>
    </div>
  );
}

function Headline1({ status, onStatusChange }: { status: string; onStatusChange?: (newStatus: string) => void }) {
  const pRef = useRef<HTMLParagraphElement>(null);

  const handleBlur = () => {
    if (pRef.current && onStatusChange) {
      const newStatus = pRef.current.textContent || "N/A";
      onStatusChange(newStatus);
    }
  };

  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0" data-name="🟢 Headline">
      <p 
        ref={pRef}
        className="css-1u11im font-['DM_Sans:Medium',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[#111111] text-[16px] text-nowrap whitespace-pre outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 rounded px-1 cursor-text hover:bg-gray-100"
        contentEditable
        suppressContentEditableWarning
        onBlur={handleBlur}
      >
        {status}
      </p>
    </div>
  );
}

function Content1({ status, onStatusChange }: { status: string; onStatusChange?: (newStatus: string) => void }) {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0" data-name="Content">
      <Overline1 />
      <Headline1 status={status} onStatusChange={onStatusChange} />
    </div>
  );
}

function StateLayer1({ status, onHoverChange, onStatusChange }: { status: string; onHoverChange?: (isHovering: boolean, element: HTMLDivElement | null) => void; onStatusChange?: (newStatus: string) => void }) {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (onHoverChange && divRef.current) {
      onHoverChange(true, divRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (onHoverChange) {
      onHoverChange(false, null);
    }
  };

  return (
    <div 
      ref={divRef}
      className="basis-0 box-border content-stretch flex gap-[16px] grow items-center min-h-px min-w-px pl-[16px] pr-0 py-[8px] relative shrink-0" 
      data-name="state-layer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <LeadingElement1 />
      <Content1 status={status} onStatusChange={onStatusChange} />
    </div>
  );
}

function MenuListItem1({ previousVIPStatus, onHoverChange, onStatusChange }: { previousVIPStatus: string; onHoverChange?: (isHovering: boolean, element: HTMLDivElement | null) => void; onStatusChange?: (newStatus: string) => void }) {
  return (
    <div className="content-stretch flex flex-col h-[40px] items-center relative rounded-[6px] shrink-0" data-name="Menu List Item">
      <StateLayer1 status={previousVIPStatus} onHoverChange={onHoverChange} onStatusChange={onStatusChange} />
    </div>
  );
}

function PlexusX() {
  return (
    <div className="aspect-[32/35] content-stretch flex h-full items-center relative shrink-0" data-name="Plexus X">
      <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0" data-name="Fill-15">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 23">
          <path clipRule="evenodd" d={svgPaths.p83ee700} fill="var(--fill-0, #E30646)" fillRule="evenodd" id="Fill-15" />
        </svg>
      </div>
      <div className="h-[3.423px] relative shrink-0 w-[3.493px]" data-name="Fill-16">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
          <path clipRule="evenodd" d={svgPaths.p32ac5b80} fill="var(--fill-0, #E30646)" fillRule="evenodd" id="Fill-16" />
        </svg>
      </div>
    </div>
  );
}

function OnePlexusLogo() {
  return (
    <div className="box-border content-stretch flex gap-[25px] h-[26.25px] items-center px-0 py-[2px] relative shrink-0 w-[24px]" data-name="One Plexus Logo">
      <PlexusX />
    </div>
  );
}

function LeadingElement2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Leading element">
      <OnePlexusLogo />
    </div>
  );
}

function LeadingElement2Static() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Leading element">
      <OnePlexusLogo />
    </div>
  );
}

function DollarSignIcon() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[24px]" data-name="Dollar Sign Icon">
      <p className="css-1u11im font-['DM_Sans:Medium',_sans-serif] leading-[normal] not-italic text-[#E30646] text-[16px] text-nowrap whitespace-pre">$$$</p>
    </div>
  );
}

function LeadingElement2StaticRevenue() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Leading element">
      <DollarSignIcon />
    </div>
  );
}

function Overline2() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0" data-name="🟢 Overline">
      <p className="css-1u11im font-['DM_Sans:Light',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[#111111] text-[16px] text-nowrap whitespace-pre">Entrepreneurial Interest</p>
    </div>
  );
}

function Headline2({ timePeriod, onTimePeriodChange }: { timePeriod: string; onTimePeriodChange?: (newTimePeriod: string) => void }) {
  const pRef = useRef<HTMLParagraphElement>(null);

  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0" data-name="🟢 Headline">
      <p 
        ref={pRef}
        className="css-1u11im font-['DM_Sans:Medium',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[#111111] text-[16px] cursor-text px-1 rounded hover:bg-gray-100"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          const newText = e.currentTarget.textContent || 'N/A';
          if (newText === '') {
            e.currentTarget.textContent = 'N/A';
          }
          if (onTimePeriodChange) {
            onTimePeriodChange(newText === '' ? 'N/A' : newText);
          }
        }}
      >
        {timePeriod}
      </p>
    </div>
  );
}

function Headline2Static({ timePeriod, income, onRevenueChange }: { timePeriod: string; income?: string; onRevenueChange?: (newRevenue: string) => void }) {
  const pRef = useRef<HTMLParagraphElement>(null);

  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0" data-name="🟢 Headline">
      <p 
        ref={pRef}
        className="css-1u11im font-['DM_Sans:Medium',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[#111111] text-[16px] text-nowrap whitespace-pre outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 rounded px-1 cursor-text hover:bg-gray-100"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          const newText = e.currentTarget.textContent || 'N/A';
          if (newText === '') {
            e.currentTarget.textContent = 'N/A';
          }
          if (onRevenueChange) {
            onRevenueChange(newText === '' ? 'N/A' : newText);
          }
        }}
      >
        {timePeriod}
      </p>
    </div>
  );
}

function Content2({ timePeriod, onTimePeriodChange }: { timePeriod: string; onTimePeriodChange?: (newTimePeriod: string) => void }) {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="Content">
      <Overline2 />
      <Headline2 timePeriod={timePeriod} onTimePeriodChange={onTimePeriodChange} />
    </div>
  );
}

function Content2Static({ timePeriod }: { timePeriod: string }) {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="Content">
      <Overline2 />
      <Headline2Static timePeriod="1-12 Months" />
    </div>
  );
}

function Overline2StaticRevenue() {
  return (
    <div className="flex gap-[10px] items-center justify-center relative shrink-0" data-name="🟢 Overline">
      <p className="font-['DM_Sans:Light',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[#111111] text-[16px] text-nowrap whitespace-pre">Desired 30 Day Income</p>
    </div>
  );
}

function Content2StaticRevenue({ revenueText, income, onRevenueChange }: { revenueText: string; income?: string; onRevenueChange?: (newRevenue: string) => void }) {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="Content">
      <Overline2StaticRevenue />
      <Headline2Static timePeriod={revenueText} income={income} onRevenueChange={onRevenueChange} />
    </div>
  );
}

function StateLayer2({ timePeriod, onHoverChange, onTimePeriodChange }: { timePeriod: string; onHoverChange?: (isHovering: boolean, element: HTMLDivElement | null) => void; onTimePeriodChange?: (newTimePeriod: string) => void }) {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (onHoverChange && divRef.current) {
      onHoverChange(true, divRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (onHoverChange) {
      onHoverChange(false, null);
    }
  };

  return (
    <div 
      ref={divRef}
      className="basis-0 box-border content-stretch flex gap-[16px] grow items-center min-h-px min-w-px pl-[16px] pr-0 py-[8px] relative shrink-0" 
      data-name="state-layer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <LeadingElement2 />
      <Content2 timePeriod={timePeriod} onTimePeriodChange={onTimePeriodChange} />
    </div>
  );
}

function StateLayer2Static({ timePeriod }: { timePeriod: string }) {
  return (
    <div className="basis-0 box-border content-stretch flex gap-[16px] grow items-center min-h-px min-w-px pl-[16px] pr-0 py-[8px] relative shrink-0 pointer-events-none" data-name="state-layer">
      <LeadingElement2Static />
      <Content2Static timePeriod="1-12 Months" />
    </div>
  );
}

function StateLayer2StaticRevenue({ revenueText, onHoverChange, income, onRevenueChange }: { revenueText: string; onHoverChange?: (isHovering: boolean, element: HTMLDivElement | null) => void; income?: string; onRevenueChange?: (newRevenue: string) => void }) {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (onHoverChange && divRef.current) {
      onHoverChange(true, divRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (onHoverChange) {
      onHoverChange(false, null);
    }
  };

  return (
    <div 
      ref={divRef}
      className="basis-0 box-border content-stretch flex gap-[16px] grow items-center min-h-px min-w-px pl-[16px] pr-0 py-[8px] relative shrink-0" 
      data-name="state-layer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <LeadingElement2StaticRevenue />
      <Content2StaticRevenue revenueText={revenueText} income={income} onRevenueChange={onRevenueChange} />
    </div>
  );
}

function MenuListItem2({ timeWithPlexus, onHoverChange, onTimePeriodChange }: { timeWithPlexus: string; onHoverChange?: (isHovering: boolean, element: HTMLDivElement | null) => void; onTimePeriodChange?: (newTimePeriod: string) => void }) {
  return (
    <div className="content-stretch flex flex-col h-[40px] items-center relative rounded-[6px] shrink-0" data-name="Menu List Item">
      <StateLayer2 timePeriod={timeWithPlexus} onHoverChange={onHoverChange} onTimePeriodChange={onTimePeriodChange} />
    </div>
  );
}

function MenuListItem2Static({ timeWithPlexus }: { timeWithPlexus: string }) {
  return (
    <div className="content-stretch flex flex-col h-[40px] items-center relative rounded-[6px] shrink-0" data-name="Menu List Item">
      <StateLayer2StaticRevenue />
    </div>
  );
}

function MenuListItem2StaticRevenue({ revenueText, onHoverChange, income, onRevenueChange }: { revenueText: string; onHoverChange?: (isHovering: boolean, element: HTMLDivElement | null) => void; income?: string; onRevenueChange?: (newRevenue: string) => void }) {
  return (
    <div className="content-stretch flex flex-col h-[40px] items-center relative rounded-[6px] shrink-0" data-name="Menu List Item">
      <StateLayer2StaticRevenue revenueText={revenueText} onHoverChange={onHoverChange} income={income} onRevenueChange={onRevenueChange} />
    </div>
  );
}

interface Frame73Props {
  personalityScore?: number;
  income?: string;
  ambassadorRank?: string;
  previousVIPStatus?: string;
  potentialBusinessInterest?: string;
  revenueOpportunity?: string;
  onHoverChange?: (isHovering: boolean, element: HTMLDivElement | null) => void;
  onVIPHoverChange?: (isHovering: boolean, element: HTMLDivElement | null) => void;
  onTimeHoverChange?: (isHovering: boolean, element: HTMLDivElement | null) => void;
  onRevenueHoverChange?: (isHovering: boolean, element: HTMLDivElement | null) => void;
  onRankChange?: (newRank: string) => void;
  onVIPStatusChange?: (newStatus: string) => void;
  onBusinessInterestChange?: (newInterest: string) => void;
  onRevenueChange?: (newRevenue: string) => void;
}

export default function Frame73({ personalityScore = 0, income = "N/A", ambassadorRank: propAmbassadorRank, previousVIPStatus: propPreviousVIPStatus, potentialBusinessInterest: propPotentialBusinessInterest, revenueOpportunity: propRevenueOpportunity, onHoverChange, onVIPHoverChange, onTimeHoverChange, onRevenueHoverChange, onRankChange, onVIPStatusChange, onBusinessInterestChange, onRevenueChange }: Frame73Props) {
  // Calculate ambassador rank based on personality score
  const getAmbassadorRank = (score: number): string => {
    if (score < 35) return "Retail";
    if (score >= 35 && score <= 75) return "VIP";
    if (score > 75) return "Ambassador";
    //return "N/A";
  };

  // Calculate Previous VIP status based on personality score
  const getPreviousVIPStatus = (score: number): string => {
    if (score < 35) return "Self Discovery";
    if (score >= 35 && score <= 75) return "Through my Network";
    if (score > 75) return "Through ambassador";
    // If score >= 35 and score >=55, do a coin flip
    //return Math.random() < 0.5 ? "Current" : "Previous";
  };

  // Calculate Potential Business Interest based on income demographic
  const potentialBusinessInterest = (incomeStr: string): string => {
    // Parse income string to extract numeric value
    // Income formats: "$35,000 - $55,000", "$55,000 - $85,000", "N/A", etc.
    
    if (!incomeStr || incomeStr === "N/A") return "N/A";
    
    // Extract the lower bound of the income range
    const match = incomeStr.match(/\$?([\d,]+)/);
    if (!match) return "N/A";
    
    // Remove commas and convert to number
    const incomeValue = parseInt(match[1].replace(/,/g, ''), 10);
    
    if (isNaN(incomeValue)) return "N/A";
    
    // Apply the income-based logic
    if (incomeValue < 20000) return "Not likely";
    if (incomeValue >= 20000 && incomeValue <= 34000) return "May consider";
    if (incomeValue >= 35000 && incomeValue <= 49000) return "Considering";
    if (incomeValue >= 50000 && incomeValue <= 74000) return "Likely";
    if (incomeValue >= 75000 && incomeValue <= 99000) return "Very Likely";
    if (incomeValue >= 100000) return "Actively looking";
    
    return "N/A";
  };

  // Calculate Revenue text based on personality score (engagement score)
  const getRevenueText = (score: number): string => {
    if (score >= 0 && score <= 34) return "Unaware ~$90";
    if (score >= 35 && score <= 74) return "VIP ~$110";
    if (score >= 75 && score <= 100) return "AMB ~$140";
    return "Unaware ~$90";
  };

  // Use prop value if provided, otherwise calculate from personality score
  const ambassadorRank = propAmbassadorRank || getAmbassadorRank(personalityScore);
  const previousVIPStatus = propPreviousVIPStatus || getPreviousVIPStatus(personalityScore);
  const businessInterest = propPotentialBusinessInterest || potentialBusinessInterest(income);
  const revenueText = propRevenueOpportunity || getRevenueText(personalityScore);

  return (
    <div className="content-stretch flex flex-col items-start justify-end relative size-full border-l border-[#606060] p-[16px] gap-[16px]">
      <MenuListItem ambassadorRank={ambassadorRank} onHoverChange={onHoverChange} onRankChange={onRankChange} />
      <MenuListItem1 previousVIPStatus={previousVIPStatus} onHoverChange={onVIPHoverChange} onStatusChange={onVIPStatusChange} />
      <MenuListItem2 timeWithPlexus={businessInterest} onHoverChange={onTimeHoverChange} onTimePeriodChange={onBusinessInterestChange} />
      <MenuListItem2StaticRevenue revenueText={revenueText} onHoverChange={onRevenueHoverChange} income={income} onRevenueChange={onRevenueChange} />
    </div>
  );
}