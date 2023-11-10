//@@viewOn:imports
import { createVisualComponent, Utils, useLsi } from "uu5g05";
import { Line } from "uu5g05-elements";
import Config from "./config/config.js";
import ShoppingList from "../shopping-list.js";
import MemberList from "../member-list.js";
import { useShoppingList } from "../../contexts/shopping-list-context.js";
import Error from "../error.js";
import importLsi from "../../lsi/import-lsi.js";
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

const DetailPageLayout = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DetailPageLayout",
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
    const lsi = useLsi(importLsi, [DetailPageLayout.uu5Tag]);
    const { state, errorData } = useShoppingList();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, DetailPageLayout);

    return currentNestingLevel ? (
      <div {...attrs}>
        {state === "error" && errorData.code === "shoppingListNotFound" && (
          <Error title={lsi.notFoundTitle}>{lsi.notFound}</Error>
        )}

        {state === "error" && errorData.code === "shoppingListNoAccess" && (
          <Error title={lsi.noAccessTitle}>{lsi.noAccess}</Error>
        )}

        {state === "ready" && (
          <>
            <ShoppingList />
            <Line margin="12px 0" />
            <MemberList />
          </>
        )}
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { DetailPageLayout };
export default DetailPageLayout;
//@@viewOff:exports
