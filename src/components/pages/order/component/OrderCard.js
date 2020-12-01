import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import TextFieldInput from "../../../custom/TextFieldInputWithheader";
import { connect, useDispatch } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import {
  SAVE_PAYMENT_METHOD,
  CLEAR_ERRORS,
} from "../../../../store/actions/types";
import Colors from "../../../../constants/Colors";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));

const OrderCard = ({ errors, user }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: `${user.firstName} ${user.lastName}` || "",
    phone: user.phone || "",
  });
  const [paymentMethod, setPaymentMethod] = React.useState("");
  
  const { fullName, phone } = formData;
  
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch({
      type: SAVE_PAYMENT_METHOD,
      paymentMethod: "",
    });
  }, []);

  const handleRadioChange = (event) => {
    setPaymentMethod(event.target.value);
    dispatch({
      type: SAVE_PAYMENT_METHOD,
      paymentMethod: event.target.value,
    });
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  return (
    <div className="mt-4">
      <h4>Orderer Information</h4>
      <div>
        <TextFieldInput
          header="Full Name"
          id="outlined-multiline-flexible"
          name="fullName"
          fullWidth
          value={fullName}
          onChange={onChange}
          error={errors.fullName}
          variant="outlined"
          disabled
          size="small"
        />

        <TextFieldInput
          header="Phone"
          id="outlined-multiline-static"
          name="phone"
          variant="outlined"
          fullWidth
          disabled
          value={phone}
          onChange={onChange}
          size="small"
        />
        <div className="mt-4 mb-4">
          <Alert severity="warning">
            Update and confirm your phone number <a href="/user/info">here</a>{" "}
            before order
          </Alert>
        </div>

        <hr />
        <div>
          <h4>Payment Method</h4>
          {errors.paymentMethod ? (
            <p style={{ margin: 0, color: Colors.red }}>
              {errors.paymentMethod}
            </p>
          ) : null}
          <form onSubmit={() => {}}>
            <FormControl
              component="fieldset"
              className={classes.formControl}
            >
              <RadioGroup
                aria-label="paymentType"
                name="paymentType"
                value={paymentMethod}
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  className="mb-0"
                  value="online"
                  control={<Radio />}
                  label="Online"
                />
                <FormHelperText>
                  Wait for confirmation from the owner and cannot be guaranteed
                  by Love Sport if any dispute arises
                </FormHelperText>
                <FormControlLabel
                  className="mb-0"
                  value="offline"
                  control={<Radio />}
                  label="Offline"
                />
              </RadioGroup>
              <FormHelperText>
                Guaranteed by loveSport when any dispute occurs. A 100% refund
                will be issued for cancelations made before the scheduled time.
              </FormHelperText>
            </FormControl>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  user: state.auth.user,
});
export default connect(mapStateToProps, {})(OrderCard);
