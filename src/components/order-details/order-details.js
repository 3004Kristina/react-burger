import React from 'react';
import PropTypes from 'prop-types';
import doneImagePath from '../../images/done.gif';

export default function OrderDetails({ orderNumber }) {
  return (
    <>
      <span className="text text_type_digits-large mt-20 mb-8">{orderNumber}</span>
      <span className="text text_type_main-medium mb-15">идентификатор заказа</span>
      <img className="mb-15" src={doneImagePath} alt="done" />
      <span className="text text_type_main-default mb-2">Ваш заказ начали готовить</span>
      <span className="text text_type_main-default text_color_inactive mb-20">Дождитесь готовности на орбитальной станции</span>
    </>
  );
}

OrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired,
}
