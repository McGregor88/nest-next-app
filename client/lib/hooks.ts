import { useContext } from 'react';
import { StoreContext } from '@/contexts/StoreContext';

export const useStores = () => {
  return useContext(StoreContext);
};