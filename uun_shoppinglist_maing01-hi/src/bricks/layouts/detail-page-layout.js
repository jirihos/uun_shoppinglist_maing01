//@@viewOn:imports
import { createVisualComponent, Utils, useLsi, useScreenSize, PropTypes } from "uu5g05";
import { Grid, Line } from "uu5g05-elements";
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
  main: (routeBarHeight, desktopLayout) =>
    Config.Css.css({
      height: routeBarHeight && desktopLayout ? `calc(100% - ${routeBarHeight - 1}px)` : null,
      maxWidth: "1920px",
      margin: "auto",
    }),
  noTopMargin: () => Config.Css.css({ marginTop: "0" }),
  fullHeight: () => Config.Css.css({ height: "100%" }),
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
  propTypes: {
    routeBarHeight: PropTypes.number,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { routeBarHeight } = props;

    const lsi = useLsi(importLsi, [DetailPageLayout.uu5Tag]);
    const { state, errorData } = useShoppingList();

    const [screenSize] = useScreenSize();
    const desktopLayout = ["l", "xl"].includes(screenSize);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main(routeBarHeight, desktopLayout));
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, DetailPageLayout);

    return currentNestingLevel ? (
      <div {...attrs}>
        {state === "error" && errorData.code === "shoppingListNotFound" && (
          <Error title={lsi.notFoundTitle} className={Css.noTopMargin()}>
            {lsi.notFound}
          </Error>
        )}

        {state === "error" && errorData.code === "shoppingListNoAccess" && (
          <Error title={lsi.noAccessTitle} className={Css.noTopMargin()}>
            {lsi.noAccess}
          </Error>
        )}

        {state === "ready" && (
          <Grid
            templateRows={{ xs: "auto auto auto", l: "auto" }}
            templateColumns={{ xs: "auto", l: "1fr auto 486px" }}
            columnGap={4}
            className={Css.fullHeight()}
          >
            <Grid.Item>
              <ShoppingList />
            </Grid.Item>
            <Grid.Item>
              <Line
                margin={desktopLayout ? "0 0" : "12px 0"}
                direction={desktopLayout ? "vertical" : "horizontal"}
                className={Css.fullHeight()}
              />
            </Grid.Item>
            <Grid.Item>
              <MemberList />
            </Grid.Item>
          </Grid>
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
