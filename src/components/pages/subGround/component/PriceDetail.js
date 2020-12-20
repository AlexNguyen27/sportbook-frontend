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
import {
  getAddress,
  isSameOrAfterNow,
  formatThousandVND,
} from "../../../../utils/commonFunction";
import { SUB_GROUND_STATUS } from "../../../../utils/common";
import Swal from "sweetalert2";
import { PRICE_STATUS_COLOR } from "../../../../constants/constant";

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

const PriceDetail = ({
  ground,
  subGrounds = [],
  isAuthenticated,
  selectedStartDay,
  search,
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const history = useHistory();
  const dispatch = useDispatch();

  // todo ONlick when status ready
  const onClickPriceCard = (price, selectedSubGround) => {
    if (!isAuthenticated) {
      Swal.fire({
        title: `Please login to continue?`,
        text: "",
        type: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login!",
      }).then((result) => {
        if (result.value) {
          history.push("/login");
        }
      });
    } else {
      dispatch({
        type: SAVE_ORDER_DATA,
        orderData: {
          ...price,
          startDay: selectedStartDay,
          groundName: ground.title,
          groundAddress: getAddress(ground.address) || "No address",
          groundBenefit: ground.benefit.split(","),
          subGroundName: selectedSubGround.name,
          numberOfPlayers: selectedSubGround.numberOfPlayers,
        },
      });
      history.push("/order");
    }
  };

  let formatSubGrounds = [...subGrounds];
  const subGroundData = () => {
    const { numberOfPlayers, selectedStartTime = "" } = search;

    if (!numberOfPlayers && !selectedStartTime) return subGrounds;

    if (numberOfPlayers) {
      formatSubGrounds = formatSubGrounds.filter(
        (item) => item.numberOfPlayers === numberOfPlayers
      );
    }
    if (selectedStartTime) {
      // REMOVE ALL PRICE AFTER START TIME
      formatSubGrounds = formatSubGrounds.reduce((acc, curr) => {
        const { prices } = curr;
        if (!prices.length) {
          return [...acc];
        }
        let formatPrices = [...prices];
        formatPrices = formatPrices.filter((item) =>
          moment(item.startTime, "HH:mm:ss").isAfter(
            moment(selectedStartTime, "HH:mm:ss")
          )
        );
        if (!formatPrices.length) {
          return [...acc];
        }
        curr.formatPrices = [...formatPrices];
        return [...acc, curr];
      }, []);
    }
    return formatSubGrounds;
  };

  console.log(subGroundData(), subGrounds);
  return (
    <div className={classes.root}>
      {!subGroundData().length ? (
        <strong>
          We don't have any ground available after {search.selectedStartTime}{" "}
        </strong>
      ) : (
        subGroundData().map((item) => (
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
                {(item.formatPrices ? item.formatPrices : item.prices).map(
                  (price) => (
                    <Col xs="auto" className="text-center ">
                      <Tooltip title="Book this time">
                        <Button
                          variant="outlined"
                          color={
                            PRICE_STATUS_COLOR[
                              !isSameOrAfterNow(
                                price.startTime,
                                selectedStartDay
                              )
                                ? "late"
                                : price.status
                            ]
                          }
                          className="mb-3"
                          size="small"
                          style={{ minWidth: "112px", borderWidth: "2px" }}
                          disabled={
                            !isSameOrAfterNow(price.startTime, selectedStartDay)
                          }
                          onClick={() => {
                            if (
                              price.status === SUB_GROUND_STATUS.ready &&
                              isSameOrAfterNow(
                                price.startTime,
                                selectedStartDay
                              )
                            ) {
                              onClickPriceCard(price, item);
                            }
                          }}
                        >
                          {`${moment(price.startTime, "HH:mm:ss").format(
                            "HH:mm"
                          )} - ${moment(price.endTime, "HH:mm:ss").format(
                            "HH:mm"
                          )}`}
                          <br />
                          {isSameOrAfterNow(price.startTime, selectedStartDay)
                            ? price.status
                            : "LATE"}
                          <br />
                          {formatThousandVND(
                            (price.price * (100 - price.discount)) / 100,
                            " VND ",
                            1
                          )}
                          <br />
                          {price.discount > 0 ? (
                            <> (-{price.discount}%)</>
                          ) : null}
                        </Button>
                      </Tooltip>
                    </Col>
                  )
                )}
              </Row>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  ground: state.ground.selected_ground,
  subGrounds: state.ground.selected_ground.subGrounds,
  selectedStartDay: state.order?.orderData?.startDay,
  isAuthenticated: state.auth.isAuthenticated,
  search: state.ground.search,
});
export default connect(mapStateToProps, {})(PriceDetail);
