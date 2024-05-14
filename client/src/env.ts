export const ENV = {
  DEV: import.meta.env.VITE_API_URL,
  PROD: window.location.origin + '/v1'
};
