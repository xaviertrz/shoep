import {
  onCloseAddVariantModal,
  onCloseEditProductModal,
  onCloseEditVariantModal,
  onCloseDeleteVariantConfirmationModal,
  onCloseImageManagerModal,
  onCloseLoginModal,
  onOpenAddVariantModal,
  onOpenEditProductModal,
  onOpenEditVariantModal,
  onOpenDeleteVariantConfirmationModal,
  onOpenImageManagerModal,
  onOpenEditAddressModal,
  onCloseEditAddressModal,
  onOpenLoginModal,
  onOpenAddAddressModal,
  onCloseAddAddressModal
} from '../../store/modal/modalSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/config';

export function useModalStore() {
  const dispatch = useAppDispatch();

  const {
    isEditProductModalOpen,
    isEditVariantModalOpen,
    isAddVariantModalOpen,
    isDeleteVariantConfirmationModalOpen,
    isImageManagerModalOpen,
    isEditAddressModalOpen,
    isLoginModalOpen,
    isAddAddressModalOpen
  } = useAppSelector(state => state.modal);

  const openEditProductModal = () => {
    dispatch(onOpenEditProductModal());
  };

  const closeEditProductModal = () => {
    dispatch(onCloseEditProductModal());
  };

  const openEditVariantModal = () => {
    dispatch(onOpenEditVariantModal());
  };

  const closeEditVariantModal = () => {
    dispatch(onCloseEditVariantModal());
  };

  const openAddVariantModal = () => {
    dispatch(onOpenAddVariantModal());
  };

  const closeAddVariantModal = () => {
    dispatch(onCloseAddVariantModal());
  };

  const openDeleteVariantConfirmationModal = () => {
    dispatch(onOpenDeleteVariantConfirmationModal());
  };

  const closeDeleteVariantConfirmationModal = () => {
    dispatch(onCloseDeleteVariantConfirmationModal());
  };

  const openImageManagerModal = () => {
    dispatch(onOpenImageManagerModal());
  };

  const closeImageManagerModal = () => {
    dispatch(onCloseImageManagerModal());
  };

  const openEditAddressModal = () => {
    dispatch(onOpenEditAddressModal());
  };

  const closeEditAddressModal = () => {
    dispatch(onCloseEditAddressModal());
  };

  const openLoginModal = () => {
    dispatch(onOpenLoginModal());
  };

  const closeLoginModal = () => {
    dispatch(onCloseLoginModal());
  };

  const openAddAddressModal = () => {
    dispatch(onOpenAddAddressModal());
  };

  const closeAddAddressModal = () => {
    dispatch(onCloseAddAddressModal());
  };

  /*   const toggleDateModal = () => {
    isDateModalOpen ? openDateModal() : closeDateModal();
  }; */

  return {
    //* Propiedades
    isEditProductModalOpen,
    isEditVariantModalOpen,
    isAddVariantModalOpen,
    isDeleteVariantConfirmationModalOpen,
    isImageManagerModalOpen,
    isEditAddressModalOpen,
    isLoginModalOpen,
    isAddAddressModalOpen,

    //* Métodos
    openEditProductModal,
    openEditVariantModal,
    openAddVariantModal,
    openDeleteVariantConfirmationModal,
    openImageManagerModal,
    openEditAddressModal,
    openLoginModal,
    openAddAddressModal,
    closeEditProductModal,
    closeEditVariantModal,
    closeAddVariantModal,
    closeDeleteVariantConfirmationModal,
    closeImageManagerModal,
    closeEditAddressModal,
    closeLoginModal,
    closeAddAddressModal
  };
}
