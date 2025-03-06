import type { SelectOption } from '@ui/components/select/BottomSheetSelect';
import { create } from 'zustand';

interface PaymentFilterState {
  startDate: string;
  endDate: string;
  status?: SelectOption | null;
  updateFilters: (
    filters: Partial<Omit<PaymentFilterState, 'updateFilters'>>,
  ) => void;
}

export const usePaymentFilterStore = create<PaymentFilterState>((set) => ({
  startDate: '2020-01-01',
  endDate: new Date().toISOString().split('T')[0], // 오늘 날짜 기본값
  status: undefined,
  updateFilters: (filters) => set((state) => ({ ...state, ...filters })),
}));
