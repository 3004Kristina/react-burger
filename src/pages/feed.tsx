import React, { useEffect } from 'react';
import MainTitle from '../components/main-title/main-title';
import FeedList from '../components/feed/feed-list';
import feedStyles from './feed.module.css';
import FeedInfo from '../components/feed/feed-info';
import { useDispatch } from '../services/hooks';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../services/actions/ws-orders';

export default function Feed() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED })
    }
  }, []);

  return (
    <div>
      <MainTitle
        title="Лента заказов"
      />
      <div className="container">
        <div className={feedStyles.feed_content_wrapper}>
          <FeedList />
          <FeedInfo />
        </div>
      </div>
    </div>
  );
}
