//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import Config from "./config/config.js";
import HomeToolbar from "../home-toolbar.js";
import ShoppingListsGrid from "../shopping-lists-grid.js";
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
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, HomePageLayout);

    return currentNestingLevel ? (
      <div {...attrs}>
        <HomeToolbar />
        <ShoppingListsGrid />
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { HomePageLayout };
export default HomePageLayout;
//@@viewOff:exports
