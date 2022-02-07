import React from 'react';
import feedListStyles from './feed-list.module.css';
import { useSelector } from '../../services/hooks';

function FeedInfo() {
  const { actualOrder } = useSelector((store) => ({
    actualOrder: store.wsData.messages[store.wsData.messages.length - 1],
  }));

  return (
    <div>
      <div className={feedListStyles.feed_info_wrapper}>
        <div className={`${feedListStyles.status_wrapper} mb-15`}>
          <div>
            <div className="text text_type_main-medium mb-6">Готовы:</div>
            <div className={`${feedListStyles.status_item} ${feedListStyles.done}`}>
              {actualOrder?.orders?.filter(({ status }) => status === 'done').map((item) => {
                return (
                  <div
                    key={item._id}
                    className="text text_type_digits-default"
                  >
                    {item.number}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div className="text text_type_main-medium mb-6">В работе:</div>
            <div className={feedListStyles.status_item}>
              {actualOrder?.orders?.filter(({ status }) => status !== 'done').map((item) => {
                return (
                  <div
                    key={item._id}
                    className="text text_type_digits-default"
                  >
                    {item.number}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mb-10">
          <div className="text text_type_main-medium">
            Выполнено за все время:
          </div>
          <div className={`${feedListStyles.amount} text text_type_digits-large`}>
            {actualOrder?.total}
          </div>
        </div>
        <div>
          <div className="text text_type_main-medium">
            Выполнено за сегодня:
          </div>
          <div className={`${feedListStyles.amount} text text_type_digits-large`}>
            {actualOrder?.totalToday}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedInfo;
