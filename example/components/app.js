import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadProducts } from '../actions';
import List from './list';

class App extends Component {
  render() {
    const {
      loadProducts,
      products
    } = this.props;

    return (
      <div>
        <h1>Products</h1>
        <button onClick={loadProducts}>
          Load
        </button>
        <List products={products} />
      </div>
    );
  }
}

export default connect(
  state => ({
    ...state.products
  }),
  dispatch => bindActionCreators({
    loadProducts: loadProducts
  }, dispatch)
)(App);
