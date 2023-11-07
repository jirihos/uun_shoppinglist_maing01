//@@viewOn:imports
import { createVisualComponent, Lsi, useLsi, useRoute } from "uu5g05";
import Plus4U5App from "uu_plus4u5g02-app";

import { Button } from "uu5g05-elements";
import Config from "./config/config.js";
import DarkModeToggle from "./dark-mode-toggle.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const RouteBar = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RouteBar",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi, [RouteBar.uu5Tag]);
    const [, setRoute] = useRoute();

    const actionList = [
      {
        component: <DarkModeToggle />,
      },
      {
        children: lsi.home,
        onClick: () => setRoute("home"),
        collapsed: true,
      },
      {
        children: <Lsi import={importLsi} path={["Menu", "about"]} />,
        onClick: () => setRoute("about"),
        collapsed: true,
      },
    ];
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Plus4U5App.PositionBar actionList={actionList} view="short" {...props}>
        <Button colorScheme="created" onClick={() => setRoute("home")}>
          {lsi.home}
        </Button>
      </Plus4U5App.PositionBar>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RouteBar };
export default RouteBar;
//@@viewOff:exports
