//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils } from "uu5g05";
import Uu5Forms from "uu5g05-forms";
import Config from "./config/config.js";
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

const ItemCheckbox = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ItemCheckbox",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    value: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onClick: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { value, onClick } = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ItemCheckbox);

    return currentNestingLevel ? (
      <Uu5Forms.Checkbox.Input
        size="xl"
        icon={value ? "uugds-check" : undefined}
        significance={value ? "highlighted" : undefined}
        value={value}
        onClick={onClick}
        {...attrs}
      />
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ItemCheckbox };
export default ItemCheckbox;
//@@viewOff:exports
