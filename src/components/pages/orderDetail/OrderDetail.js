import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Row, Col } from "reactstrap";
import { Button } from "@material-ui/core";
import UserInfoCard from "./component/UserInfoCard";
import OrderHistoryTable from "./component/OrderHistoryTable";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useHistory } from "react-router-dom";
import GroundDetailCard from "./component/GroundDetailCard";
import { getOrderById } from "../../../store/actions/order";
import { useState } from "react";
import PageLoader from "../../custom/PageLoader";
import { connect } from "react-redux";
import moment from "moment";
import { getBenefits } from "../../../store/actions/benefit";

const useStyles = makeStyles({
  top: {
    padding: "100px 0 40px 0",
  },
});

const OrderDetail = ({
  match,
  getOrderById,
  orderDetail,
  getBenefits,
  benefits,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const orderId = match.params.id;
  const [loading, setLoading] = useState(true);
  console.log("ad------------------", orderId);
  useEffect(() => {
    if (orderId) {
      getOrderById(setLoading, orderId).then(() => {
        setLoading(true);
        getBenefits(setLoading);
      });
    }
  }, []);

  const { createdAt } = orderDetail;

  return (
    <PageLoader loading={loading}>
      <Row className={classes.top} style={{ justifyContent: "center" }}>
        <Col xs={10}>
          <Row>
            <Col xs={6}>
              <h4>Order detail</h4>
            </Col>
            <Col xs={6} className="text-right">
              <h6>
                Created at:{" "}
                {moment(createdAt).format("dddd DD/MM/YYYY HH:mm A")}
              </h6>
            </Col>
          </Row>
        </Col>

        <Col xs={4}>
          <GroundDetailCard orderDetail={orderDetail} benefits={benefits} />
        </Col>
        <Col xs={6}>
          <UserInfoCard orderDetail={orderDetail}/>
          <h4 className="mt-4">Order historsies</h4>
          <OrderHistoryTable orderDetail={orderDetail} />
        </Col>
        <Col xs={12} className="text-center" style={{ marginTop: "30px" }}>
          <Button
            variant="contained"
            size="small"
            color="default"
            className={classes.btn}
            startIcon={<ArrowBackIosIcon />}
            onClick={() => history.goBack()}
          >
            Go Back
          </Button>
        </Col>
      </Row>
    </PageLoader>
  );
};

const mapStateToProps = (state) => ({
  orderDetail: state.order.selected_order,
  benefits: state.benefit.benefits,
});

export default connect(mapStateToProps, { getOrderById, getBenefits })(
  OrderDetail
);
