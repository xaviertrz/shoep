import { Request, Response } from 'express';
import { HttpResponseCodes } from '../shared/HttpResponseCodes';
import { ValueObjectException } from '../shared/domain/exceptions/ValueObjectException';
import { InvalidArgumentError } from '../shared/domain/value-object/InvalidArgumentError';
import { Brand } from '../shared/domain/value-object/Product/Brand';
import { CategoryId } from '../shared/domain/value-object/Product/CategoryId';
import { ProductName } from '../shared/domain/value-object/Product/ProductName';
import { Uuid } from '../shared/domain/value-object/Uuid';
import { CreateProductDto } from '../shared/dtos/product/create-product.dto';
import { SizeId } from '../shared/domain/value-object/Product/SizeId';
import { MaterialId } from '../shared/domain/value-object/Product/MaterialId';
import { Upc } from '../shared/domain/value-object/Product/Upc';
import { ColorId } from '../shared/domain/value-object/Product/ColorId';
import { Sku } from '../shared/domain/value-object/Product/Sku';
import { Stock } from '../shared/domain/value-object/Product/Stock';
import { ProductPrice } from '../shared/domain/value-object/Product/ProductPrice';
import { ProductService } from '../services/product.service';
import { ProductVariantDto } from '../shared/dtos/product/product-variant.dto';
import { Page } from '../shared/domain/value-object/Page';
import { Description } from '../shared/domain/value-object/Product/Description';
import { UpdateProductDto } from '../shared/dtos/product/edit-product.dto';
import { UpdateVariantDto } from '../shared/dtos/product/edit-variant.dto';

export class ProductController {
  static async create(req: Request, res: Response) {
    try {
      const createProductDto: CreateProductDto = req.body;
      const category_id = new CategoryId(createProductDto.category_id);
      const seller_uuid = new Uuid(createProductDto.seller_uuid);
      const name = new ProductName(createProductDto.name);
      const brand = new Brand(createProductDto.brand);
      const descripcion = createProductDto.description
        ? new Description(createProductDto.description).value
        : undefined;
      new SizeId(createProductDto.variant.size_id);
      new MaterialId(createProductDto.variant.material_id);
      new ColorId(createProductDto.variant.color_id);
      createProductDto.variant.upc ? new Upc(createProductDto.variant.upc) : undefined;
      createProductDto.variant.sku ? new Sku(createProductDto.variant.sku) : undefined;
      new Stock(createProductDto.variant.stock);
      new ProductPrice(createProductDto.variant.price);
      const response = await ProductService.create({
        category_id: category_id.getValue(),
        seller_uuid: seller_uuid.getValue(),
        name: name.getValue(),
        brand: brand.getValue(),
        description: descripcion,
        variant: createProductDto.variant
      });
      if (response.success) {
        res.status(HttpResponseCodes.CREATED).json(response);
      } else {
        res.status(HttpResponseCodes.BAD_REQUEST).json(response);
      }
    } catch (error) {
      console.error(error);
      if (error instanceof ValueObjectException || error instanceof InvalidArgumentError) {
        res.status(HttpResponseCodes.BAD_REQUEST).json({ success: false, message: error.message });
      } else {
        res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
      }
    }
  }

  static async block(req: Request, res: Response) {
    try {
      const product_uuid = new Uuid(req.params.productUuid);
      const response = await ProductService.block(product_uuid.getValue());
      if (response.success) {
        res.status(HttpResponseCodes.OK).json(response);
      } else {
        res.status(HttpResponseCodes.BAD_REQUEST).json(response);
      }
    } catch (error) {
      console.error(error);
      res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
    }
  }

  static async createVariant(req: Request, res: Response) {
    try {
      const variantDto: ProductVariantDto = req.body;
      const product_uuid = new Uuid(variantDto.product_uuid);
      const size_id = new SizeId(variantDto.size_id);
      const material_id = new MaterialId(variantDto.material_id);
      const color_id = new ColorId(variantDto.color_id);
      const upc = variantDto.upc ? new Upc(variantDto.upc).value : undefined;
      const sku = variantDto.sku ? new Sku(variantDto.sku).value : undefined;
      const stock = new Stock(variantDto.stock);
      const price = new ProductPrice(variantDto.price);
      const response = await ProductService.createVariant({
        product_uuid: product_uuid.getValue(),
        size_id: size_id.getValue(),
        material_id: material_id.getValue(),
        color_id: color_id.getValue(),
        upc,
        sku,
        stock: stock.getValue(),
        price: price.getValue()
      });
      if (response.success) {
        res.status(HttpResponseCodes.CREATED).json(response);
      } else {
        res.status(HttpResponseCodes.BAD_REQUEST).json(response);
      }
    } catch (error) {
      console.error(error);
      if (error instanceof ValueObjectException || error instanceof InvalidArgumentError) {
        res.status(HttpResponseCodes.BAD_REQUEST).json({ success: false, message: error.message });
      } else {
        res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
      }
    }
  }

  static async deleteVariant(req: Request, res: Response) {
    try {
      const variant_uuid = new Uuid(req.params.variantId);
      const response = await ProductService.deleteVariant(variant_uuid.getValue(), {
        token_user_uuid: req.body.token_user_uuid,
        token_role_id: req.body.token_role_id
      });
      if (response.success) {
        res.status(HttpResponseCodes.CREATED).json(response);
      } else {
        res.status(HttpResponseCodes.BAD_REQUEST).json(response);
      }
    } catch (error) {
      console.error(error);
      if (error instanceof ValueObjectException || error instanceof InvalidArgumentError) {
        res.status(HttpResponseCodes.BAD_REQUEST).json({ success: false, message: error.message });
      } else {
        res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
      }
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const pageParam = req.query.page;
      const page = new Page(parseInt(pageParam as string) || 1);
      const response = await ProductService.getAll(page);
      if (response.success) {
        res.status(HttpResponseCodes.OK).json(response);
      } else {
        res.status(HttpResponseCodes.BAD_REQUEST).json(response);
      }
    } catch (error) {
      console.error(error);
      if (error instanceof ValueObjectException) {
        res.status(HttpResponseCodes.BAD_REQUEST).json({ success: false, message: error.message });
      } else {
        res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
      }
    }
  }

  static async getAllBySellerUuid(req: Request, res: Response) {
    try {
      const pageParam = req.query.page;
      const page = new Page(parseInt(pageParam as string) || 1);
      const seller_uuid = new Uuid(req.params.sellerUuid);
      const response = await ProductService.getAllBySellerUuid(seller_uuid.getValue(), page);
      if (response.success) {
        res.status(HttpResponseCodes.OK).json(response);
      } else {
        res.status(HttpResponseCodes.BAD_REQUEST).json(response);
      }
    } catch (error) {
      console.error(error);
      if (error instanceof ValueObjectException) {
        res.status(HttpResponseCodes.BAD_REQUEST).json({ success: false, message: error.message });
      } else {
        res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
      }
    }
  }

  static async getAllByCategoryId(req: Request, res: Response) {
    try {
      const category_id = new CategoryId(parseInt(req.params.categoryId));
      const pageParam = req.query.page;
      const page = new Page(parseInt(pageParam as string) || 1);
      const response = await ProductService.getAllByCategoryId(category_id.getValue(), page);
      if (response.success) {
        res.status(HttpResponseCodes.OK).json(response);
      } else {
        res.status(HttpResponseCodes.BAD_REQUEST).json(response);
      }
    } catch (error) {
      console.error(error);
      if (error instanceof ValueObjectException) {
        res.status(HttpResponseCodes.BAD_REQUEST).json({ success: false, message: error.message });
      } else {
        res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
      }
    }
  }

  static async getAllByMaterialId(req: Request, res: Response) {
    try {
      const material_id = new MaterialId(parseInt(req.params.materialId));
      const pageParam = req.query.page;
      const page = new Page(parseInt(pageParam as string) || 1);
      const response = await ProductService.getAllByMaterialId(material_id.getValue(), page);
      if (response.success) {
        res.status(HttpResponseCodes.OK).json(response);
      } else {
        res.status(HttpResponseCodes.BAD_REQUEST).json(response);
      }
    } catch (error) {
      console.error(error);
      if (error instanceof ValueObjectException) {
        res.status(HttpResponseCodes.BAD_REQUEST).json({ success: false, message: error.message });
      } else {
        res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
      }
    }
  }

  static async getAllByColorId(req: Request, res: Response) {
    try {
      const color_id = new ColorId(parseInt(req.params.colorId));
      const pageParam = req.query.page;
      const page = new Page(parseInt(pageParam as string) || 1);
      const response = await ProductService.getAllByColorld(color_id.getValue(), page);
      if (response.success) {
        res.status(HttpResponseCodes.OK).json(response);
      } else {
        res.status(HttpResponseCodes.BAD_REQUEST).json(response);
      }
    } catch (error) {
      console.error(error);
      if (error instanceof ValueObjectException) {
        res.status(HttpResponseCodes.BAD_REQUEST).json({ success: false, message: error.message });
      } else {
        res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
      }
    }
  }

  static async getAllBySizeId(req: Request, res: Response) {
    try {
      const size_id = new SizeId(parseInt(req.params.sizeId));
      const pageParam = req.query.page;
      const page = new Page(parseInt(pageParam as string) || 1);
      const response = await ProductService.getAllBySizeld(size_id.getValue(), page);
      if (response.success) {
        res.status(HttpResponseCodes.OK).json(response);
      } else {
        res.status(HttpResponseCodes.BAD_REQUEST).json(response);
      }
    } catch (error) {
      console.error(error);
      if (error instanceof ValueObjectException) {
        res.status(HttpResponseCodes.BAD_REQUEST).json({ success: false, message: error.message });
      } else {
        res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
      }
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const product_uuid = new Uuid(req.params.productUuid);
      const response = await ProductService.getById(product_uuid.getValue());
      if (response.success) {
        res.status(HttpResponseCodes.OK).json(response);
      } else {
        res.status(HttpResponseCodes.BAD_REQUEST).json(response);
      }
    } catch (error) {
      console.error(error);
      if (error instanceof ValueObjectException) {
        res.status(HttpResponseCodes.BAD_REQUEST).json({ success: false, message: error.message });
      } else {
        res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
      }
    }
  }

  static async updateProduct(req: Request, res: Response) {
    try {
      const product_uuid = new Uuid(req.params.productUuid);
      const updateProductDto: UpdateProductDto = req.body;
      const category_id = updateProductDto.category_id ? new CategoryId(updateProductDto.category_id).value : undefined;
      const name = updateProductDto.name ? new ProductName(updateProductDto.name).value : undefined;
      const brand = updateProductDto.brand ? new Brand(updateProductDto.brand).value : undefined;
      const description = updateProductDto.description
        ? new Description(updateProductDto.description).value
        : undefined;

      const response = await ProductService.updateProduct(
        product_uuid.getValue(),
        {
          category_id,
          name,
          brand,
          description
        },
        { token_user_uuid: req.body.token_user_uuid, token_role_id: req.body.token_role_id }
      );
      if (response.success) {
        res.status(HttpResponseCodes.OK).json(response);
      } else {
        res.status(HttpResponseCodes.BAD_REQUEST).json(response);
      }
    } catch (error) {
      console.error(error);
      if (error instanceof ValueObjectException) {
        res.status(HttpResponseCodes.BAD_REQUEST).json({ success: false, message: error.message });
      } else {
        res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
      }
    }
  }

  static async updateVariant(req: Request, res: Response) {
    try {
      const variant_uuid = new Uuid(req.params.variantUuid);
      const updateVariantDto: UpdateVariantDto = req.body;
      const size_id = updateVariantDto.size_id ? new SizeId(updateVariantDto.size_id).value : undefined;
      const material_id = updateVariantDto.material_id ? new MaterialId(updateVariantDto.material_id).value : undefined;
      const color_id = updateVariantDto.color_id ? new ColorId(updateVariantDto.color_id).value : undefined;
      const upc = updateVariantDto.upc ? new Upc(updateVariantDto.upc).value : undefined;
      const sku = updateVariantDto.sku ? new Sku(updateVariantDto.sku).value : undefined;
      const stock = updateVariantDto.stock ? new Stock(updateVariantDto.stock).value : undefined;
      const price = updateVariantDto.price ? new ProductPrice(updateVariantDto.price).value : undefined;
      const response = await ProductService.updateVariant(
        variant_uuid.getValue(),
        {
          size_id,
          material_id,
          color_id,
          upc,
          sku,
          stock,
          price
        },
        { token_user_uuid: req.body.token_user_uuid, token_role_id: req.body.token_role_id }
      );
      if (response.success) {
        res.status(HttpResponseCodes.OK).json(response);
      } else {
        res.status(HttpResponseCodes.BAD_REQUEST).json(response);
      }
    } catch (error) {
      console.error(error);
      if (error instanceof ValueObjectException) {
        res.status(HttpResponseCodes.BAD_REQUEST).json({ success: false, message: error.message });
      } else {
        res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
      }
    }
  }

  static async getVariantById(req: Request, res: Response) {
    try {
      const variant_uuid = new Uuid(req.params.variantUuid);
      const response = await ProductService.getVariantById(variant_uuid.getValue());
      if (response.success) {
        res.status(HttpResponseCodes.OK).json(response);
      } else {
        res.status(HttpResponseCodes.BAD_REQUEST).json(response);
      }
    } catch (error) {
      console.error(error);
      if (error instanceof ValueObjectException) {
        res.status(HttpResponseCodes.BAD_REQUEST).json({ success: false, message: error.message });
      } else {
        res.status(HttpResponseCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' });
      }
    }
  }
}
