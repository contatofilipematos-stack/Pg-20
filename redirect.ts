
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

function trackUTMifyAndPixels() {
  console.log("UTMify Custom Tracking triggered manually!");
  
  // 1. Dispatch native Meta Pixel InitiateCheckout
  try {
    if (typeof (window as any).fbq === "function") {
      (window as any).fbq("track", "InitiateCheckout");
      console.log("UTMify Custom: fbq InitiateCheckout triggered");
    }
  } catch (error) {
    console.warn("UTMify Custom: fbq trigger failed", error);
  }

  // 2. Dispatch native TikTok Pixel InitiateCheckout
  try {
    if (typeof (window as any).ttq === "object" && typeof (window as any).ttq.track === "function") {
      (window as any).ttq.track("InitiateCheckout");
      console.log("UTMify Custom: ttq InitiateCheckout triggered");
    }
  } catch (error) {
    console.warn("UTMify Custom: ttq trigger failed", error);
  }

  // 3. Dispatch UTMify API server call to record Initiated Checkout event
  try {
    const leadStr = localStorage.getItem("lead") || localStorage.getItem("lead-tiktok") || localStorage.getItem("lead-google");
    if (leadStr) {
      const lead = JSON.parse(leadStr);
      const sourceUrl = window.location.href.split('?')[0].replace(/\/+$/, "");
      const pageTitle = document.title;
      
      const payload = {
        type: "InitiateCheckout",
        lead: lead,
        event: {
          sourceUrl: sourceUrl,
          pageTitle: pageTitle
        }
      };

      fetch("https://tracking.utmify.com.br/tracking/v1/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      .then(res => res.json())
      .then(data => {
        console.log("UTMify Custom API Call logged successfully:", data);
        if (data && data.lead) {
          localStorage.setItem("lead", JSON.stringify(data.lead));
        }
      })
      .catch(err => {
        console.warn("UTMify Custom API Call failed:", err);
      });
    }
  } catch (error) {
    console.warn("UTMify Custom API Call parsing failed:", error);
  }
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
    // Trigger fully-insured manual tracking pipeline to maximize pixel accuracy
    trackUTMifyAndPixels();

    if (typeof window !== "undefined" && (window as any).utmify?.track) {
      try {
        (window as any).utmify.track("InitiateCheckout");
      } catch (e) {
        console.error("Erro ao rastrear IC:", e);
      }
    }
    // Give slightly more cushion time (750ms) for API and socket dispatches to land securely
    setTimeout(performRedirect, 750);
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
