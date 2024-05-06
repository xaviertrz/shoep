import { CaseUseException } from '../shared/domain/exceptions/CaseUseException';
import { ExternalServiceException } from '../shared/domain/exceptions/external.service.exception';
import { SocrataResponse } from '../shared/dtos/socrata.response.dto';
const url = process.env.SOCRATA_API_URL || '';
const token = process.env.SOCRATA_API_TOKEN || '';

export class SocrataApi {
  static async getCompanyDataByNit(nit: bigint): Promise<SocrataResponse> {
    try {
      const parsedNit = parseNit(nit);
      const response = await fetch(url + `?nit=${parsedNit}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-App-Token': token || ''
        }
      });
      const company: SocrataResponse[] = await response.json();
      if (company.length === 0) {
        throw new CaseUseException('La empresa no está registrada en la base de datos de la CCB');
      }

      return company[0];
    } catch (error) {
      console.error(error);
      if (error instanceof CaseUseException) {
        throw error;
      } else {
        throw new ExternalServiceException(
          'No se pudo obtener la información de la empresa desde la base de datos de la CCB'
        );
      }
    }
  }
}

function parseNit(nit: bigint): string {
  const nitArray = Array.from(nit.toString());
  nitArray.splice(nitArray.length - 1, 0, '-'); // Agregar un guión antes del último dígito
  return nitArray.join('');
}
