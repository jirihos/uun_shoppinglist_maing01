//@@viewOn:imports
import { createVisualComponent, Utils, useAppBackground } from "uu5g05";
import { Toggle, UuGds } from "uu5g05-elements";
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

const DarkModeToggle = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DarkModeToggle",
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
    const [background, setBackground] = useAppBackground();
    const darkMode = background === "dark";

    function handleToggle() {
      setBackground({
        backgroundColor: darkMode ? null : UuGds.ColorPalette.getValue(["building", "dark", "main"]),
      });
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, DarkModeToggle);

    return currentNestingLevel ? (
      <Toggle
        value={!darkMode}
        onChange={handleToggle}
        iconOff="uugdsstencil-weather-moon"
        iconOn="uugdsstencil-weather-sun"
        {...attrs}
      />
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { DarkModeToggle };
export default DarkModeToggle;
//@@viewOff:exports
