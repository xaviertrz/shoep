import { PaymentDto } from '../../dtos/PaymentDto';
import { ResponseDto } from '../../dtos/ResponseDto';

export function usePaymentStore() {
  async function generatePreference(paymentData: PaymentDto) {
    try {
      const url = import.meta.env.VITE_API_URL;
      const endpoint = 'preferences';
      const response = await fetch(`${url}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
      });
      const preferenceData: ResponseDto<string> = await response.json();
      return preferenceData;
    } catch (error) {
      console.error(error);
    }
  }

  return {
    // Propiedades

    // Métodos
    generatePreference
  };
}
