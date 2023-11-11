//@@viewOn:imports
import { createVisualComponent, PropTypes, useLsi, Utils } from "uu5g05";
import Uu5Forms from "uu5g05-forms";
import Uu5Elements, { Grid } from "uu5g05-elements";
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

const AddItemModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "AddItemModal",
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
    const lsi = useLsi(importLsi, [AddItemModal.uu5Tag]);

    function handleSubmit(event) {
      const values = { ...event.data.value };
      onSubmit(values);
    }

    function handleValidate(event) {
      const values = { ...event.data.value };
      if ((values.amount && !values.unit) || (!values.amount && values.unit)) {
        return { message: lsi.amountUnitError };
      }
      if ((values.totalPrice && !values.currency) || (!values.totalPrice && values.currency)) {
        return { message: lsi.priceCurrencyError };
      }
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, AddItemModal);

    return currentNestingLevel ? (
      <Uu5Forms.Form.Provider onSubmit={handleSubmit} onValidate={handleValidate} {...attrs}>
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
            <Grid templateAreas="text text, amount unit, totalPrice currency">
              <Grid.Item gridArea="text">
                <Uu5Forms.FormText name="text" label={lsi.textLabel} required autoFocus />
              </Grid.Item>
              <Grid.Item gridArea="amount">
                <Uu5Forms.FormNumber name="amount" label={lsi.amountLabel} />
              </Grid.Item>
              <Grid.Item gridArea="unit">
                <Uu5Forms.FormText name="unit" label={lsi.unitLabel} />
              </Grid.Item>
              <Grid.Item gridArea="totalPrice">
                <Uu5Forms.FormNumber name="totalPrice" label={lsi.totalPriceLabel} />
              </Grid.Item>
              <Grid.Item gridArea="currency">
                <Uu5Forms.FormSelect
                  name="currency"
                  label={lsi.currencyLabel}
                  itemList={[{ value: "Kč" }, { value: "€" }, { value: "$" }]}
                />
              </Grid.Item>
            </Grid>
          </Uu5Forms.Form.View>
        </Uu5Elements.Modal>
      </Uu5Forms.Form.Provider>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { AddItemModal };
export default AddItemModal;
//@@viewOff:exports
