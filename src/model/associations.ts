import User from './user';
import Order from './order';
import Category from './category';
import OrderItem from './orderItem';
import Product from './product';
import ProductOrder from './productOrder';
import Cart from './cart';

// Define associations
const defineAssociations = () => {
    User.hasMany(Order, { foreignKey: 'userId' })
    Order.belongsTo(User, { foreignKey: 'userId' })

    User.hasMany(Cart, { foreignKey: 'userId' })
    Cart.belongsTo(User, { foreignKey: 'userId' })

    Order.hasMany(OrderItem, { foreignKey: 'orderId' })
    OrderItem.belongsTo(Order, { foreignKey: 'orderId' })

    ProductOrder.hasOne(OrderItem, { foreignKey: 'productOrderId' })
    OrderItem.belongsTo(ProductOrder, { foreignKey: 'productOrderId' })

    Product.hasMany(ProductOrder, { foreignKey: 'productId' })
    ProductOrder.belongsTo(Product, { foreignKey: 'productId' })

    Product.hasMany(Cart, { foreignKey: 'productId' })
    Cart.belongsTo(Product, { foreignKey: 'productId' })  

    Category.hasMany(Product, { foreignKey: 'categoryId' })
    Category.hasMany(ProductOrder, { foreignKey: 'categoryId' })
    Product.belongsTo(Category, { foreignKey: 'categoryId' })
    ProductOrder.belongsTo(Category, { foreignKey: 'categoryId' })


}

export default defineAssociations;
