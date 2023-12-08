import React, { useCallback, useState } from 'react';

function useInput<T>(init: T) {
  const [value, setValue] = useState<T>(init);

  const onChange = useCallback(
    (state: React.ChangeEvent<HTMLInputElement> | T) => {
      if (state instanceof Object && 'currentTarget' in state) {
        setValue(state.currentTarget.value as T);
      } else {
        setValue(state as T);
      }
    },
    [],
  );

  return [value, onChange] as const;
}

export default useInput;
