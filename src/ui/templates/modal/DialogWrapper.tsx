import { useModalStore, type TModal } from '@stores/modal';
import { AnimatePresence, motion } from 'motion/react';
import { Button } from '@lib/shadcn/components/ui/button';

export type TDialogType = 'alert' | 'confirm';
export type TDialogConfig = {
  title: React.ReactNode;
  description: React.ReactNode;
  confirm?: VoidFunction;
  cancel?: VoidFunction;
  confirmButtonText?: string;
  cancelButtonText?: string;
};
export type TDialog = { type: TDialogType } & TDialogConfig;
interface DialogWrapperProps {
  modal?: TModal;
  config: TDialog;
  closeModal: VoidFunction;
  cleanupModals: VoidFunction;
}
const DialogWrapper = ({
  modal,
  config,
  closeModal,
  cleanupModals,
}: DialogWrapperProps) => {
  const {
    type,
    title,
    description,
    confirm,
    cancel,
    confirmButtonText,
    cancelButtonText,
  } = config;
  return (
    <div className=''>
      <AnimatePresence>
        {modal?.isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className='flex items-center justify-center fixed inset-0 z-[10000]'
            data-enable-background-scroll={modal.enableBackgroundScroll}
            onAnimationComplete={() => {
              // 닫힌 모달이 있으면 정리
              if (useModalStore.getState().modals.some((m) => !m.isVisible)) {
                cleanupModals();
              }
            }}
          >
            <motion.div
              className={`absolute z-0 inset-0 ${modal?.enableOverlay ? 'bg-black/50' : 'bg-transparent'}`}
              onClick={() =>
                modal?.enableOverlayClickClose ? closeModal() : null
              }
            />
            <div className='relative flex flex-col gap-2  rounded-[12px] py-4 bg-white w-[320px]'>
              <div className='font-bold px-4'>{title}</div>
              <div className='px-4 pb-4'>{description}</div>
              <div className='flex justify-end gap-2 px-4 '>
                {type === 'confirm' && (
                  <Button
                    variant={'outline'}
                    size={'sm'}
                    onClick={() => (cancel ? cancel() : closeModal())}
                  >
                    {cancelButtonText ?? '취소'}
                  </Button>
                )}

                <Button
                  size={'sm'}
                  onClick={() => (confirm ? confirm() : closeModal())}
                >
                  {confirmButtonText ?? '확인'}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DialogWrapper;
