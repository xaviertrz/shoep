import { v4 as uuidv4 } from 'uuid';
import { CaseUseException } from '../shared/domain/exceptions/CaseUseException';
import { ResponseDto } from '../shared/dtos/response/response.dto';
import { CreateOrderDto } from '../shared/dtos/order/create-order.dto';
import { IOrder } from '../interfaces/order.interface';
import { OrderRepository } from '../repositories/order.repository';
import { ProductService } from './product.service';

export class OrderService {
  static async createOrder(createOrderDto: CreateOrderDto): Promise<ResponseDto<void>> {
    try {
      const orderData = await mapToOrder(createOrderDto);
      const variant = await ProductService.getVariantById(orderData.variant_uuid);
      const updatedStock = variant.data!.stock - orderData.quantity;
      const response = await ProductService.updateVariantStock(orderData.variant_uuid, updatedStock);
      if (!response.success) {
        return { success: false, message: response.message };
      }

      return await OrderRepository.createOrder(orderData);
    } catch (error) {
      console.log(error);
      if (error instanceof CaseUseException) {
        return { success: false, message: error.message };
      } else {
        return { success: false, message: 'Error creando orden' };
      }
    }
  }

  static async getByBuyerId(user_uuid: string): Promise<ResponseDto<IOrder[]>> {
    try {
      return await OrderRepository.getByBuyerId(user_uuid);
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error obteniendo ordenes' };
    }
  }

  static async getBySellerId(user_uuid: string): Promise<ResponseDto<IOrder[]>> {
    try {
      return await OrderRepository.getBySellerId(user_uuid);
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error obteniendo ordenes' };
    }
  }
}

async function mapToOrder(createOrderDto: CreateOrderDto): Promise<IOrder> {
  return {
    uuid: uuidv4(),
    user_uuid: createOrderDto.user_uuid,
    variant_uuid: createOrderDto.variant_uuid,
    address_id: createOrderDto.address_id,
    quantity: createOrderDto.quantity,
    total: createOrderDto.total,
    status: createOrderDto.status,
    paid_at: createOrderDto.paid_at
  };
}
