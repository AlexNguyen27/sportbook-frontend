import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { getGrounds } from "../../../../store/actions/ground";
import GroundCard from "../../../custom/GroundCard";
import MultipleCarousel from "../../../custom/MultipleCarousel";

const GroundList = ({ grounds, getGrounds }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getGrounds(setLoading);
  }, []);

  const groundArr = Object.keys(grounds).map((groundId) => grounds[groundId]);

  return (
    <>
      <div id="pricing" style={{ backgroundColor: "#f9fafc", paddingBottom: '50px' }}>
        <div className="container cards-2" style={{ paddingBottom: "0" }}>
          <div className="row">
            <div className="col-lg-12">
              <h2>Multiple Playground Options</h2>
              <p className=" p-large">
                TOP LOCATION{" "}
                <strong>More than 600 playgrounds nationwide</strong>
              </p>
            </div>
          </div>
        </div>
        {/* <Row style={{ justifyContent: "center" }}>
          <Col xs={9}>
            <Row style={{ justifyContent: "center" }}>
              {groundArr.map((ground) => (
                <Col xs={3} key={ground.id} className="mb-4">
                  <GroundCard ground={ground} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row> */}
        <Row style={{ justifyContent: "center" }}>
          <Col xs={9}>
            <MultipleCarousel dataSource={groundArr}/>
          </Col>
        </Row>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  grounds: state.ground.grounds,
});
export default connect(mapStateToProps, { getGrounds })(GroundList);
