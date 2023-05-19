import { create } from 'zustand';

interface SearchModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSearchModal = create<SearchModalProps>(
  (set) => ({
    isOpen: false,
    onClose: () => set({ isOpen: false }),
    onOpen: () => set({ isOpen: true }),
  })
);

export default useSearchModal;
