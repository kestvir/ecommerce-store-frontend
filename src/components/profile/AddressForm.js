import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Message, Select } from "semantic-ui-react";
import { addressCreateURL, addressUpdateURL } from "../../constants";
import { authAxios } from "../../utils";

const UPDATE_FORM = "UPDATE_FORM";

const initialState = {
  address_type: "",
  apartment_address: "",
  country: "",
  city: "",
  id: "",
  user: 1,
  default: false,
  street_address: "",
  zipcode: "",
  saving: false,
  error: false,
};

class AddressForm extends Component {
  state = {
    shippingFormData: {
      ...initialState,
    },
    billingFormData: {
      ...initialState,
    },
  };

  fillFormIfUpdate = () => {
    const { address, formType, activeItem } = this.props;
    if (formType === UPDATE_FORM) {
      const updateAddressObj = { ...address, error: false, saving: false };

      if (activeItem === "billingAddress") {
        this.setState({ billingFormData: updateAddressObj });
      } else {
        this.setState({ shippingFormData: updateAddressObj });
      }
    }
  };

  componentDidMount() {
    this.fillFormIfUpdate();
  }

  componentDidUpdate(prevProps) {
    const { address } = this.props;

    if (address !== prevProps.address) {
      this.fillFormIfUpdate();
    }
  }

  handleToggleDefault = () => {
    const { shippingFormData, billingFormData } = this.state;
    const { activeItem } = this.props;
    let updatedFormData;
    if (activeItem === "billingAddress") {
      updatedFormData = {
        ...billingFormData,
        default: !billingFormData.default,
      };

      this.setState({
        billingFormData: updatedFormData,
      });
    } else {
      updatedFormData = {
        ...shippingFormData,
        default: !shippingFormData.default,
      };

      this.setState({
        shippingFormData: updatedFormData,
      });
    }
  };

  handleChange = (e) => {
    const { shippingFormData, billingFormData } = this.state;
    const { activeItem } = this.props;
    let updatedFormData;

    if (activeItem === "billingAddress") {
      updatedFormData = {
        ...billingFormData,
        [e.target.name]: e.target.value,
      };
      this.setState({
        billingFormData: updatedFormData,
      });
    } else {
      updatedFormData = {
        ...shippingFormData,
        [e.target.name]: e.target.value,
      };
      this.setState({
        shippingFormData: updatedFormData,
      });
    }
  };

  handleSelectChange = (e, { name, value }) => {
    const { shippingFormData, billingFormData } = this.state;
    const { activeItem } = this.props;
    let updatedFormData;

    if (activeItem === "billingAddress") {
      updatedFormData = {
        ...billingFormData,
        [name]: value,
      };
      this.setState({
        billingFormData: updatedFormData,
      });
    } else {
      updatedFormData = {
        ...shippingFormData,
        [name]: value,
      };
      this.setState({
        shippingFormData: updatedFormData,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { shippingFormData, billingFormData } = this.state;
    const { activeItem } = this.props;
    const { formType } = this.props;

    let formData;
    let formDataObjName;

    if (activeItem === "billingAddress") {
      formData = billingFormData;
      formDataObjName = "billingFormData";
    } else {
      formData = shippingFormData;
      formDataObjName = "shoppingFormData";
    }

    this.setState({ [formDataObjName]: { ...formData }, saving: true });

    if (formType === UPDATE_FORM) {
      this.handleUpdateAddress(formData);
    } else {
      this.handleCreateAddress(formData);
    }
  };

  handleCreateAddress = (formData) => {
    const { userID, activeItem, token } = this.props;
    let formDataObjName;

    if (activeItem === "billingAddress") {
      formDataObjName = "billingFormData";
    } else {
      formDataObjName = "shippingFormData";
    }

    authAxios(token)
      .post(addressCreateURL, {
        ...formData,
        user: userID,
        address_type: activeItem === "billingAddress" ? "B" : "S",
      })
      .then((res) => {
        this.setState({
          [formDataObjName]: {
            ...initialState,
          },
        });
        this.props.callback();
      })
      .catch((err) => {
        this.setState({ [formDataObjName]: { ...formData, error: err } });
      });
  };

  handleUpdateAddress = (formData) => {
    const { userID, activeItem } = this.props;

    let formDataObjName;
    if (activeItem === "billingAddress") {
      formDataObjName = "billingFormData";
    } else {
      formDataObjName = "shippingFormData";
    }

    authAxios(this.props.token)
      .put(addressUpdateURL(formData.id), {
        ...formData,
        user: userID,
        address_type: activeItem === "billingAddress" ? "B" : "S",
      })
      .then((res) => {
        this.setState({
          [formDataObjName]: {
            ...initialState,
          },
        });
        this.props.callback();
      })
      .catch((err) => {
        this.setState({ [formDataObjName]: { ...formData, error: err } });
      });
  };

  render() {
    const { countries, activeItem } = this.props;
    let formData;
    if (activeItem === "billingAddress") {
      formData = this.state.billingFormData;
    } else {
      formData = this.state.shippingFormData;
    }

    return (
      <Form
        onSubmit={this.handleSubmit}
        success={formData.success}
        error={formData.error}
      >
        <Form.Input
          required
          name="street_address"
          placeholder="Street address"
          onChange={this.handleChange}
          value={formData.street_address}
        />
        <Form.Input
          required
          name="apartment_address"
          placeholder="Apartment address"
          onChange={this.handleChange}
          value={formData.apartment_address}
        />
        <Form.Input
          required
          name="city"
          placeholder="City"
          onChange={this.handleChange}
          value={formData.city}
        />
        <Form.Field required>
          <Select
            loading={countries.length < 1}
            fluid
            clearable
            search
            options={countries}
            name="country"
            placeholder="Country"
            onChange={this.handleSelectChange}
            value={formData.country}
          />
        </Form.Field>
        <Form.Input
          required
          name="zipcode"
          placeholder="Zip code"
          onChange={this.handleChange}
          value={formData.zipcode}
        />
        <Form.Checkbox
          name="default"
          label="Make this the default address?"
          onChange={this.handleToggleDefault}
          checked={formData.default}
        />
        {formData.success && (
          <Message success header="Success!" content="Your address was saved" />
        )}
        {formData.error && (
          <Message
            error
            header="There was an error"
            content={JSON.stringify(formData.error)}
          />
        )}
        <Form.Button
          disabled={formData.saving}
          loading={formData.saving}
          primary
        >
          Save
        </Form.Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(AddressForm);
