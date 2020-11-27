import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({}));

const Ground = () => {
  const classes = useStyles();

  useEffect(() => {
    document.getElementById("test-image").style.backgroundImage =
      "url('https://vtv1.mediacdn.vn/thumb_w/650/2020/6/2/1591067420-20200601-lisa-15910726681152074573621.jpg')";
    document.getElementById("test-image").style.backgroundPosition = "center";
    document.getElementById("test-image").style.backgroundRepeat = "no-repeat";
    document.getElementById("test-image").style.backgroundSize = "cover";
  }, []);

  return (
    <div>
      <div
        id="test-image"
        style={{ height: "500px", position: "relative" }}
      ></div>
      <div style={{ position: "absolute" }}>
        <h1>hello there</h1>
      </div>
    </div>
  );
};

export default Ground;
