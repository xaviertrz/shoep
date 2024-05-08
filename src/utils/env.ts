export const CURRENT_ENV = process.env.NODE_ENV || 'development';
export const IS_DEVELOPMENT = CURRENT_ENV === 'development';
export const IS_PRODUCTION = CURRENT_ENV === 'production';
export const IS_TEST = CURRENT_ENV === 'test';
export const PORT = process.env.PORT || 3000;
export const HOST = process.env.HOST || 'localhost';
export const BASE_URL = `http://${HOST}:${PORT}`;

export const MERCADO_PAGO_URLS = {
  AUTH_URL: 'https://auth.mercadopago.com.ar/authorization',
    API_URL: 'https://api.mercadopago.com'
};

export const MERCADO_PAGO_CREDENTIALS = {
  CLIENT_ID: process.env.MP_CLIENT_ID,
  CLIENT_SECRET: process.env.MP_CLIENT_SECRET
};

export const MERCADO_PAGO_REDIRECT_URL = `${BASE_URL}/v1/mercado_pago_redirect`;
