import React from 'react';
import feedListStyles from './feed-list.module.css';
import FeedListItem from './feed-list-item';
import { useSelector } from '../../services/hooks';

export interface IFeedListProps {
  profile?: boolean;
}

function FeedList({ profile }: IFeedListProps) {
  const { orders } = useSelector((store) => {
    const messages = [...store.wsData.messages];
    const actualOrder = messages[messages.length - 1];

    return {
      orders: actualOrder?.orders || [],
    };
  });

  orders.sort((a, b) => {
    const aDate = new Date(a.createdAt);
    const bDate = new Date(b.createdAt);

    return aDate > bDate ? -1 : 1;
  })

  return (
    <div>
      <div className={feedListStyles.feed_inner_wrapper}>
        <div
          className={`${feedListStyles.feed_list_wrapper} custom-scroll pr-2`}
        >
          {orders.map((order) => {
            const { _id: orderId } = order;
            return (
              <FeedListItem
                key={orderId}
                order={order}
                profile={profile}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FeedList;
