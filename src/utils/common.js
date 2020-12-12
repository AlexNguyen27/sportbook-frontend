import { CLEAR_ERRORS } from "../store/actions/types";

export const DATE_TIME = "DD-MM-YYYY HH:mm:ss";
export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const GENDER = {
  male: "Male",
  female: "Female",
};
export const ROLE = {
  admin: "admin",
  user: "user",
  owner: "owner",
};

export const FAVORITE_FOOT = {
  right: "Right",
  left: "Left",
  both: "Both",
};

export const SUB_GROUND_STATUS = {
  ready: "ready",
  reserved: "reserved",
};

export const PAYMENT_TYPE = {
  online: "Online",
  offline: "Offline",
};

export const ORDER_STATUS = {
  waiting_for_approve: "Waiting for approve",
  cancelled: "Cancelled",
  approved: "Approved",
  paid: "Paid",
  finished: "Finished"
};

export const DEFAULT_GROUND_IMAGE =
  "https://daily.jstor.org/wp-content/uploads/2018/06/soccer_europe_1050x700.jpg";

export const COLOR_ORDER_STATUS = {
  waiting_for_approve: "primary",
  cancelled: "danger",
  approved: "warning",
  paid: "success",
  finished: "secondary",
};

export const EXTRA_INFO_LABEL = {
  favoriteFoot: "Favorite foot",
  playRole: "Play role",
  shirtNumber: "Shirt number",
  teamName: "Team name",
  favoritePlayTime: "Favorite play time",
};

export const SOCIAL_NETWORK_LABEL = {
  facebook: "Facebook",
  zalo: "Zalo",
  twitter: "Twitter",
};

export const BENEFIT_STATUS = {
  enabled: 'enabled',
  disabled: 'disabled',
};
