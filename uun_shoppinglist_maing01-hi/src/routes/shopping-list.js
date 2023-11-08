//@@viewOn:imports
import { createVisualComponent, useLsi, useRoute, Utils } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import ShoppingListComponent from "../bricks/shopping-list.js";
import RouteBar from "../core/route-bar.js";
import ShoppingListProvider from "../bricks/providers/shopping-list-provider.js";
import Error from "../bricks/error.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let ShoppingList = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingList",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [route] = useRoute();
    let shoppingListId = route.params?.id;

    let lsi = useLsi(importLsi, ["UunShoppinglist.Routes.ShoppingList"]);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ShoppingList);

    return currentNestingLevel ? (
      <div {...attrs}>
        <RouteBar />

        {shoppingListId ? (
          <ShoppingListProvider shoppingListId={shoppingListId}>
            <ShoppingListComponent />
          </ShoppingListProvider>
        ) : (
          <Error title={lsi.paramErrorTitle}>{lsi.paramError}</Error>
        )}
      </div>
    ) : null;
    //@@viewOff:render
  },
});

ShoppingList = withRoute(ShoppingList, { authenticated: true });

//@@viewOn:exports
export { ShoppingList };
export default ShoppingList;
//@@viewOff:exports
