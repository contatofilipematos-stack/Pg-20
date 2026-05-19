
export function redirectWithParams(destination: string) {
  if (typeof window === 'undefined') return;

  try {
    const targetUrl = new URL(destination);
    const searchParams = new URLSearchParams(window.location.search);

    // Merge current search parameters into the target URL parameters
    searchParams.forEach((value, key) => {
      targetUrl.searchParams.set(key, value);
    });

    window.location.href = targetUrl.toString();
  } catch (e) {
    console.error("Failed to redirect with params, falling back:", e);
    // Fallback if URL construction fails
    window.location.href = destination + (window.location.search ? 
      (destination.includes('?') ? '&' : '?') + window.location.search.substring(1) : 
      '');
  }
}

// Add to window for global access if needed, though importing is better in TS
declare global {
  interface Window {
    redirectWithParams: (destination: string) => void;
  }
}

window.redirectWithParams = redirectWithParams;
