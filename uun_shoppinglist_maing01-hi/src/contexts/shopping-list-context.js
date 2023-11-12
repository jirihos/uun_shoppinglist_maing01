//@@viewOn:imports
import { Utils } from "uu5g05";
//@@viewOff:imports

export const [Context, useShoppingList] = Utils.Context.create({
  state: "error",
  errorData: { code: "shoppingListNotFound" },
});
export default Context;
