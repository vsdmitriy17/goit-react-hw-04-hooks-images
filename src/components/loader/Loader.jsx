import React, { Component } from 'react';
import { TailSpin } from  'react-loader-spinner'
// import PropTypes from 'prop-types';

export default class Loader extends Component {
    render() {
        return (
            <TailSpin color="#3f51b5" height={200} width={200} />
        );
    }
};
