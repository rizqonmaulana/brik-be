import Sequelize, { Op } from "sequelize";

import { Product, ProductOrder } from "../model";

import { ProductInterface, CreateProduct, UpdateProduct, StockProductCheck, StockCheckResponse } from "../interface/productInterface";
    
  const ProductService = {
    async getAllProducts(where?: any, option?: any) {
        const { page, limit, sort, ...whereConditions } = where || {};

        if(whereConditions.name === '') delete whereConditions.name
        if(whereConditions.sort === '') delete whereConditions.sort
        if(whereConditions.categoryId == 0) delete whereConditions.categoryId

        if (whereConditions.name) {
            whereConditions.name = { [Sequelize.Op.iLike]: `%${whereConditions.name}%` };
        }

        const offset = page ? (page - 1) * limit : 0;
        let order: any[] = [['id', 'ASC']]; // Default sorting by id in ascending order

        if (sort) {
            const [sortColumn, sortDirection] = sort.split(',');

            if (sortColumn === 'price') {
                order = [[sortColumn, sortDirection]]; // Don't use `lower` for 'price'
            } else {
                order = [[Sequelize.fn('lower', Sequelize.col(sortColumn)), sortDirection]];
            }
        }

        return await Product.findAll({
            where: whereConditions,
            offset,
            limit,
            order,
            ...option
        });
    },
    
    async getAndCountAllProducts(where?: any, option?: any) {
        if(where.name === '') delete where.name
        if(where.sort === '') delete where.sort
        if(where.categoryId == 0) delete where.categoryId

        if(where && where.name)  where.name = { [Sequelize.Op.iLike]: `%${where.name}%` };

        if(where && where.page) delete where.page
        if(where && where.limit) delete where.limit
        if(where && where.sort) delete where.sort

        return await Product.findAndCountAll({
            where: where,
            ...option
        });
    },

    async checkProductStock(products: StockProductCheck[], getProducts:ProductInterface[]){
        const response: StockCheckResponse = {
            isSufficient: true,
            errors: []
        };

        for (const product of products) {
            const stockItem = getProducts.find(item => item.id === product.productId);
            if (!stockItem) {
              response.isSufficient = false;
              response.errors.push(`Product with ID ${product.productId} is not available.`);
            } else if (stockItem.stock < product.quantity) {
              response.isSufficient = false;
              response.errors.push(`Product with ID ${product.productId} does not have enough stock. Requested: ${product.quantity}, Available: ${stockItem.stock}.`);
            }
          }
        
          return response;
    },

    async createProductOrder(products: StockProductCheck[], getProducts:ProductInterface[]) {
        const productOrders = getProducts.map(item => {
            const quantity = products.find(product => product.productId === item.id);
            const { id, name, price, description, categoryId, imageUrl } = item

            return { 
                name, 
                price, 
                description, 
                categoryId, 
                imageUrl, 
                quantity: quantity?.quantity ?? 0, 
                productId: id ?? 0
            }
        })

        return await ProductOrder.bulkCreate(productOrders)
    },

    async updateStock(products: StockProductCheck[], getProducts:ProductInterface[], option?: any){
        const updatedStocks = getProducts.map(product => {
            const orderItem = products.find(item => item.productId === product.id);
            const newStock = orderItem ? product.stock - orderItem.quantity : product.stock;
          
            return {
              id: product.id,
              stock: newStock
            };
        });
          
        for (const order of updatedStocks) {
            await Product.update(
              { stock: order.stock },
              { where: { id: order.id }, ...option }
            );
        }
    },

    async countTotalPrice(products: StockProductCheck[], getProducts:ProductInterface[]){
        let total = 0

        getProducts.map(product => {
            const orderedItem = products.find(item => item.productId === product.id);

            if(orderedItem) total += orderedItem?.quantity * product.price
        });

        return total
    },
    
    async getProduct(option?: any){
        return await Product.findOne({...option})
    },
  
    async createProduct(newProduct: CreateProduct){
        return await Product.create(newProduct)
    },

    async updateProduct(productId: number, updateProduct: UpdateProduct){
        return await Product.update(updateProduct, {where: {id: productId}})
    },

    async deleteProduct(productId: number){
        return await Product.destroy({where: {id: productId}})
    }

    // async checkUsername(username:string){
    //     return await User.findOne({where: {username}})
    // },
  
    // async getUserById(userId: number, option?: any){
    //     return await User.findOne({
    //         where: { id: userId },
    //         ...option
    //     })
    // },
  
    // async updateUser(id: number, updatedUser: Partial<User>): Promise<User | undefined> {
    //   const index = users.findIndex(user => user.id === id);
    //   if (index === -1) return undefined;
    //   users[index] = { ...users[index], ...updatedUser };
    //   return users[index];
    // },
  
    // async deleteUser(id: number): Promise<void> {
    //   const index = users.findIndex(user => user.id === id);
    //   if (index !== -1) users.splice(index, 1);
    // },
  };
  
  export default ProductService;
  