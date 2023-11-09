//@@viewOn:imports
import { createVisualComponent, PropTypes, useLsi, Utils } from "uu5g05";
import Uu5Forms from "uu5g05-forms";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config.js";
import importLsi from "../../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
  controls: () => Config.Css.css({ display: "flex", gap: 8, justifyContent: "flex-end" }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const EditShoppingListNameModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "EditShoppingListNameModal",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { onSubmit, onClose } = props;
    const lsi = useLsi(importLsi, [EditShoppingListNameModal.uu5Tag]);

    function handleSubmit(event) {
      const values = { ...event.data.value };
      onSubmit(values.name);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, EditShoppingListNameModal);

    return currentNestingLevel ? (
      <Uu5Forms.Form.Provider onSubmit={handleSubmit} {...attrs}>
        <Uu5Elements.Modal
          open
          onClose={onClose}
          header={lsi.modalTitle}
          footer={
            <div className={Css.controls()}>
              <Uu5Forms.CancelButton onClick={onClose} />
              <Uu5Forms.SubmitButton />
            </div>
          }
        >
          <Uu5Forms.Form.View>
            <Uu5Forms.FormText name="name" label={lsi.newNameLabel} required />
          </Uu5Forms.Form.View>
        </Uu5Elements.Modal>
      </Uu5Forms.Form.Provider>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { EditShoppingListNameModal };
export default EditShoppingListNameModal;
//@@viewOff:exports
