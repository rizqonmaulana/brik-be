import { Category } from "../model";
    
  const CategoryService = {
    async getAllCategories(option?: any){
        return await Category.findAll({...option})
    },
    
    async getCategory(option?: any){
        return await Category.findOne({...option})
    },
  
    async createCategory(newCategory: string){
        return await Category.create({name: newCategory})
    },

    async updateCategory(categoryId: number, updateCategory: string){
        return await Category.update({name: updateCategory}, {where: {id: categoryId}})
    },

    async deleteCategory(categoryId: number){
        return await Category.destroy({where: {id: categoryId}})
    }
  };
  
  export default CategoryService;
  