import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { getGrounds } from "../../../../store/actions/ground";
import MultipleCarousel from "../../../custom/MultipleCarousel";
import PageLoader from "../../../custom/PageLoader";

const GroundList = ({ grounds, getGrounds }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getGrounds(setLoading);
  }, []);

  const groundArr = Object.keys(grounds).map((groundId) => grounds[groundId]);

  return (
    <>
      <div
        id="pricing"
        style={{ backgroundColor: "#f9fafc", paddingBottom: "50px" }}
      >
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
        <PageLoader loading={loading}>
          <Row style={{ justifyContent: "center" }}>
            <Col xs={9}>
              <MultipleCarousel dataSource={groundArr} />
            </Col>
          </Row>
        </PageLoader>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  grounds: state.ground.grounds,
});
export default connect(mapStateToProps, { getGrounds })(GroundList);
