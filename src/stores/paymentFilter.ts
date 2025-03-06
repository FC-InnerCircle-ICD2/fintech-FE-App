import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { SelectOption } from '@ui/components/select/BottomSheetSelect';

interface PaymentFilterState {
  startDate?: string;
  endDate: string;
  status?: SelectOption | null;
  updateFilters: (
    filters: Partial<Omit<PaymentFilterState, 'updateFilters'>>,
  ) => void;
  resetFilters: () => void;
}

export const usePaymentFilterStore = create(
  persist<PaymentFilterState>(
    (set) => ({
      startDate: undefined,
      endDate: new Date().toISOString().split('T')[0],
      status: undefined,
      updateFilters: (filters) => set((state) => ({ ...state, ...filters })),
      resetFilters: () =>
        set({
          startDate: undefined,
          endDate: new Date().toISOString().split('T')[0],
          status: undefined,
        }),
    }),
    {
      name: 'payment-filter-storage', // ✅ 로컬 스토리지 키 이름
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
