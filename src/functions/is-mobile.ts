'use client';

export function isMobile(): boolean {
  const userAgent = navigator.userAgent;
  const mobileRegex = /Android|iPhone|iPad|iPod/i;
  return mobileRegex.test(userAgent);
}
