import {
  onCloseAddVariantModal,
  onCloseEditProductModal,
  onCloseEditVariantModal,
  onCloseDeleteVariantConfirmationModal,
  onCloseImageManagerModal,
  onCloseLoginModal,
  onCloseDeletePublicationModal,
  onOpenDeletePublicationModal,
  onOpenAddVariantModal,
  onOpenEditProductModal,
  onOpenEditVariantModal,
  onOpenDeleteVariantConfirmationModal,
  onOpenImageManagerModal,
  onOpenEditAddressModal,
  onCloseEditAddressModal,
  onOpenLoginModal,
  onOpenAddAddressModal,
  onCloseAddAddressModal,
  onOpenMenuModal,
  onCloseMenuModal,
  onOpenSizeTableModal,
  onCloseSizeTableModal
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
    isAddAddressModalOpen,
    isDeletePublicationModalOpen,
    isMenuModalOpen,
    isSizeTableModalOpen
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

  const openDeletePublicationModal = () => {
    dispatch(onOpenDeletePublicationModal());
  };

  const closeDeletePublicationModal = () => {
    dispatch(onCloseDeletePublicationModal());
  };

  const openMenuModal = () => {
    dispatch(onOpenMenuModal());
  };

  const closeMenuModal = () => {
    dispatch(onCloseMenuModal());
  };

  const openSizeTableModal = () => {
    dispatch(onOpenSizeTableModal());
  };

  const closeSizeTableModal = () => {
    dispatch(onCloseSizeTableModal());
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
    isDeletePublicationModalOpen,
    isMenuModalOpen,
    isSizeTableModalOpen,

    //* Métodos
    openEditProductModal,
    openEditVariantModal,
    openAddVariantModal,
    openDeleteVariantConfirmationModal,
    openImageManagerModal,
    openEditAddressModal,
    openLoginModal,
    openAddAddressModal,
    openDeletePublicationModal,
    openMenuModal,
    openSizeTableModal,
    closeSizeTableModal,
    closeMenuModal,
    closeEditProductModal,
    closeEditVariantModal,
    closeAddVariantModal,
    closeDeleteVariantConfirmationModal,
    closeImageManagerModal,
    closeEditAddressModal,
    closeLoginModal,
    closeAddAddressModal,
    closeDeletePublicationModal
  };
}
