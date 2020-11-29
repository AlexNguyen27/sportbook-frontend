import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Button, Tooltip } from "@material-ui/core";
import { Row, Col } from "reactstrap";
import { useHistory } from "react-router-dom";

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
  },
}));

const SubGroundDetail = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const history = useHistory();

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        elevation={3}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Sub ground 1</Typography>
          <Typography className={classes.secondaryHeading}>
            Maxium 5 people here
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Row>
            {[...Array(9)].map((item) => (
              <Col xs={3} md={2} className="text-center">
                <Tooltip title="Book this time">
                  <Button
                    variant="outlined"
                    color="primary"
                    className="mb-3"
                    size="small"
                    onClick={() => history.push("/order")}
                  >
                    <div>
                      <p className={classes.noMargin}>10:00 - 12:00</p>
                      <p className={classes.text}>Ready</p>
                      <p className={classes.noMargin}>
                        190.000${" "}
                        <span
                          style={{ fontSize: "12px", fontWeight: "normal" }}
                        >
                          -10%
                        </span>
                      </p>
                    </div>
                  </Button>
                </Tooltip>
              </Col>
            ))}
          </Row>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>Sub ground 2</Typography>
          <Typography className={classes.secondaryHeading}>
            Maxium 5 people here
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Row>
            {[...Array(9)].map((item) => (
              <Col xs={3} md={2} className="text-center">
                <Button
                  variant="outlined"
                  color="primary"
                  className="mb-3"
                  size="small"
                >
                  <div>
                    <p className={classes.noMargin}>10:00 - 12:00</p>
                    <p className={classes.text}>Ready</p>
                    <p className={classes.noMargin}>
                      190.000${" "}
                      <span style={{ fontSize: "12px", fontWeight: "normal" }}>
                        -10%
                      </span>
                    </p>
                  </div>
                </Button>
              </Col>
            ))}
          </Row>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>Sub ground 3</Typography>
          <Typography className={classes.secondaryHeading}>
            Maxium 5 people here
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Row>
            {[...Array(9)].map((item) => (
              <Col xs={3} md={2} className="text-center">
                <Button
                  variant="outlined"
                  color="primary"
                  className="mb-3"
                  size="small"
                >
                  <div>
                    <p className={classes.noMargin}>10:00 - 12:00</p>
                    <p className={classes.text}>Ready</p>
                    <p className={classes.noMargin}>
                      190.000${" "}
                      <span style={{ fontSize: "12px", fontWeight: "normal" }}>
                        -10%
                      </span>
                    </p>
                  </div>
                </Button>
              </Col>
            ))}
          </Row>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>Sub ground 4</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Row>
            {[...Array(9)].map((item) => (
              <Col xs={3} md={2} className="text-center">
                <Button
                  variant="outlined"
                  color="primary"
                  className="mb-3"
                  size="small"
                >
                  <div>
                    <p className={classes.noMargin}>10:00 - 12:00</p>
                    <p className={classes.text}>Ready</p>
                    <p className={classes.noMargin}>
                      190.000${" "}
                      <span style={{ fontSize: "12px", fontWeight: "normal" }}>
                        -10%
                      </span>
                    </p>
                  </div>
                </Button>
              </Col>
            ))}
          </Row>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default SubGroundDetail;
