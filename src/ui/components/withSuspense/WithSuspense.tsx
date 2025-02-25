import { Suspense, type ComponentType } from 'react';
import { LoadingSpinner } from '@ui/components/loading/LoadingSpinner';

interface WithSuspenseOptions {
  fallback?: React.ReactNode;
}

export const withSuspense = (
  Component: React.LazyExoticComponent<ComponentType<unknown>>,
  options: WithSuspenseOptions = {},
) => {
  return function SuspenseWrapper() {
    return (
      <Suspense fallback={options.fallback ?? <LoadingSpinner />}>
        <Component />
      </Suspense>
    );
  };
};
