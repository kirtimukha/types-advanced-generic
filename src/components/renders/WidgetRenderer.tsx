import React from 'react';
import IWidget from '../../interface/IWidget';
import Moment from 'react-moment';

const WidgetRenderer = (props: IWidget) => {
  const { isSpecialCard, title, description, rating, created, updated, id } =
    props;
  return (
    <div className={`col-12 p-3 WidgetRenderer`}>
      <div className={isSpecialCard ? 'card specialCard' : 'card'}>
        <div className='card-body'>
          <h1 className='card-title'>{title}</h1>
          <p className='card-text'>{description}</p>
          <p className='card-text font-italic'>Rating: {rating}/10</p>
        </div>

        <div className='card-footer text-muted text-right'>
          <span className='float-left'>#{id}</span>
          &nbsp;&nbsp;|&nbsp;&nbsp; created:&nbsp;
          <Moment fromNow date={created} />
          &nbsp;&nbsp;|&nbsp;&nbsp; updated:&nbsp;
          <Moment fromNow date={updated} />
        </div>
      </div>
    </div>
  );
};

export default WidgetRenderer;
