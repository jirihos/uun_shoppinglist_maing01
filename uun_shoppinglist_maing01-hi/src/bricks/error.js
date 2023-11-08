//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, useAppBackground } from "uu5g05";
import { Block } from "uu5g05-elements";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      margin: "8px",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const Error = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Error",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    title: PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { title, children } = props;

    const [background] = useAppBackground();
    const darkMode = background === "dark";
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, Error);

    return currentNestingLevel ? (
      <Block
        header={title}
        headerType="title"
        card="full"
        colorScheme="negative"
        significance={darkMode ? "distinct" : "highlighted"}
        {...attrs}
      >
        {children}
      </Block>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Error };
export default Error;
//@@viewOff:exports
