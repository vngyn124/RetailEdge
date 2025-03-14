import React, { createContext, useState, useContext, ReactNode } from 'react';

type PlanType = 'free' | 'standard' | 'professional';

interface SubscriptionContextType {
  currentPlan: PlanType;
  setCurrentPlan: (plan: PlanType) => void;
  showAds: boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [currentPlan, setCurrentPlan] = useState<PlanType>('free');

  // Ads are only shown on the free plan
  const showAds = currentPlan === 'free';

  return (
    <SubscriptionContext.Provider value={{ currentPlan, setCurrentPlan, showAds }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = (): SubscriptionContextType => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}; 