import logoutDispatch from "../../utils/logoutDispatch";
import {
  GET_ERRORS,
  BASE_URL,
  GET_GROUNDS,
  SAVE_SELECTED_GROUND,
} from "./types";
import { hera } from "hera-js";
import { arrayToObject } from "../../utils/commonFunction";

export const getGrounds = (setLoading, isAvailable) => async (
  dispatch,
  getState
) => {
  const { token } = getState().auth;

  let filter = "";
  let variables = {};
  if (isAvailable) {
    filter = "(isAvailable: true)";
    variables = {
      isAvailable,
    };
  }
  const { data, errors } = await hera({
    options: {
      url: BASE_URL,
      headers: {
        token,
        "Content-Type": "application/json",
      },
    },
    query: `
              query {
                getAllGrounds${filter} {
                  id
                  title 
                  description
                  phone
                  address {
                    regionCode
                    districtCode
                    wardCode
                    address
                  }
                  benefit
                  image,
                  createdAt 
                  categoryId
                  isAvailable
                  category {
                    id
                    name
                  }
                }
              }
          `,
    variables: {
      ...variables,
    },
  });
  if (!errors) {
    const grounds = arrayToObject(data.getAllGrounds);

    dispatch({
      type: GET_GROUNDS,
      grounds,
    });
    setLoading(false);
  } else {
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};

export const getGroundById = (setLoading, id, startDay) => async (
  dispatch,
  getState
) => {
  const {
    token,
    user: { id: userId },
  } = getState().auth;

  const { data, errors } = await hera({
    options: {
      url: BASE_URL,
      headers: {
        token,
        "Content-Type": "application/json",
      },
    },
    query: `
              query {
                getGroundById(id: $id, startDay: $startDay, userId: $userId) {
                    id
                    title 
                    description
                    phone
                    address {
                      regionCode
                      districtCode
                      wardCode
                      address
                    }
                    benefit
                    image,
                    createdAt 
                    categoryId
                    category {
                      id
                      name
                    }
                    user {
                      phone
                      email
                      momoQRCode
                      firstName
                      lastName
                    }
                    comments {
                      id
                      comment
                      userId
                      user {
                        id                        
                        email
                        firstName
                        lastName
                        avatar 
                      }
                      groundId
                      parentId
                      createdAt
                      updatedAt

                    }
                    subGrounds {
                      id
                      name
                      numberOfPlayers
                      groundId
                      createdAt
                      prices {
                        id
                        price
                        discount
                        status
                        endTime
                        startTime
                        subGroundId
                        createdAt
                      }
                    }
                }
              }
          `,
    variables: {
      id,
      startDay,
      userId: userId || "",
    },
  });
  if (!errors) {
    dispatch({
      type: SAVE_SELECTED_GROUND,
      selected_ground: data.getGroundById,
    });
  } else {
    console.log("erer-----------------------------", errors);
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
  setLoading(false);
};

export const getSearchGrounds = (setLoading, searchData) => async (
  dispatch,
  getState
) => {
  const { token } = getState().auth;

  const { data, errors } = await hera({
    options: {
      url: BASE_URL,
      headers: {
        token,
        "Content-Type": "application/json",
      },
    },
    query: `
              query {
                searchGrounds(
                  search: $search,
                  districtName: $districtName,
                  regionName: $regionName
                  wardName: $wardName
                  limit: $limit
                  isAvailable: $isAvailable
                  startTime: $startTime, 
                  startDay: $startDay
                ) {
                  id
                  title 
                  description
                  phone
                  address {
                    regionCode
                    districtCode
                    wardCode
                    address
                  }
                  benefit
                  image,
                  createdAt 
                  categoryId
                  category {
                    id
                    name
                  }
                }
              }
          `,
    variables: {
      search: searchData.search || "",
      regionName: searchData.regionName || "",
      districtName: searchData.districtName || "",
      wardName: searchData.wardName || "",
      limit: 0,
      isAvailable: searchData.isAvailable || false,
      startTime: searchData.startTime || "",
      startDay: searchData.startDay || "",
    },
  });
  if (!errors) {
    const grounds = arrayToObject(data.searchGrounds);

    dispatch({
      type: GET_GROUNDS,
      grounds,
    });
    setLoading(false);
  } else {
    logoutDispatch(dispatch, errors);
    dispatch({
      type: GET_ERRORS,
      errors: errors[0].message,
    });
  }
};
