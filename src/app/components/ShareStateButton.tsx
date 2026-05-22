import React, { useState } from "react";
import { toast } from "sonner";
import { Share2, Check } from "lucide-react";

export const ShareStateButton: React.FC = () => {
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
