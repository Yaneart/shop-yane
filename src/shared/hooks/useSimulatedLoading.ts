import { useState, useEffect } from 'react';

export function useSimulatedLoading(ms = 1500) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), ms);
    return () => clearTimeout(timer);
  }, [ms]);

  return isLoading;
}
