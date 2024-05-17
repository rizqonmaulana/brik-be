import { Request, Response } from 'express';

import ProductService from '../service/productService';
import { successResponse, errorResponse } from '../helper/response';

const ProductController = {
  async getAllProduct(req: Request, res: Response) {
    try {
      const page: number | null = req.query.page ? parseInt(req.query.page as string) : null;
      const limit: number | null = req.query.limit ? parseInt(req.query.limit as string) : null;

      const pagination = {
        page: page,
        limit: limit
      }

      const products = await ProductService.getAllProducts(req.query, {attributes: ['id', 'name', 'price', 'stock', 'imageUrl', 'categoryId']});
      const getCounts = await ProductService.getAndCountAllProducts(req.query, {})

      const result = {
        data: products,
        pagination: {
          ...pagination,
          totalData: getCounts.count,
          totalPage: Math.ceil(getCounts.count / (limit ? limit : getCounts.count)),
        }
      }

      res.json(successResponse('Products retrieved successfully', result))
    } catch (error: any) {
      res.status(500).json(errorResponse('An error occurred while retrieving products', error.message));
    }
  },

  async getProductById(req: Request, res: Response) {
    try {
      const productId = parseInt(req.params.id);

      const product = await ProductService.getProduct({where: {id: productId}});

      if(!product) return res.status(404).json(errorResponse('Product not found'))

      res.json(successResponse('Product retrieved successfully', product))
    } catch (error: any) {
      res.status(500).json(errorResponse('An error occurred while retrieving the product', error.message));
    }
  },

  async createProduct(req: Request, res: Response) {
    try {
      const newProduct = await ProductService.createProduct(req.body);

      res.json(successResponse('Product created successfully', newProduct))
    } catch (error: any) {
      res.status(500).json(errorResponse('An error occurred while creating the product', error.message));
    }
  },

  async updateProduct(req: Request, res: Response) {
    try {
        const productId = parseInt(req.params.id)

        const product = await ProductService.getProduct({where: {id: productId}});
        if(!product) return res.status(404).json(errorResponse('Product not found'))

        const updatedProduct = await ProductService.updateProduct(productId, req.body);

        // If no rows were updated, return failed message. 0=failed, 1=success
        if(updatedProduct[0] === 0) throw Error()

        const newProduct = await ProductService.getProduct({where: {id: productId}});

        res.json(successResponse('Product updated successfully', newProduct));
    } catch (error: any) {
        res.status(500).json(errorResponse('An error occurred while updating the product', error.message));
    }
  },

  async deleteProduct(req: Request, res: Response) {
    try {
        const productId = parseInt(req.params.id);

        const deletedProduct = await ProductService.deleteProduct(productId);

        if (!deletedProduct) return res.status(404).json(errorResponse('Product not found'));

        res.json(successResponse('Product deleted successfully'));
    } catch (error: any) {
        res.status(500).json(errorResponse('An error occurred while deleting the product', error.message));
    }
}
};

export default ProductController;
