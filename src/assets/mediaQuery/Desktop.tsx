import React from 'react';
import { useMediaQuery } from 'react-responsive';

interface DesktopProps {
  children: React.JSX.Element;
}

function Desktop({ children }: DesktopProps) {
  const isDesktop = useMediaQuery({
    query: '(min-width:1024px)',
  });

  return <>{isDesktop && children}</>;
}

export default Desktop;
