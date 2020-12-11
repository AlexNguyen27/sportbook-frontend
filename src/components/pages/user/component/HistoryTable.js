import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import moment from "moment";
import { connect } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";
import {
  DATE_TIME,
  ORDER_STATUS,
  PAYMENT_TYPE,
  COLOR_ORDER_STATUS,
} from "../../../../utils/common";

import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { Alert } from "reactstrap";
import Colors from "../../../../constants/Colors";
import PageLoader from "../../../custom/PageLoader";
import { capitalizeFirstLetter } from "../../../../utils/commonFunction";
import {
  getOrderHistory,
  updateOrderStatus,
} from "../../../../store/actions/order";
import VisibilityIcon from "@material-ui/icons/Visibility";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => (
    <Edit {...props} ref={ref} style={{ color: Colors.orange }} />
  )),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const HistoryTable = ({
  getOrderHistory,
  orders,
  status,
  fromDate,
  toDate,
}) => {
  const history = useHistory();
  const [state, setState] = useState({
    columns: [
      {
        title: "Ground name",
        field: "groundName",
        editable: "never",
      },
      {
        title: "Start day",
        field: "startDay",
        editable: "never",
      },
      {
        title: "Start time",
        field: "startTime",
        editable: "never",
      },
      {
        title: "End time",
        field: "endTime",
        editable: "never",
      },
      {
        title: "Price(VND)",
        field: "price",
        editable: "never",
        render: (rowData) => {
          return (
            <span>{rowData.price.replace(/\d(?=(\d{3})+\.)/g, "$&,")}</span>
          );
        },
      },
      {
        title: "Payment",
        field: "paymentType",
        lookup: PAYMENT_TYPE,
        render: (rowData) => {
          return <span>{capitalizeFirstLetter(rowData.paymentType)}</span>;
        },
        editable: "never",
      },

      {
        title: "Status",
        field: "status",
        lookup: ORDER_STATUS,
        render: (rowData) => {
          return (
            <Alert
              className="m-0 text-center"
              color={COLOR_ORDER_STATUS[rowData.status]}
            >
              {ORDER_STATUS[rowData.status]}
            </Alert>
          );
        },
        initialEditValue: "waiting_for_approve",
      },
    ],
    data: [
      {
        subGroundName: "home",
        status: "new",
        startTime: "12:00",
        endTime: "13:00",
        paymentType: "online",
        price: "100000",
        createdAt: moment("2020-05-29T14:49:05.661Z").format(DATE_TIME),
      },
      {
        subGroundName: "home",
        status: "cancelled",
        startTime: "12:00",
        endTime: "13:00",
        paymentType: "online",
        price: "100000",
        createdAt: moment("2020-05-29T14:49:05.661Z").format(DATE_TIME),
      },
      {
        subGroundName: "home",
        status: "approved",
        startTime: "12:00",
        endTime: "13:00",
        paymentType: "online",
        price: "100000",
        createdAt: moment("2020-05-29T14:49:05.661Z").format(DATE_TIME),
      },
    ],
  });

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    getOrderHistory(setLoading, status, fromDate, toDate);
  }, [status, fromDate, toDate]);

  const getDateTime = (date) => moment(date).format(DATE_TIME);
  const orderArr = Object.keys(orders).map((orderId) => ({
    ...orders[orderId],
    subGroundName: orders[orderId]?.subGround?.name || "",
    groundName: orders[orderId]?.subGround?.ground?.title,
    price: orders[orderId].price.toString(),
    discount: orders[orderId].discount.toString(),
    createdAt: getDateTime(orders[orderId].createdAt),
  }));
  return (
    <PageLoader loading={loading}>
      {/* <div
        style={{
          maxWidth: `100%`,
          overflowX: "auto",
          width: "100%",
        }}
        className="history-table"
      > */}
      <div className="history-order">
        <MaterialTable
          icons={tableIcons}
          title=""
          columns={state.columns}
          data={orderArr || []}
          options={{
            pageSize: 5,
            headerStyle: {
              fontWeight: "bold",
            },
            rowStyle: {
              width: "auto",
              // overflowX: "auto",
            },
            search: false,
            actionsColumnIndex: -1,
          }}
          actions={[
            {
              icon: () => <VisibilityIcon style={{ color: Colors.view }} />,
              tooltip: "Order detail",
              onClick: (event, rowData) => {
                history.push(`/order-detail/${rowData.id}`);
              },
            },
          ]}
        />
      </div>
      {/* </div> */}
    </PageLoader>
  );
};
const mapStateToProps = (state) => ({
  orders: state.order.orders,
});
export default connect(mapStateToProps, { getOrderHistory, updateOrderStatus })(
  withRouter(HistoryTable)
);
