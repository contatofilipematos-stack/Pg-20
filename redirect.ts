
function saveParamsToStorage() {
  const params = new URLSearchParams(window.location.search);
  params.forEach((value, key) => {
    localStorage.setItem(`utm_${key}`, value);
  });
}

function getParamsFromStorage() {
  const params = new URLSearchParams();
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("utm_")) {
      params.append(key.substring(4), localStorage.getItem(key) || "");
    }
  }
  return params;
}

function redirectWithParams(destination: string, shouldTrack: boolean = false) {
  // Save new params first
  saveParamsToStorage();
  
  const savedParams = getParamsFromStorage();
  const currentParams = new URLSearchParams(window.location.search);
  
  // Merge params: current > saved
  currentParams.forEach((val, key) => savedParams.set(key, val));
  
  const queryString = savedParams.toString();
  let finalUrl = destination;
  
  if (queryString) {
    finalUrl += (destination.includes("?") ? "&" : "?") + queryString;
  }

  const performRedirect = () => {
    window.location.href = finalUrl;
  };

  if (shouldTrack) {
    if (typeof window !== "undefined" && (window as any).utmify?.track) {
      try {
        (window as any).utmify.track("InitiateCheckout");
      } catch (e) {
        console.error("Erro ao rastrear IC:", e);
      }
    }
    setTimeout(performRedirect, 600);
  } else {
    performRedirect();
  }
}

// Auto-interception
document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const link = target.closest("a") || (target.tagName === "BUTTON" && target.closest("[data-checkout]") ? target : null);
  
  if (!link) return;

  const href = link.getAttribute("href") || (link as any).dataset?.checkout;
  if (!href) return;

  // Checkout domains
  const checkoutDomains = ["kiwify", "kirvano", "hotmart", "perfectpay", "eduzz", "pay.lowify"];
  const isCheckout = checkoutDomains.some(domain => href.includes(domain));

  if (isCheckout) {
    e.preventDefault();
    redirectWithParams(href, true);
  } else if (href.startsWith("http")) { // External link
    e.preventDefault();
    redirectWithParams(href, false);
  }
});

declare global {
  interface Window {
    redirectWithParams: (destination: string, shouldTrack?: boolean) => void;
  }
}

window.redirectWithParams = redirectWithParams;
export { redirectWithParams };
