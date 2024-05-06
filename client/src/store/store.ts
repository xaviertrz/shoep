import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { categorySlice } from './category/categorySlice';
import { productSlice } from './product/productSlice';
import { productOptionsSlice } from './product-options/productOptionsSlice';
import { modalSlice } from './modal/modalSlice';
import { cartSlice } from './cart/cartSlice';
import { addressSlice } from './addresses/addressSlice';
import { neighborhoodSlice } from './neighborhood/neighborhoodSlice';
import { variantSlice } from './variant/variantSlice';
import { orderSlice } from './orders/orderSlice';
import { userSlice } from './user/userSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    category: categorySlice.reducer,
    product: productSlice.reducer,
    productOptions: productOptionsSlice.reducer,
    modal: modalSlice.reducer,
    cart: cartSlice.reducer,
    address: addressSlice.reducer,
    neighborhood: neighborhoodSlice.reducer,
    variant: variantSlice.reducer,
    order: orderSlice.reducer,
    user: userSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
