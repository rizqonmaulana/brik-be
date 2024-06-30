import { Order, OrderItem, User, ProductOrder } from "../model";

import { CreateOrder } from "../interface/orderInterface";
    
  const OrderService = {
    async getAllOrders(option?: any){
        return await Order.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'name']
                },
                {
                    model: OrderItem,
                    attributes: ['id', 'quantity'],
                    include: [
                        {
                          model: ProductOrder,
                          attributes: ['id', 'name', 'price', 'imageUrl'],
                        }
                    ]
                }
            ],
            ...option
        })
    },

    async getOrderById(id: number){
        return await Order.findOne({
            include: [
                {
                    model: User,
                    attributes: ['id', 'name']
                },
                {
                    model: OrderItem,
                    attributes: ['id', 'quantity'],
                    include: [
                        {
                          model: ProductOrder,
                          attributes: ['id', 'name', 'price', 'imageUrl'],
                        }
                    ]
                }
            ],
            where: {
                id: id
            }
        })
    },
    
    async createOrder(newOrder: CreateOrder, option?: any){
        return await Order.create(newOrder, option)
    },

    async createOrderItem({orderId, productOrderIds}:{ orderId?: number; productOrderIds: any[] }, option?:any) {
        const newOrderItem = productOrderIds.map((item:any) => {
            return {
              orderId: orderId,
              productOrderId: item?.id,
              quantity: item?.quantity
            }
        })
        
        return await OrderItem.bulkCreate(newOrderItem, option)
    },

    async updateOrder({orderId, totalPrice}:{orderId?: number, totalPrice?: number}, option?:any ){
        return await Order.update({totalPrice}, {where: {id: orderId}, ...option})
    },
  };
  
  export default OrderService;
  