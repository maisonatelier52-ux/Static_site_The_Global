export function SocialIcon({ name, size = 18 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  if (name === "x") {
    return <svg {...common}><path d="M5 4l14 16M19 4L5 20" /></svg>;
  }
  if (name === "facebook") {
    return <svg {...common}><path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9c0-.7.3-1 1-1z" /></svg>;
  }
  if (name === "instagram") {
    return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none" /></svg>;
  }
  if (name === "linkedin") {
    return <svg {...common}><rect x="4" y="9" width="4" height="11" /><path d="M6 4.5v.1M12 20V9h4v2c1-1.5 4-2 4 2v7M12 14c0-3 4-3 4 0" /></svg>;
  }
  if (name === "youtube") {
    return <svg {...common}><path d="M21 8.2c-.2-1.2-1-2-2.2-2.2C17 5.5 12 5.5 12 5.5S7 5.5 5.2 6C4 6.2 3.2 7 3 8.2A22 22 0 003 12a22 22 0 00.2 3.8c.2 1.2 1 2 2.2 2.2 1.8.5 6.8.5 6.8.5s5 0 6.8-.5c1.2-.2 2-1 2.2-2.2A22 22 0 0021 12a22 22 0 00-.2-3.8z" /><path d="M10 9l5 3-5 3z" fill="currentColor" /></svg>;
  }
  if (name === "search") {
    return <svg {...common}><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4 4" /></svg>;
  }
  if (name === "menu") {
    return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
  }
  if (name === "close") {
    return <svg {...common}><path d="M5 5l14 14M19 5L5 19" /></svg>;
  }
  if (name === "mail") {
    return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="1" /><path d="M4 7l8 6 8-6" /></svg>;
  }
  if (name === "whatsapp") {
    return <svg {...common} strokeWidth={1.4}><path d="M12 3a9 9 0 00-7.8 13.5L3 21l4.6-1.2A9 9 0 1012 3z" /><path d="M8.6 8.7c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.4.2.5.6 1.6.7 1.7.1.2.1.3 0 .5-.1.2-.2.3-.4.5-.2.2-.4.4-.2.7.2.4 1 1.5 2.1 2.4 1.4 1.2 1.9 1.2 2.2 1.1.3-.1.9-.7 1.1-1 .2-.3.4-.2.6-.1.2.1 1.5.7 1.8.8.3.1.5.2.5.4 0 .2 0 .9-.4 1.5-.4.6-1.6 1.1-2.3 1.1-.7 0-1.9-.2-3.6-1.4-2.1-1.6-3.4-3.7-3.5-3.9-.1-.2-.9-1.4-.9-2.6 0-1.2.6-1.8.8-2.1z" fill="currentColor" stroke="none" /></svg>;
  }
  if (name === "list") {
    return <svg {...common}><path d="M9 6h12M9 12h12M9 18h12" /><circle cx="4" cy="6" r="1.1" fill="currentColor" stroke="none" /><circle cx="4" cy="12" r="1.1" fill="currentColor" stroke="none" /><circle cx="4" cy="18" r="1.1" fill="currentColor" stroke="none" /></svg>;
  }
  if (name === "pin") {
    return <svg {...common}><path d="M12 21s7-6.3 7-11.5A7 7 0 105 9.5C5 14.7 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.3" /></svg>;
  }
  if (name === "newspaper") {
    return <svg {...common}><rect x="3" y="5" width="14" height="14" rx="1" /><path d="M17 8h4v10a2 2 0 01-2 2H7" /><path d="M6 9h8M6 12h8M6 15h5" /></svg>;
  }
  if (name === "check") {
    return <svg {...common} strokeWidth={2.4}><path d="M5 12.5l4.5 4.5L19 7" /></svg>;
  }
  if (name === "chevronLeft") {
    return <svg {...common} strokeWidth={2.2}><path d="M14.5 5.5L8 12l6.5 6.5" /></svg>;
  }
  if (name === "chevronRight") {
    return <svg {...common} strokeWidth={2.2}><path d="M9.5 5.5L16 12l-6.5 6.5" /></svg>;
  }
  return <svg {...common}><path d="M9.5 14.5l5-5M7.5 17l-1 1a3 3 0 01-4-4l4-4a3 3 0 014 0M16.5 7l1-1a3 3 0 014 4l-4 4a3 3 0 01-4 0" /></svg>;
}