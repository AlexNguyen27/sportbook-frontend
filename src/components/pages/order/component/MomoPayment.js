import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { BASE_IMAGE_URL } from "../../../../store/actions/types";

const toDataURL = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};
// MANAGER FULL NAME, PHONE, EMAIL,
// MOMO QR CODE FOR PAYMENT ONLINE
// ALLOW TO DOWNLOAD Image
const MomoPayment = ({ manager, modal, setModal, setCloseOnlineModel }) => {
  const { firstName, lastName, phone, email, momoQRCode } = manager;

  const onClose = () => {
    setModal(false);
    setCloseOnlineModel(true);
  };

  const download = async () => {
    const a = document.createElement("a");
    a.href = await toDataURL(momoQRCode);
    a.download = "myImage.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  return (
    <Modal isOpen={modal} centered={true}>
      <ModalHeader toggle={() => onClose()}>Manager Contact</ModalHeader>

      <ModalBody>
        <div className="text-center">
          <h6 style={{ textTransform: "uppercase" }}>
            {firstName} {lastName} ({phone || "No phone"})
          </h6>
          <h6> {email}</h6>
        </div>
        <div>
          <img
            width="100%"
            height="400px"
            alt=""
            src={momoQRCode || BASE_IMAGE_URL}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          variant="contained"
          color="primary"
          // disabled={!momoQRCode}
          onClick={() => download()}
        >
          Save QR code
        </Button>
        <Button variant="contained" className="ml-2" onClick={() => onClose()}>
          Continue
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  manager: state.ground?.selected_ground?.user,
});
export default connect(mapStateToProps, null)(MomoPayment);
