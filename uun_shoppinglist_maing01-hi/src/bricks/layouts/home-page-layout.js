//@@viewOn:imports
import { createVisualComponent, useLsi, Utils } from "uu5g05";
import { Pending } from "uu5g05-elements";
import Config from "./config/config.js";
import HomeToolbar from "../home-toolbar.js";
import ShoppingListsGrid from "../shopping-lists-grid.js";
import { useShoppingLists } from "../../contexts/shopping-lists-context.js";
import Error from "../error.js";
import importLsi from "../../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      padding: "10px",
    }),
  grid: () =>
    Config.Css.css({
      margin: "auto",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const HomePageLayout = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "HomePageLayout",
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
    const lsi = useLsi(importLsi, [HomePageLayout.uu5Tag]);
    const { state, error } = useShoppingLists();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, HomePageLayout);

    return currentNestingLevel ? (
      <div {...attrs}>
        <HomeToolbar />

        {(state === "error" || state === "errorNoData") && <Error title={lsi.errorTitle}>{error.trace}</Error>}

        {(state === "pending" || state === "pendingNoData" || state === "itemPending" || state === "readyNoData") && (
          <Pending size="max" />
        )}

        {state === "ready" && <ShoppingListsGrid className={Css.grid()} />}
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { HomePageLayout };
export default HomePageLayout;
//@@viewOff:exports
