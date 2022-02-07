import React from 'react';

interface IMainTitle {
  title: string;
}
function MainTitle({ title }: IMainTitle) {
  return (
    <div className="container">
      <h1 className="text text_type_main-large mb-5">{title}</h1>
    </div>
  );
}

export default MainTitle;
