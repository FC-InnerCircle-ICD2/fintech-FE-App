import { create } from 'zustand';

type TModalType = 'modal' | 'dialog';

export type TModalOptions = {
  /**
   * 오버레이 사용 여부
   */
  enableOverlay?: boolean;
  /**
   * 오버레이 클릭으로 닫기 허용 여부
   */
  enableOverlayClickClose?: boolean;
  /**
   * 배경 스크롤 허용 여부
   */
  enableBackgroundScroll?: boolean;
};

export type TModal = {
  id: string; // 고유 ID
  index: number;
  isVisible: boolean;
  type: TModalType;
  /**
   * 모달에 렌더링할 React 요소
   */
  children: React.ReactElement;
} & TModalOptions;

export type TModalState = {
  modals: TModal[];
  openModal: (
    type: TModalType,
    children: React.ReactElement,
    options?: TModalOptions,
  ) => void;
  closeModal: () => void; // 배열의 마지막 모달 닫기
  closeAllModal: () => void; // 모든 모달 닫기
  cleanupModals: () => void; // isVisible이 false인 모달 제거
};

export const useModalStore = create<TModalState>((set) => ({
  modals: [],

  // 모달 열기
  openModal: (type, children, options) =>
    set((state) => ({
      modals: [
        ...state.modals,
        {
          id: crypto.randomUUID(), // 고유 ID 생성
          index: state.modals.length,
          isVisible: true,
          type,
          children,
          ...options, // 옵션 병합
        },
      ],
    })),

  // 배열의 마지막 모달 닫기
  closeModal: () =>
    set((state) => {
      if (state.modals.length === 0) return state;
      const updatedModals = [...state.modals];
      updatedModals[updatedModals.length - 1].isVisible = false;
      return { modals: updatedModals };
    }),

  // 모든 모달 닫기
  closeAllModal: () =>
    set((state) => {
      const updatedModals = state.modals.map((modal) => ({
        ...modal,
        isVisible: false,
      }));
      return { modals: updatedModals };
    }),

  cleanupModals: () =>
    set((state) => ({
      modals: state.modals.filter((modal) => modal.isVisible),
    })),
}));
