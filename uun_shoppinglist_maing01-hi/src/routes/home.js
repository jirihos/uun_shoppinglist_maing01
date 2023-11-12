//@@viewOn:imports
import { Utils, createVisualComponent, useRoute } from "uu5g05";
import { Button, Grid } from "uu5g05-elements";
import { withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      textAlign: "center",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let Home = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Home",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [, setRoute] = useRoute();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    return (
      <div {...attrs}>
        <RouteBar hideHomeBtn={true} />

        <Grid rowGap={28}>
          <Grid.Item>
            <Button
              colorScheme="warning"
              size="xl"
              onClick={() => setRoute("shoppingList", { id: "c3a2faebc331484ba8477923" })}
            >
              První nákupní seznam
            </Button>
          </Grid.Item>
          <Grid.Item>
            <Button
              colorScheme="warning"
              size="xl"
              onClick={() => setRoute("shoppingList", { id: "169155d9c45a4262b5052575" })}
            >
              Druhý nákupní seznam
            </Button>
          </Grid.Item>
          <Grid.Item>
            <Button
              colorScheme="warning"
              size="xl"
              onClick={() => setRoute("shoppingList", { id: "95fe2806959744c78dab6f6b" })}
            >
              Třetí nákupní seznam
            </Button>
          </Grid.Item>
          <Grid.Item>
            <Button
              colorScheme="warning"
              size="xl"
              onClick={() => setRoute("shoppingList", { id: "f30f25392ded469d9cc147f2" })}
            >
              Archivovaný nákupní seznam
            </Button>
          </Grid.Item>
          <Grid.Item>
            <Button
              colorScheme="warning"
              size="xl"
              onClick={() => setRoute("shoppingList", { id: "5c6448679b024966bf4a4540" })}
            >
              Nákupní seznam bez přístupu
            </Button>
          </Grid.Item>
          <Grid.Item>
            <Button
              colorScheme="warning"
              size="xl"
              onClick={() => setRoute("shoppingList", { id: "6674ee3dc4a74fa2873b4c41" })}
            >
              Neexistující nákupní seznam
            </Button>
          </Grid.Item>
        </Grid>
      </div>
    );
    //@@viewOff:render
  },
});

Home = withRoute(Home, { authenticated: true });

//@@viewOn:exports
export { Home };
export default Home;
//@@viewOff:exports
