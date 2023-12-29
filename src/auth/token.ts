import { atom } from 'recoil';

const tokenStorage = atom<string | null>({
  key: 'access',
  default: null,
});

export default tokenStorage;
