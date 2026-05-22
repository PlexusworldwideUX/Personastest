import React, { useState } from "react";
import { toast } from "sonner";
import { Code, Check, Copy } from "lucide-react";

interface CodeEditorButtonProps {
  codeString: string;
}

export const CodeEditorButton: React.FC<CodeEditorButtonProps> = ({ codeString }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setCopied(true);
      toast.success("Code copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy code.");
    }
  };

  return (
    <button
      className="inline-flex items-center justify-center rounded-md border border-neutral-200 bg-white px-3 py-1 text-xs font-medium h-8 gap-1.5 transition-colors hover:bg-neutral-100 hover:text-neutral-900 shadow-sm cursor-pointer"
      onClick={handleCopy}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-green-500" />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          <span>Copy Code</span>
        </>
      )}
    </button>
  );
};
