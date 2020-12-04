import React from "react";
import { connect, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Button, Tooltip } from "@material-ui/core";
import { Row, Col } from "reactstrap";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { SAVE_ORDER_DATA } from "../../../../store/actions/types";
import { getAddress } from "../../../../utils/commonFunction";
import { SUB_GROUND_STATUS } from "../../../../utils/common";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "16px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
    fontWeight: "bold",
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  noMargin: {
    margin: 0,
    fontWeight: "bold",
  },
  text: {
    margin: 0,
    marginTop: "5px",
    margiBottom: "5px",
  },
}));

const PriceDetail = ({ ground, subGrounds = [] }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const history = useHistory();
  const dispatch = useDispatch();

  // todo ONlick when status ready
  const onClickPriceCard = (price, selectedSubGround) => {
    dispatch({
      type: SAVE_ORDER_DATA,
      orderData: {
        ...price,
        startDay: moment().format("DD/MM/YYYY"),
        groundName: ground.title,
        groundAddress: getAddress(ground.address) || "No address",
        groundBenefit: ground.benefit.split(","),
        subGroundName: selectedSubGround.name,
        numberOfPlayers: selectedSubGround.numberOfPlayers,
      },
    });
    history.push("/order");
  };

  return (
    <div className={classes.root}>
      {subGrounds.map((item) => (
        <Accordion
          expanded={subGrounds.length === 1 ? item.id : expanded === item.id}
          onChange={handleChange(item.id)}
          elevation={3}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>{item.name}</Typography>
            <Typography className={classes.secondaryHeading}>
              Maxium {item.numberOfPlayers} players
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Row style={{ width: "100%" }}>
              {item.prices.map((price) => (
                <Col xs={12} sm={6} md={4} lg={2} className="text-center">
                  <Tooltip title="Book this time">
                    <Button
                      variant="outlined"
                      color="primary"
                      className="mb-3"
                      size="small"
                      style={{ minWidth: "112px", borderWidth: "2px" }}
                      disabled={price.status !== SUB_GROUND_STATUS.ready}
                      onClick={() => onClickPriceCard(price, item)}
                    >
                      <div>
                        <p className={classes.noMargin}>{`${moment(
                          price.startTime,
                          "HH:mm:ss"
                        ).format("HH:mm")} - ${moment(
                          price.endTime,
                          "HH:mm:ss"
                        ).format("HH:mm")}`}</p>
                        <p className={classes.text}>{price.status}</p>
                        <p className={classes.noMargin}>
                          {price.price}$
                          {price.discount > 0 ? (
                            <span
                              style={{ fontSize: "12px", fontWeight: "normal" }}
                            >
                              -{price.discount}%
                            </span>
                          ) : null}
                        </p>
                      </div>
                    </Button>
                  </Tooltip>
                </Col>
              ))}
            </Row>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  ground: state.ground.selected_ground,
  subGrounds: state.ground.selected_ground.subGrounds,
  selectedStartDay: state.order.orderData.startDay,
});
export default connect(mapStateToProps, {})(PriceDetail);
