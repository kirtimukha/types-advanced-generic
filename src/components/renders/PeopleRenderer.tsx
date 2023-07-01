import React from 'react';
import IPerson from '../../interface/IPerson';
import Moment from 'react-moment';
import '../../styles/styles.scss';

const PeopleRenderer = (props: IPerson) => {
  const { firstName, lastName, birthday, eyeColor } = props;

  return (
    <div className={`col-12 p-3 PeopleRenderer`}>
      <div className={`card`}>
        <div className='card-body'>
          <h3>
            🧸 {firstName} {lastName}
          </h3>
          <ul>
            <li className='p-2'>
              👁️ Has <b>{eyeColor}</b> color
            </li>
            <li>
              🎂 Birthday:{' '}
              <b>
                <Moment date={birthday} format='MMMM D, YYYY' />
              </b>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PeopleRenderer;
