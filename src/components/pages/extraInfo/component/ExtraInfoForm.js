import React, { useState } from "react";
import { connect } from "react-redux";
import TextFieldInput from "../../../custom/TextFieldInputWithheader";
import { Row, Col } from "reactstrap";
import { EXTRA_INFO_LABEL, FAVORITE_FOOT } from "../../../../utils/common";
import DropdownV2 from "../../../custom/DropdownV2";

// todo SAVE TO JSON
const ExtraInfoForm = ({ errors, formData, onChange, setExtraInfoForm }) => {
  const {
    favoriteFoot,
    playRole,
    shirtNumber,
    teamName,
    favoritePlayTime,
  } = formData;

  const [selectedFavoriteFootKey, setSelectedFavoriteFootKey] = useState(
    favoriteFoot || ""
  );

  const favoriteFootArr = Object.keys(FAVORITE_FOOT).map((key) => ({
    key: key,
    value: FAVORITE_FOOT[key],
  }));

  const onChangeFavoriteFoot = (code) => {
    setSelectedFavoriteFootKey(code);
    setExtraInfoForm({
      ...formData,
      favoriteFoot: code,
    });
  };

  return (
    <>
      <h4 className="text-center mb-0">Extra information</h4>
      <Row className="mt-2">
        <Col xs={6}>
          <DropdownV2
            header="Farovite Foot"
            fullWidth
            label="Farovite Foot"
            variant="outlined"
            size="small"
            disabledPlaceholder="None"
            value={selectedFavoriteFootKey.toString()}
            options={favoriteFootArr || []}
            valueBasedOnProperty="key"
            displayProperty="value"
            onChange={(code) => onChangeFavoriteFoot(code)}
            error={errors.favoriteFoot || ""}
          />
        </Col>
        <Col xs={6}>
          <TextFieldInput
            header={EXTRA_INFO_LABEL.playRole}
            id="outlined-multiline-flexible"
            name="playRole"
            label={EXTRA_INFO_LABEL.playRole}
            fullWidth
            value={playRole}
            onChange={onChange}
            error={errors.playRole}
            variant="outlined"
            size="small"
          />
        </Col>
        <Col xs={6}>
          <TextFieldInput
            header={EXTRA_INFO_LABEL.shirtNumber + " / Shirt name"}
            id="outlined-multiline-flexible"
            name="shirtNumber"
            label={EXTRA_INFO_LABEL.shirtNumber + " / Shirt name"}
            fullWidth
            value={shirtNumber}
            onChange={onChange}
            error={errors.shirtNumber}
            variant="outlined"
            size="small"
          />
        </Col>
        <Col xs={6}>
          <TextFieldInput
            header={EXTRA_INFO_LABEL.favoritePlayTime}
            id="outlined-multiline-flexible"
            name="favoritePlayTime"
            label={EXTRA_INFO_LABEL.favoritePlayTime}
            fullWidth
            value={favoritePlayTime}
            onChange={onChange}
            error={errors.favoritePlayTime}
            variant="outlined"
            size="small"
          />
        </Col>
        <Col xs={12}>
          <TextFieldInput
            header={EXTRA_INFO_LABEL.teamName}
            id="outlined-multiline-flexible"
            name="teamName"
            label={EXTRA_INFO_LABEL.teamName}
            fullWidth
            value={teamName}
            onChange={onChange}
            error={errors.teamName}
            variant="outlined"
            size="small"
          />
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});
export default connect(mapStateToProps, {})(ExtraInfoForm);
