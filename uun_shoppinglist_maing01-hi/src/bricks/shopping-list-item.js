//@@viewOn:imports
import { PropTypes, Utils, createVisualComponent, useState, useLsi, useAppBackground } from "uu5g05";
import Uu5Elements, { Grid, UuGds } from "uu5g05-elements";
import Uu5TilesElements from "uu5tilesg02-elements";
import Config from "./config/config.js";
import ItemCheckbox from "./item-checkbox.js";
import { useShoppingList } from "../contexts/shopping-list-context.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
const DARK_COLOR = UuGds.ColorPalette.getValue(["building", "dark", "mainLighter"]);
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
  additionalText: () =>
    Config.Css.css({
      paddingLeft: "8px",
      paddingTop: "4px",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ShoppingListItem = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingListItem",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    data: PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      amount: PropTypes.number,
      unit: PropTypes.string,
      price: PropTypes.number,
      currency: PropTypes.string,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
    archived: PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    archived: false,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { data, archived } = props;
    const { id, text, amount, unit, totalPrice, currency, completed } = data;

    const lsi = useLsi(importLsi, [ShoppingListItem.uu5Tag]);
    const { setCompleted, deleteItem } = useShoppingList();

    const [background] = useAppBackground();
    const darkMode = background === "dark";

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    function handleCheckbox() {
      setCompleted(id, !completed);
    }

    function handleDelete() {
      deleteItem(id);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ShoppingListItem);

    return currentNestingLevel ? (
      <Uu5TilesElements.Tile {...attrs}>
        <Grid templateColumns="40px auto 60px" alignItems="center" columnGap={10}>
          <Grid.Item justifySelf="center">
            <ItemCheckbox value={completed} onClick={handleCheckbox} readOnly={archived} />
          </Grid.Item>
          <Grid.Item>
            <div className={Css.additionalText()}>
              <Uu5Elements.Text category="interface" segment="content" type="large" colorScheme="dim" autoFit>
                {amount} {unit}
              </Uu5Elements.Text>
            </div>
            <div>
              <Uu5Elements.Text category="interface" segment="title" type="common" autoFit>
                {text}
              </Uu5Elements.Text>
            </div>
            <div className={Css.additionalText()}>
              <Uu5Elements.Text category="interface" segment="content" type="large" colorScheme="dim" autoFit>
                {totalPrice} {currency}
              </Uu5Elements.Text>
            </div>
          </Grid.Item>
          <Grid.Item>
            <Uu5Elements.Button
              icon="uugds-delete"
              colorScheme="important"
              size="xl"
              onClick={() => setDeleteDialogOpen(true)}
              hidden={archived}
            />
          </Grid.Item>
        </Grid>

        <Uu5Elements.Dialog
          style={{ backgroundColor: darkMode && DARK_COLOR }} // fixes a possible bug in uu5
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          header={lsi.deleteHeader}
          info={<Uu5Elements.Text autoFit>{data.text}</Uu5Elements.Text>}
          actionDirection="horizontal"
          actionList={[
            {
              children: lsi.cancel,
              significance: "distinct",
            },
            {
              children: lsi.delete,
              onClick: handleDelete,
              colorScheme: "red",
              significance: "highlighted",
            },
          ]}
        />
      </Uu5TilesElements.Tile>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShoppingListItem };
export default ShoppingListItem;
//@@viewOff:exports
