import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Row } from "reactstrap";
import { useState } from "react";
import TextFieldInput from "../../../custom/TextFieldInputWithheader";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));

const OrderCard = ({ errors }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    title: "",
    phone: "",
  });
  const { title, phone } = formData;
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("Choose wisely");

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    // setHelperText(" ");
    // setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // if (value === "best") {
    //   setHelperText("You got it!");
    //   setError(false);
    // } else if (value === "worst") {
    //   setHelperText("Sorry, wrong answer!");
    //   setError(true);
    // } else {
    //   setHelperText("Please select an option.");
    //   setError(true);
    // }
  };
  return (
    <div className="mt-4">
      <h4>Ordering Information</h4>
      <div>
        <TextFieldInput
          header="Name"
          id="outlined-multiline-flexible"
          name="title"
          label="New benefit title"
          fullWidth
          value={title}
          onChange={onChange}
          error={errors.title}
          variant="outlined"
          size="small"
        />

        <TextFieldInput
          header="Phone"
          id="outlined-multiline-static"
          label="phone"
          name="phone"
          variant="outlined"
          fullWidth
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
          <form onSubmit={handleSubmit}>
            <FormControl
              component="fieldset"
              error={error}
              className={classes.formControl}
            >
              {/* <FormLabel component="legend">
                Payment method
              </FormLabel> */}
              <RadioGroup
                aria-label="paymentType"
                name="paymentType"
                value={value}
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
});
export default connect(mapStateToProps, {})(OrderCard);
