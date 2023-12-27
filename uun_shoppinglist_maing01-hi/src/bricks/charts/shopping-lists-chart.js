//@@viewOn:imports
import { createVisualComponent, Utils, useLsi } from "uu5g05";
import Uu5Charts from "uu5chartsg01";
import Config from "./config/config.js";
import { useShoppingLists } from "../../contexts/shopping-lists-context.js";
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

const ShoppingListsChart = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingListsChart",
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
    const { filteredShoppingLists } = useShoppingLists();

    const lsi = useLsi(importLsi, [ShoppingListsChart.uu5Tag]);

    const serieList = [
      {
        valueKey: "itemListCount",
        title: lsi.numberOfItems,
        colorScheme: (shoppingList) => {
          if (shoppingList.archived) {
            return "orange";
          } else {
            return "primary";
          }
        },
        label: {
          position: "inside",
        },
        bar: {
          maxWidth: 200,
        },
        legend: [
          { title: lsi.active, colorScheme: "primary" },
          { title: lsi.archived, colorScheme: "orange" },
        ],
      },
    ];

    const labelAxis = {
      dataKey: "name",
    };

    const valueAxis = {
      title: lsi.numberOfItems,
      domain: [0, "dataMax"],
    };
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ShoppingListsChart);

    return currentNestingLevel ? (
      <Uu5Charts.XyChart
        data={filteredShoppingLists}
        serieList={serieList}
        labelAxis={labelAxis}
        valueAxis={valueAxis}
        legend
        {...attrs}
      />
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShoppingListsChart };
export default ShoppingListsChart;
//@@viewOff:exports
