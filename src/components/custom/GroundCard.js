import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Colors from "../../constants/Colors";
import { useHistory } from "react-router-dom";
import RoomIcon from "@material-ui/icons/Room";
import { getAddress } from "../../utils/commonFunction";
import { truncateMultilineString } from "../../utils/formatString";

const DEFAULT_GROUND_IMAGE =
  "https://daily.jstor.org/wp-content/uploads/2018/06/soccer_europe_1050x700.jpg";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 280,
    marginRight: "30px",
  },
  media: {
    paddingTop: "56.25%", // 16:9
    minHeight: "240px",
  },
  expand: {
    marginLeft: "auto",
  },
  avatar: {
    backgroundColor: Colors.primary,
  },
}));

const GroundCard = ({ ground, onDelete, onEdit }) => {
  const classes = useStyles();

  const history = useHistory();
  const { title, image = "[]" } = ground;
  const formatImages = JSON.parse(image);

  return (
    <Card
      className={classes.root}
      onClick={() => history.push(`/ground/${ground.id}`)}
      elevation={3}
    >
      <CardMedia
        className={classes.media}
        image={(formatImages && formatImages[0]) || DEFAULT_GROUND_IMAGE}
        title="Paella dish"
      />
      <CardContent>
        <Typography
          variant="body2"
          component="p"
          style={{ fontWeight: "bold" }}
        >
          {title}
        </Typography>
        <Typography variant="caption" color="textSecondary" component="p">
          <RoomIcon className="mr-1" />
          {truncateMultilineString(getAddress(ground.address), 60) ||
            "No address"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default connect(null, {})(GroundCard);
