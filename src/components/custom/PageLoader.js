import React, { Fragment } from 'react';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import Colors from '../../constants/Colors';

const PageLoader = ({ loading, children, style, noPadding }) => {
  const custom = noPadding ? {paddingTop: '0px'} : {paddingTop: "100px"}
  return loading ? (
    <div style={{ ...style, ...LoadingStyle, ...custom}}>
      <Loader type="Audio" color={Colors.purple} height="60" width="60" />
    </div>
  ) : (
    <Fragment>{children}</Fragment>
  );
};

PageLoader.propsType = {
  loading: PropTypes.bool,
};

const LoadingStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  // paddingTop: '100px',
};

export default PageLoader;
