import React from "react";
import { FacebookProvider, Share } from "react-facebook";
import { Button } from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

const ShareButton = withStyles((theme) => ({
  root: {
    color: "white",
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
}))(Button);

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
          <ShareButton
            variant="contained"
            color="primary"
            size="small"
            endIcon={<ShareIcon />}
            onClick={handleClick}
          >
            SHARE
          </ShareButton>
        )}
      </Share>
    </FacebookProvider>
  );
};

export default ShareFacebookButton;
