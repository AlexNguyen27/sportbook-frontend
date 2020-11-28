import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PlaceRoundedIcon from "@material-ui/icons/PlaceRounded";
import Colors from "../../constants/Colors";
import { deleteGround } from "../../store/actions/ground";
import { useHistory } from "react-router-dom";

const DEFAULT_GROUND_IMAGE =
  "https://daily.jstor.org/wp-content/uploads/2018/06/soccer_europe_1050x700.jpg";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
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
  const {
    title,
    description,
    createdAt,
    category: { name },
    image = "[]",
  } = ground;
  const formatImages = JSON.parse(image);
  return (
    <Card
      className={classes.root}
      onClick={() => history.push(`/ground/${ground.id}`)}
    >
      <CardHeader
        avatar={
          <Avatar aria-label="icon" className={classes.avatar}>
            <PlaceRoundedIcon />
          </Avatar>
        }
        title={title}
        subheader={`Category: ${name}`}
      />
      <CardMedia
        className={classes.media}
        image={(formatImages && formatImages[0]) || DEFAULT_GROUND_IMAGE}
        title="Paella dish"
      />
      {/* <CardContent>
        <Typography variant="body2" component="p">
          {description}
        </Typography>
        <Typography variant="caption" color="textSecondary" component="p">
          Created at: {moment(createdAt).format("DD/MM/YYYY HH:MM:ss")}
        </Typography>
      </CardContent> */}
    </Card>
  );
};

export default connect(null, { deleteGround })(GroundCard);
