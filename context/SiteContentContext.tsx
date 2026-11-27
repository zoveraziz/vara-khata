'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { siteContent as defaultContent } from '@/config/siteContent';

export type SiteContentType = typeof defaultContent;

interface SiteContentContextType {
  content: SiteContentType;
  updateContent: (newContent: SiteContentType) => void;
  resetContent: () => void;
  isCustomized: boolean;
  lastUpdated: string | null;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

const STORAGE_KEY = 'vara_khata_custom_site_content';
const TIME_KEY = 'vara_khata_site_content_updated_at';

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContentType>(defaultContent);
  const [isCustomized, setIsCustomized] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // Load customized content from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const storedTime = localStorage.getItem(TIME_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Deep merge with defaultContent to ensure any new keys in defaultContent are preserved
        setContent((prev) => ({
          ...prev,
          ...parsed,
          brand: { ...prev.brand, ...parsed.brand },
          header: { ...prev.header, ...parsed.header },
          hero: { ...prev.hero, ...parsed.hero },
          howItWorks: {
            ...prev.howItWorks,
            ...parsed.howItWorks,
            steps: parsed.howItWorks?.steps || prev.howItWorks.steps,
          },
          comparison: {
            ...prev.comparison,
            ...parsed.comparison,
            oldWay: { ...prev.comparison.oldWay, ...parsed.comparison?.oldWay },
            newWay: { ...prev.comparison.newWay, ...parsed.comparison?.newWay },
          },
          features: {
            ...prev.features,
            ...parsed.features,
            meter: { ...prev.features.meter, ...parsed.features?.meter },
            reminder: { ...prev.features.reminder, ...parsed.features?.reminder },
            receipt: { ...prev.features.receipt, ...parsed.features?.receipt },
            police: { ...prev.features.police, ...parsed.features?.police },
          },
          calculator: { ...prev.calculator, ...parsed.calculator },
          pricing: {
            ...prev.pricing,
            ...parsed.pricing,
            plans: parsed.pricing?.plans || prev.pricing.plans,
          },
          faqs: parsed.faqs || prev.faqs,
          finalCta: { ...prev.finalCta, ...parsed.finalCta },
          footer: {
            ...prev.footer,
            ...parsed.footer,
            links: parsed.footer?.links || prev.footer.links,
          },
          nrb: {
            ...prev.nrb,
            ...parsed.nrb,
            features: parsed.nrb?.features || prev.nrb?.features,
          },
          contact: { ...prev.contact, ...parsed.contact },
          paymentPartners: {
            ...prev.paymentPartners,
            ...parsed.paymentPartners,
            methods: parsed.paymentPartners?.methods || prev.paymentPartners?.methods,
          },
        }));
        setIsCustomized(true);
        if (storedTime) setLastUpdated(storedTime);
      }
    } catch (e) {
      console.error('Failed to parse custom site content from localStorage:', e);
    }
  }, []);

  const updateContent = (newContent: SiteContentType) => {
    setContent(newContent);
    setIsCustomized(true);
    const now = new Date().toLocaleString('bn-BD', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    setLastUpdated(now);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
      localStorage.setItem(TIME_KEY, now);
    } catch (e) {
      console.error('Failed to save custom site content to localStorage:', e);
    }
  };

  const resetContent = () => {
    setContent(defaultContent);
    setIsCustomized(false);
    setLastUpdated(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(TIME_KEY);
    } catch (e) {
      console.error('Failed to reset site content in localStorage:', e);
    }
  };

  return (
    <SiteContentContext.Provider
      value={{
        content,
        updateContent,
        resetContent,
        isCustomized,
        lastUpdated,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    // If rendered outside provider, safely fallback to defaultContent
    return {
      content: defaultContent,
      updateContent: () => {},
      resetContent: () => {},
      isCustomized: false,
      lastUpdated: null,
    };
  }
  return context;
}
