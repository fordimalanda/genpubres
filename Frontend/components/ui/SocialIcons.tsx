import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

export function IconX({ className, size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function IconLinkedIn({ className, size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.222 0h.003z" />
    </svg>
  );
}

export function IconFacebook({ className, size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function IconInstagram({ className, size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function IconThreads({ className, size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.26 18.304 1.5 15.426 1.5 11.968c0-3.664.846-6.666 2.515-8.921C5.748.718 8.653 0 12.285 0h.018c3.543.024 6.402.766 8.5 2.204 2.158 1.48 3.32 3.619 3.553 6.541l-2.483.197c-.378-4.227-3.649-6.495-9.569-6.501-5.698 0-8.922 3.738-8.922 10.222 0 6.643 3.316 10.428 9.073 10.428 3.864 0 6.305-1.42 7.257-4.22l-2.146-.665c-.687 1.944-2.316 2.766-5.111 2.766-3.844 0-5.833-2.378-5.912-7.067h13.256c.105-.724.161-1.472.161-2.234 0-2.853-.787-5.179-2.274-6.726C16.892 3.376 14.807 2.5 12.22 2.5c-3.153 0-5.719 1.144-7.42 3.308-1.748 2.222-2.635 5.253-2.635 8.999 0 7.824 4.195 12.016 10.02 12.016 4.316 0 7.49-1.97 8.937-5.548l2.256.912c-1.802 4.457-5.743 6.945-11.202 6.945z" />
    </svg>
  );
}

export function IconTikTok({ className, size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

export function IconYouTube({ className, size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function IconSnapchat({ className, size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M12.001 0c-4.498 0-7.85 3.256-7.85 7.42 0 .91.248 2.052.57 2.875.097.247.168.497.042.723-.118.212-.375.32-.619.387-.714.195-1.554.493-2.036 1.157-.466.643-.377 1.488.203 1.956.76.613 1.77.784 2.705.908.188.025.326.15.352.337.07.504.28 1.458.796 2.083.563.682 1.373.918 2.302.918.494 0 1.054-.08 1.62-.234.341-.093.689.103.82.434.332.84 1.042 1.77 2.095 1.77 1.054 0 1.764-.93 2.095-1.77.13-.33.48-.527.82-.434.567.154 1.127.234 1.621.234.93 0 1.74-.236 2.303-.918.515-.625.725-1.579.795-2.083.026-.187.164-.312.352-.337.935-.124 1.945-.295 2.705-.908.58-.468.67-1.313.203-1.956-.482-.664-1.322-.962-2.036-1.157-.244-.067-.5-.175-.618-.387-.126-.226-.056-.476.042-.723.322-.823.57-1.965.57-2.875 0-4.164-3.352-7.42-7.85-7.42z" />
    </svg>
  );
}

export function IconDevTo({ className, size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H5.16v4.36h1.41c.4 0 .69-.08.87-.24.18-.16.27-.43.27-.82v-2.25c0-.39-.1-.66-.29-.82zm-2.26.47h1.41c.21 0 .34.03.4.08.06.05.09.16.09.33v2.25c0 .17-.03.28-.09.33-.06.05-.19.08-.4.08H5.16v-3.07zM12 9.82h-2.18v4.36h2.18v-.73h-1.45v-1.1h1.27v-.72h-1.27v-1.08H12v-.73zm3.91 0l-1.19 3.32-1.19-3.32h-.82l1.54 4.36h.94l1.54-4.36h-.82zM21 3H3C1.34 3 0 4.34 0 6v12c0 1.66 1.34 3 3 3h18c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3zm1 15c0 .55-.45 1-1 1H3c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h18c.55 0 1 .45 1 1v12z" />
    </svg>
  );
}

export function PlatformIcon({
  id,
  className = "",
  size = 20,
}: {
  id: string;
  className?: string;
  size?: number;
}) {
  switch (id.toLowerCase()) {
    case "x":
      return <IconX className={className} size={size} />;
    case "linkedin":
      return <IconLinkedIn className={className} size={size} />;
    case "facebook":
      return <IconFacebook className={className} size={size} />;
    case "instagram":
      return <IconInstagram className={className} size={size} />;
    case "threads":
      return <IconThreads className={className} size={size} />;
    case "tiktok":
      return <IconTikTok className={className} size={size} />;
    case "youtube":
      return <IconYouTube className={className} size={size} />;
    case "snapchat":
      return <IconSnapchat className={className} size={size} />;
    case "devto":
      return <IconDevTo className={className} size={size} />;
    default:
      return null;
  }
}

