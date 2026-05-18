
export function redirectWithParams(destination: string) {
  const currentParams = window.location.search;

  if (!currentParams) {
      window.location.href = destination;
      return;
  }

  if (destination.includes("?")) {
      window.location.href = destination + "&" + currentParams.substring(1);
  } else {
      window.location.href = destination + currentParams;
  }
}

// Add to window for global access if needed, though importing is better in TS
declare global {
  interface Window {
    redirectWithParams: (destination: string) => void;
  }
}

window.redirectWithParams = redirectWithParams;
