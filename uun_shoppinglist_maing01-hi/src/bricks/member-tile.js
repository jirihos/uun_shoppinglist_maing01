//@@viewOn:imports
import { PropTypes, createVisualComponent, Utils, useState } from "uu5g05";
import { Button, Grid } from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import Uu5TilesElements from "uu5tilesg02-elements";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
  personItem: () =>
    Config.Css.css({
      margin: "2px",
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

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
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
              onClick={() => setDeleteDialogOpen(true)}
            />
          </Grid.Item>
        </Grid>
      </Uu5TilesElements.Tile>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { MemberTile };
export default MemberTile;
//@@viewOff:exports
