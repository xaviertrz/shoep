import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    onOpenEditProductModal: state => {
      state.isEditProductModalOpen = true;
    },
    onOpenEditVariantModal: state => {
      state.isEditVariantModalOpen = true;
    },
    onOpenAddVariantModal: state => {
      state.isAddVariantModalOpen = true;
    },
    onOpenDeleteVariantConfirmationModal: state => {
      state.isDeleteVariantConfirmationModalOpen = true;
    },
    onOpenImageManagerModal: state => {
      state.isImageManagerModalOpen = true;
    },
    onOpenEditAddressModal: state => {
      state.isEditAddressModalOpen = true;
    },
    onOpenLoginModal: state => {
      state.isLoginModalOpen = true;
    },
    onOpenAddAddressModal: state => {
      state.isAddAddressModalOpen = true;
    },
    onCloseEditProductModal: state => {
      state.isEditProductModalOpen = false;
    },
    onCloseEditVariantModal: state => {
      state.isEditVariantModalOpen = false;
    },
    onCloseAddVariantModal: state => {
      state.isAddVariantModalOpen = false;
    },
    onCloseDeleteVariantConfirmationModal: state => {
      state.isDeleteVariantConfirmationModalOpen = false;
    },
    onCloseImageManagerModal: state => {
      state.isImageManagerModalOpen = false;
    },
    onCloseEditAddressModal: state => {
      state.isEditAddressModalOpen = false;
    },
    onCloseLoginModal: state => {
      state.isLoginModalOpen = false;
    },
    onCloseAddAddressModal: state => {
      state.isAddAddressModalOpen = false;
    }
  }
});

export const {
  onOpenEditProductModal,
  onOpenEditVariantModal,
  onOpenAddVariantModal,
  onOpenDeleteVariantConfirmationModal,
  onOpenImageManagerModal,
  onOpenEditAddressModal,
  onOpenLoginModal,
  onOpenAddAddressModal,
  onCloseEditProductModal,
  onCloseEditVariantModal,
  onCloseAddVariantModal,
  onCloseDeleteVariantConfirmationModal,
  onCloseImageManagerModal,
  onCloseEditAddressModal,
  onCloseLoginModal,
  onCloseAddAddressModal
} = modalSlice.actions;
export default modalSlice.reducer;
