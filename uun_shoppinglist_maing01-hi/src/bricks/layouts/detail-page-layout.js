//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import { Line } from "uu5g05-elements";
import Config from "./config/config.js";
import ShoppingList from "../shopping-list.js";
import MemberList from "../member-list.js";
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
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, DetailPageLayout);

    return currentNestingLevel ? (
      <div {...attrs}>
        <ShoppingList />
        <Line margin="12px 0" />
        <MemberList />
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { DetailPageLayout };
export default DetailPageLayout;
//@@viewOff:exports
