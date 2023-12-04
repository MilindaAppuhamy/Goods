import { Item } from "./item";
import { User } from "./user";

//User - Item association
User.hasMany(Item);
Item.belongsTo(User);
