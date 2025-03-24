"use client";

import { useState } from "react";

import { Share2 } from "lucide-react";

interface ShareButtonProps {
  url?: string;
}

export default function ShareButton({ url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    // Get the current URL if none is provided
    const shareUrl = url || window.location.href;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);

      // Reset the copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
    <div className="relative flex items-center gap-3">
      <button
        onClick={handleShare}
        className="flex items-center gap-2"
        aria-label="Share post"
      >
        <Share2 className="size-4" />
        {copied ? (
          <span className="text-sm text-green-600 transition-colors">
            Share
          </span>
        ) : (
          <span className="text-sm">Share</span>
        )}
      </button>

      {copied && (
        <div className="animate-fade-in-out absolute -top-8 left-0 rounded bg-black px-2 py-1 text-xs text-white">
          Copied to clipboard!
        </div>
      )}
    </div>
  );
}
