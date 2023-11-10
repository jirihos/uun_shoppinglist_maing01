//@@viewOn:imports
import { PropTypes, createVisualComponent, Utils, useState, useLsi, useAppBackground } from "uu5g05";
import Uu5Elements, { Button, Grid, UuGds } from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import Uu5TilesElements from "uu5tilesg02-elements";
import Config from "./config/config.js";
import { useShoppingList } from "../contexts/shopping-list-context.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
const darkColor = UuGds.ColorPalette.getValue(["building", "dark", "mainLighter"]);
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
  personItem: () =>
    Config.Css.css({
      margin: "2px",
    }),
  personItemDialog: () =>
    Config.Css.css({
      margin: "12px 0",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const MemberTile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "MemberTile",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    data: PropTypes.shape({
      uuIdentity: PropTypes.string.isRequired,
      subtitle: PropTypes.string,
      showRemoveBtn: PropTypes.bool,
    }).isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { uuIdentity, subtitle, showRemoveBtn } = props.data;

    const lsi = useLsi(importLsi, [MemberTile.uu5Tag]);
    const [background] = useAppBackground();
    const darkMode = background === "dark";

    const { removeMember } = useShoppingList();
    const [removeDialogOpen, setRemoveDialogOpen] = useState(false);

    function handleRemove() {
      removeMember(uuIdentity);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, MemberTile);

    return currentNestingLevel ? (
      <Uu5TilesElements.Tile {...attrs}>
        <Grid templateColumns="auto 60px" alignItems="center">
          <Grid.Item>
            <Plus4U5Elements.PersonItem
              uuIdentity={uuIdentity}
              subtitle={subtitle}
              size="l"
              className={Css.personItem()}
            />
          </Grid.Item>
          <Grid.Item>
            <Button
              icon="uugds-log-out"
              colorScheme="important"
              size="xl"
              hidden={!showRemoveBtn}
              onClick={() => setRemoveDialogOpen(true)}
            />
          </Grid.Item>
        </Grid>

        <Uu5Elements.Dialog
          style={{ backgroundColor: darkMode && darkColor }} // fixes a possible bug in uu5
          open={removeDialogOpen}
          onClose={() => setRemoveDialogOpen(false)}
          header={lsi.removeHeader}
          info={<Plus4U5Elements.PersonItem uuIdentity={uuIdentity} size="l" className={Css.personItemDialog()} />}
          actionDirection="horizontal"
          actionList={[
            {
              children: lsi.cancel,
              significance: "distinct",
            },
            {
              children: lsi.remove,
              onClick: handleRemove,
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
export { MemberTile };
export default MemberTile;
//@@viewOff:exports
