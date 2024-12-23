import { DocumentVO } from '@/shared';
import { MenuOptimisticEnum } from '@/shared/enum';
import { createContext, Dispatch, SetStateAction } from 'react';

export const MenuContext = createContext<{
  addOptimisticMenus: (action: {
    type: MenuOptimisticEnum;
    id?: string;
    pid?: string;
  }) => void;
  doList: () => Promise<DocumentVO[] | undefined>;
  setSelectedKeys: Dispatch<SetStateAction<string[]>>;
  onDelDoc: (id: string, callback: () => void) => void;
}>({
  addOptimisticMenus: () => {},
  doList: async () => {
    return undefined;
  },
  setSelectedKeys: () => {},
  onDelDoc: () => {},
});
