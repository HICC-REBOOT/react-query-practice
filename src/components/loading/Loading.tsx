import React from 'react';
import * as L from './Loading.style';

interface LoadingProps {
  ment: string;
}

function Loading({ ment }: LoadingProps) {
  return (
    <L.Container>
      <L.InnerMent>{ment}</L.InnerMent>
    </L.Container>
  );
}

export default Loading;
