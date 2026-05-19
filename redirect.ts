
export function redirectWithParams(destination: string) {
  if (typeof window === 'undefined') return;
  const currentParams = window.location.search;

  const url = new URL(destination, window.location.origin);
  
  if (currentParams) {
      if (url.search) {
          // If destination already has params, merge them
          const newParams = new URLSearchParams(currentParams.substring(1));
          newParams.forEach((value, key) => {
              url.searchParams.set(key, value);
          });
          window.location.href = url.toString();
      } else {
          // Otherwise, just append current search
          window.location.href = destination + currentParams;
      }
  } else {
      window.location.href = destination;
  }
}

// Add to window for global access if needed, though importing is better in TS
declare global {
  interface Window {
    redirectWithParams: (destination: string) => void;
  }
}

window.redirectWithParams = redirectWithParams;
