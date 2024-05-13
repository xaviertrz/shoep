import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { categorySlice } from './category/categorySlice';
import { productSlice } from './product/productSlice';
import { productOptionsSlice } from './product-options/productOptionsSlice';
import { modalSlice } from './modal/modalSlice';
import { addressSlice } from './addresses/addressSlice';
import { neighborhoodSlice } from './neighborhood/neighborhoodSlice';
import { variantSlice } from './variant/variantSlice';
import { orderSlice } from './orders/orderSlice';
import { userSlice } from './user/userSlice';
import { materialSlice } from './material/materialSlice';
import { quantitySlice } from './product-quantity/quantitySlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    category: categorySlice.reducer,
    product: productSlice.reducer,
    productOptions: productOptionsSlice.reducer,
    modal: modalSlice.reducer,
    address: addressSlice.reducer,
    neighborhood: neighborhoodSlice.reducer,
    variant: variantSlice.reducer,
    order: orderSlice.reducer,
    user: userSlice.reducer,
    material: materialSlice.reducer,
    quantity: quantitySlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
