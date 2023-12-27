//@@viewOn:imports
import { createVisualComponent, Utils, useLsi } from "uu5g05";
import Uu5Charts from "uu5chartsg01";
import Config from "./config/config.js";
import { useShoppingList } from "../../contexts/shopping-list-context.js";
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

const CompletedItemsChart = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "CompletedItemsChart",
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
    const { stats } = useShoppingList();

    const lsi = useLsi(importLsi, [CompletedItemsChart.uu5Tag]);

    const data = [];
    if (stats.incompleteCount > 0) {
      data.push({
        value: stats.incompleteCount,
        label: lsi.incompleteItemsLabel,
        type: "incomplete",
      });
    }
    if (stats.completedCount > 0) {
      data.push({
        value: stats.completedCount,
        label: lsi.completedItemsLabel,
        type: "completed",
      });
    }

    const serieList = [
      {
        valueKey: "value",
        labelKey: "label",
        label: [
          { position: "inside", type: "value" },
          { position: "outside", type: "label" },
        ],
        colorScheme: (item) => {
          if (item.type === "incomplete") {
            return "natural";
          } else {
            return "primary";
          }
        },
      },
    ];
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, CompletedItemsChart);

    return currentNestingLevel ? <Uu5Charts.PieChart data={data} serieList={serieList} {...attrs} /> : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { CompletedItemsChart };
export default CompletedItemsChart;
//@@viewOff:exports
