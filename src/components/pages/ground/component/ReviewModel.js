import React, { useState } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
// COMPONENTS
import happyImage from "../../../../images/thumbs-up-4007573_1280.png";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Rating from "@material-ui/lab/Rating";
import { Row, Col, Modal, ModalBody, ModalFooter, Form } from "reactstrap";
import { addOrUpdateRating } from "../../../../store/actions/rating";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const ReviewModel = ({
  modal,
  setModal,
  addOrUpdateRating,
  ground,
  user: { id: userId },
  ratings,
}) => {
  const [loading, setLoading] = useState(false);

  const initRating = ratings.find(
    (item) => item.userId === userId && item.groundId === ground.id
  );

  const [point, setPoint] = useState(initRating?.point || 0);
  // CLOSE MODAL ACTION
  const closeModal = () => {
    setModal(false);
  };
  const classes = useStyles();
  // HANDLE ON SUBMIT FROM ADD NEW GROUP
  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO call add review here
    addOrUpdateRating(setLoading, point, ground.id);
  };

  // Save on change input value

  return (
    <Modal isOpen={modal} toggle={() => closeModal()} centered={true}>
      {/** MODAL BODY */}
      <Form onSubmit={(e) => onSubmit(e)}>
        <ModalBody>
          <Row style={{ justifyContent: "center" }}>
            <Col xs={10}>
              <div className="text-center mb-2">
                <img width="200px" height="140px" alt="" src={happyImage} />
              </div>
              <h4>Do you like this playground service ?</h4>
              <p>How stisfied are you with our service support perfomance ?</p>
              <div className="text-center">
                <Rating
                  value={point || 0}
                  name="size-large"
                  onChange={(event, newValue) => {
                    setPoint(newValue);
                  }}
                  size="large"
                />
                <span></span>
              </div>
            </Col>
          </Row>
        </ModalBody>
        {/** MODAL FOOTER */}
        <ModalFooter style={{ justifyContent: "center" }}>
          {loading ? (
            <CircularProgress color="primary" size={30} />
          ) : (
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          )}

          <Button
            variant="contained"
            className="ml-2"
            onClick={() => closeModal()}
          >
            dismiss
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};
const mapStateToProps = (state) => ({
  ground: state.ground.selected_ground,
  user: state.auth.user,
  ratings: state.rating.ratings,
});

export default connect(mapStateToProps, { addOrUpdateRating })(ReviewModel);
