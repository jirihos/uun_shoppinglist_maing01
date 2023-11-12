//@@viewOn:imports
import { createVisualComponent, Utils, useLsi, useState, useSession } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5TilesElements from "uu5tilesg02-elements";
import Config from "./config/config.js";
import ShoppingListItem from "./shopping-list-item.js";
import { useShoppingList } from "../contexts/shopping-list-context.js";
import EditShoppingListNameModal from "./modals/edit-shopping-list-name-modal.js";
import AddItemModal from "./modals/add-item-modal.js";
import importLsi from "../lsi/import-lsi.js";
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
  editNameBtn: () =>
    Config.Css.css({
      verticalAlign: "middle",
    }),
  archivedIcon: () =>
    Config.Css.css({
      display: "inline-block",
      verticalAlign: "sub",
      marginLeft: "10px",
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
    const { filteredShoppingList, includeCompleted, setIncludeCompleted, rename, addItem } = useShoppingList();
    const { name, archived, ownerUuIdentity, itemList } = filteredShoppingList;

    const [editNameModalOpen, setEditNameModalOpen] = useState(false);
    const [addItemModalOpen, setAddItemModalOpen] = useState(false);

    const { identity } = useSession();
    const isOwner = ownerUuIdentity === identity.uuIdentity;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ShoppingList);

    return currentNestingLevel ? (
      <div {...attrs}>
        <div>
          <Uu5Elements.Text category="expose" segment="default" type="hero" autoFit>
            {name}{" "}
            {!archived && isOwner && (
              <Uu5Elements.Button
                icon="uugds-pencil"
                onClick={() => setEditNameModalOpen(true)}
                className={Css.editNameBtn()}
              />
            )}
          </Uu5Elements.Text>
          {archived && (
            <Uu5Elements.RichIcon
              icon="uugdssvg-svg-product"
              colorScheme="orange"
              significance="highlighted"
              tooltip={lsi.archived}
              className={Css.archivedIcon()}
            />
          )}
        </div>
        <div>
          <Uu5Elements.Toggle
            label={lsi.includeCompleted}
            value={includeCompleted}
            onChange={() => setIncludeCompleted(!includeCompleted)}
          />
        </div>
        <div className={Css.addItemBtnDiv()}>
          {!archived && (
            <Uu5Elements.Button
              onClick={() => setAddItemModalOpen(true)}
              colorScheme="primary"
              significance="highlighted"
            >
              {lsi.addItemBtn}
            </Uu5Elements.Button>
          )}
        </div>

        <Uu5TilesElements.Grid data={itemList} itemIdentifier="uuIdentity" verticalGap={10}>
          {(props) => <ShoppingListItem {...props} archived={archived} />}
        </Uu5TilesElements.Grid>

        {editNameModalOpen && (
          <EditShoppingListNameModal
            onSubmit={(name) => {
              setEditNameModalOpen(false);
              rename(name);
            }}
            onClose={() => setEditNameModalOpen(false)}
          />
        )}
        {addItemModalOpen && (
          <AddItemModal
            onSubmit={(item) => {
              item.completed = false;
              addItem(item);
              setAddItemModalOpen(false);
            }}
            onClose={() => setAddItemModalOpen(false)}
          />
        )}
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShoppingList };
export default ShoppingList;
//@@viewOff:exports
