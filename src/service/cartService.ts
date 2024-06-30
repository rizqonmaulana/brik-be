import { Cart, Product }from "../model/index";
    
  const CartService = {    
    async getCart(option?: any){
        return await Cart.findAll({include: {
            model: Product,
            attributes: ['name', 'imageUrl', 'price']
        },...option})
    },
  
    async createOrUpdateCart({userId, productId}: {userId: number, productId: number}){
        const getSameCart = await Cart.findOne({where: {userId, productId}})
        
        if(getSameCart && getSameCart?.quantity) {
            const updatedQuantity = getSameCart.quantity + 1;

            await Cart.update({quantity: updatedQuantity}, {where: { id: getSameCart.id }})
            return await Cart.findOne({where: {userId, productId}})
        }

        return await Cart.create({userId, productId, quantity: 1})
    },

    async deleteCartByUserId(userId: number, option?:any){
        return await Cart.destroy({where: {userId}, ...option})
    },

    async deleteCart(cartId: number){
        return await Cart.destroy({where: {id: cartId}})
    }
  };
  
  export default CartService;
  