import React from 'react';
import { useMediaQuery } from 'react-responsive';

interface MobileProps {
  children: React.JSX.Element;
}

function Mobile({ children }: MobileProps) {
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });

  return <>{isMobile && children}</>;
}

export default Mobile;
