import React from 'react';

const List = ({products}) => {
  return (
    <ul>
      {products.map(product => {
        return (
          <li key={product.id}>
            {product.get('attributes.name')}
          </li>
        );
      })}
    </ul>
  );
};

export default List;
