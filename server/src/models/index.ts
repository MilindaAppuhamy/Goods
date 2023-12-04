import { CartItem } from "./cartItem";
import { Item } from "./item";
import { User } from "./user";

//User - Item association
User.hasMany(Item);
Item.belongsTo(User);

//User - CartItem association
User.hasMany(CartItem);
CartItem.belongsTo(User);
