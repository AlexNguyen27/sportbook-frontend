import React from "react";

const ReactGoogleMaps = ({ address }) => {
  const addressQuery = encodeURIComponent(address) || "";
  console.log("address------------------", address);
  // const addressQuery = 'H%E1%BB%8Dc%20vi%E1%BB%87n%20C%C3%B4ng%20ngh%E1%BB%87%20B%C6%B0u%20ch%C3%ADnh%20Vi%E1%BB%85n%20th%C3%B4ng%20C%C6%A1%20S%E1%BB%9F%20T%E1%BA%A1i%20TP.%20H%E1%BB%93%20Ch%C3%AD%20Minh%C2%B7'
  return (
    <div className="map-responsive">
      <iframe
        title="test"
        style={{ borderRadius: "4px" }}
        width="100%"
        height="400"
        frameborder="0"
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAEISduCZQJgYppXigB8wjsQhYSj1HIKEE&q=${addressQuery}`}
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default ReactGoogleMaps;
