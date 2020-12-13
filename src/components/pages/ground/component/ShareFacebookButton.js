import React from "react";
import { FacebookProvider, Share } from "react-facebook";
import { Button } from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";

const ShareFacebookButton = ({ groundId }) => {
  return (
    <FacebookProvider appId="685323535689330">
      <Share
        href={`https://lovesport.herokuapp.com/ground/${groundId}`}
        hashtag="#LoveSport"
        quote="Welcome to Love Sport"
        className="rounded p-0 border-0 bg-none"
      >
        {({ handleClick, loading }) => (
          <Button
            variant="contained"
            color="primary"
            size="small"
            endIcon={<ShareIcon />}
            onClick={handleClick}
          >
            SHARE
          </Button>
        )}
      </Share>
    </FacebookProvider>
  );
};

export default ShareFacebookButton;
