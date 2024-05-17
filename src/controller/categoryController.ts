import { Request, Response } from 'express';

import CategoryService from '../service/categoryService';
import { successResponse, errorResponse } from '../helper/response';

const CategoryController = {
  async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await CategoryService.getAllCategories();

      res.json(successResponse('Categories retrieved successfully', categories))
    } catch (error: any) {
      res.status(500).json(errorResponse('An error occurred while retrieving categorys', error.message));
    }
  },

  async createCategory(req: Request, res: Response) {
    try {
      const { name } = req.body

      const newCategory = await CategoryService.createCategory(name);

      res.json(successResponse('Category created successfully', newCategory))
    } catch (error: any) {
      res.status(500).json(errorResponse('An error occurred while creating the category', error.message));
    }
  },

  async updateCategory(req: Request, res: Response) {
    try {
        const categoryId = parseInt(req.params.id)
        const { name } = req.body

        const category = await CategoryService.getCategory({where: {id: categoryId}});
        if(!category) return res.status(404).json(errorResponse('Category not found'))

        const updatedCategory = await CategoryService.updateCategory(categoryId, name);

        // If no rows were updated, return failed message. 0=failed, 1=success
        if(updatedCategory[0] === 0) throw Error()

        const newCategory = await CategoryService.getCategory({where: {id: categoryId}});

        res.json(successResponse('Category updated successfully', newCategory));
    } catch (error: any) {
        res.status(500).json(errorResponse('An error occurred while updating the category', error.message));
    }
  },

  async deleteCategory(req: Request, res: Response) {
    try {
        const categoryId = parseInt(req.params.id);

        const deletedCategory = await CategoryService.deleteCategory(categoryId);

        if (!deletedCategory) return res.status(404).json(errorResponse('Category not found'));

        res.json(successResponse('Category deleted successfully'));
    } catch (error: any) {
        res.status(500).json(errorResponse('An error occurred while deleting the category', error.message));
    }
}
};

export default CategoryController;
