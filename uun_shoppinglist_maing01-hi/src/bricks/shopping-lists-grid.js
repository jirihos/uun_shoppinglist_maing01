//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import Uu5TilesElements from "uu5tilesg02-elements";
import Config from "./config/config.js";
import { useShoppingLists } from "../contexts/shopping-lists-context.js";
import ShoppingListsTile from "./shopping-lists-tile.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      margin: "10px",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ShoppingListsGrid = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingListsGrid",
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
    const { filteredShoppingLists } = useShoppingLists();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ShoppingListsGrid);

    return currentNestingLevel ? (
      <Uu5TilesElements.Grid
        data={filteredShoppingLists}
        tileMinWidth={480}
        tileMaxWidth={768}
        verticalGap={10}
        horizontalGap={10}
        {...attrs}
      >
        {(props) => <ShoppingListsTile {...props} />}
      </Uu5TilesElements.Grid>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShoppingListsGrid };
export default ShoppingListsGrid;
//@@viewOff:exports
