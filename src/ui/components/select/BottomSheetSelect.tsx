import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../icon/Icon';
import { cn } from '@lib/shadcn/lib/utils';
import Button from '../button/Button';

export interface SelectOption {
  label: string;
  value: string | number | null;
}

interface BottomSheetSelectProps {
  selectName?: string;
  placeholder?: string;
  options?: SelectOption[];
  value?: SelectOption | null; // 외부에서 선택된 값 관리
  onChange?: (value: SelectOption | null) => void; // 변경 핸들러 추가
}

const BottomSheetSelect = ({
  selectName = 'Select an Option',
  placeholder = 'Select an option',
  options = [],
  value,
  onChange,
}: BottomSheetSelectProps) => {
  const [selected, setSelected] = useState<SelectOption | null>(value || null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: SelectOption) => {
    setSelected(option);
    onChange?.(option); // onChange가 있으면 호출
    setIsOpen(false);
  };

  const handleClearSelection = () => {
    setSelected(null);
    onChange?.(null); // onChange가 있으면 null 전달
  };

  return (
    <div className='relative'>
      {/* Select Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 border text-xs rounded-full bg-white transition-all font-medium',
          selected
            ? 'text-gray-700 border-gray-300'
            : 'text-gray-400 border-gray-200',
        )}
      >
        {selected ? selected.label : placeholder}{' '}
        <Icon name='ChevronDown' size={16} />
      </button>

      {/* Bottom Sheet (Portal) */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className='fixed inset-0 bg-black/50 flex items-end z-[99999]'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
              >
                {/* Bottom Sheet */}
                <motion.div
                  className='w-full bg-white rounded-t-2xl shadow-lg p-4'
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ stiffness: 200, damping: 20 }}
                  onClick={(e) => e.stopPropagation()} // Prevent overlay click from closing
                >
                  <div className='grid grid-cols-[80px_1fr_80px] items-center justify-center'>
                    <button></button>
                    <h3 className='font-medium text-center text-gray-700'>
                      {selectName}
                    </h3>

                    <Button
                      width={'fit'}
                      variant={'gray'}
                      size={'small'}
                      onClick={handleClearSelection}
                      className='ml-auto'
                    >
                      <Icon name='RotateCcw' size={'14'} /> 초기화
                    </Button>
                  </div>

                  {/* Option List */}
                  <ul className='mt-4'>
                    {options.map((option) => (
                      <li
                        key={option.value}
                        className={cn(
                          'py-2 flex justify-between items-center cursor-pointer rounded-xl',
                          selected?.value === option.value
                            ? 'font-semibold text-primary'
                            : 'text-gray-600',
                        )}
                        onClick={() => handleSelect(option)}
                      >
                        {option.label}
                        {selected?.value === option.value && (
                          <Icon name='Check' size={16} />
                        )}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
};

export default BottomSheetSelect;
