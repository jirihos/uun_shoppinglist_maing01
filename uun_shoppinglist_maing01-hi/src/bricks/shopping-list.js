//@@viewOn:imports
import { createVisualComponent, Utils, useLsi, useState } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5TilesElements from "uu5tilesg02-elements";
import Config from "./config/config.js";
import ShoppingListItem from "./shopping-list-item.js";
import importLsi from "../lsi/import-lsi.js";
import { useShoppingList } from "../contexts/shopping-list-context.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      padding: "10px",
      textAlign: "center",
    }),
  nameDiv: () =>
    Config.Css.css({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }),
  editBtn: () =>
    Config.Css.css({
      marginLeft: "16px",
    }),
  addItemBtnDiv: () =>
    Config.Css.css({
      marginTop: "12px",
      marginBottom: "9px",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ShoppingList = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingList",
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
    const lsi = useLsi(importLsi, [ShoppingList.uu5Tag]);
    const { filteredShoppingList, includeCompleted, setIncludeCompleted } = useShoppingList();
    const [addItemModalOpen, setAddItemModalOpen] = useState(false);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ShoppingList);

    return currentNestingLevel ? (
      <div {...attrs}>
        <div className={Css.nameDiv()}>
          <Uu5Elements.Text category="expose" segment="default" type="hero">
            {filteredShoppingList.name}
          </Uu5Elements.Text>
          <Uu5Elements.Button icon="uugds-pencil" className={Css.editBtn()} />
        </div>
        <div>
          <Uu5Elements.Toggle
            label={lsi.includeCompleted}
            value={includeCompleted}
            onChange={() => setIncludeCompleted(!includeCompleted)}
          />
        </div>
        <div className={Css.addItemBtnDiv()}>
          <Uu5Elements.Button
            onClick={() => setAddItemModalOpen(true)}
            colorScheme="primary"
            significance="highlighted"
          >
            {lsi.addItemBtn}
          </Uu5Elements.Button>
        </div>

        <Uu5TilesElements.Grid data={filteredShoppingList.itemList} verticalGap={10}>
          <ShoppingListItem />
        </Uu5TilesElements.Grid>

        {/* TODO: edit name modal */}
        {/* TODO: add item modal */}
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShoppingList };
export default ShoppingList;
//@@viewOff:exports
