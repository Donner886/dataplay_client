import React from 'react';
import {connect} from 'dva'
import ProductList from './ProductList'


const Products = ({dispatch, products}) => {
  function handleDelete(id){
    dispatch({
      type:'products/delete',
      payload:id
    })
  }

  return (
    <div>
      <h2>List of products</h2>
      <ProductList onDelete={handleDelete} products={products} />
    </div>
  );
};


export default connect(({products}) => ({products}) )(Products)
