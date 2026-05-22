import { useRef, useEffect } from 'react';

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  multiline?: boolean;
  maxLength?: number;
  style?: React.CSSProperties;
}

export function EditableText({ value, onChange, className = '', multiline = false, maxLength, style }: EditableTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isUserInput = useRef(false);

  // Set initial content only once on mount
  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value;
    }
  }, []);

  // Update content only when value changes externally (not from user typing)
  useEffect(() => {
    if (ref.current && !isUserInput.current && ref.current.innerHTML !== value) {
      const selection = window.getSelection();
      const cursorPosition = selection?.anchorOffset || 0;
      
      ref.current.innerHTML = value;
      
      // Restore cursor position if element is focused
      if (document.activeElement === ref.current && ref.current.firstChild) {
        try {
          const range = document.createRange();
          range.setStart(ref.current.firstChild, Math.min(cursorPosition, value.length));
          range.collapse(true);
          selection?.removeAllRanges();
          selection?.addRange(range);
        } catch (e) {
          // Ignore errors
        }
      }
    }
    isUserInput.current = false;
  }, [value]);

  const handleInput = (e: React.FormEvent<HTMLSpanElement>) => {
    isUserInput.current = true;
    let newValue = e.currentTarget.innerHTML || '';
    
    // Enforce maxLength if specified (check text content length, not HTML)
    const textContent = e.currentTarget.textContent || '';
    if (maxLength && textContent.length > maxLength) {
      const truncatedText = textContent.slice(0, maxLength);
      e.currentTarget.textContent = truncatedText;
      newValue = e.currentTarget.innerHTML;
      
      // Move cursor to end
      const range = document.createRange();
      const selection = window.getSelection();
      if (e.currentTarget.firstChild) {
        range.setStart(e.currentTarget.firstChild, truncatedText.length);
        range.collapse(true);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
    
    onChange(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const modifierKey = isMac ? e.metaKey : e.ctrlKey;

    // Check for Cmd/Ctrl + B (Bold)
    if (modifierKey && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      document.execCommand('bold', false);
      // Trigger onChange to save the new HTML
      if (ref.current) {
        onChange(ref.current.innerHTML);
      }
      return;
    }

    // Check for Cmd/Ctrl + I (Italic)
    if (modifierKey && e.key.toLowerCase() === 'i') {
      e.preventDefault();
      document.execCommand('italic', false);
      // Trigger onChange to save the new HTML
      if (ref.current) {
        onChange(ref.current.innerHTML);
      }
      return;
    }

    // Check for Cmd/Ctrl + U (Underline)
    if (modifierKey && e.key.toLowerCase() === 'u') {
      e.preventDefault();
      document.execCommand('underline', false);
      // Trigger onChange to save the new HTML
      if (ref.current) {
        onChange(ref.current.innerHTML);
      }
      return;
    }
  };

  return (
    <span
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      className={`${className} outline-none`}
      style={{ minWidth: '20px', ...style }}
      {...(maxLength && { 'data-maxlength': maxLength })}
    />
  );
}