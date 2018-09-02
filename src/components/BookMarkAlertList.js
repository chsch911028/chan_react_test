import React from 'react';
import BookMarkAlert from './BookMarkAlert';

const BookMarkAlertList = ({ alerts, onUndoBookMark, onUpdateStatusBMAV }) => {

  return (
    <div className='alert_area' >
      { 
        alerts.map((alert, i) => {
          return(
            <BookMarkAlert
              key={i}
              id={alert.id}
              type={alert.type}
              onUpdateStatusBMAV={onUpdateStatusBMAV}
              onUndoBookMark={onUndoBookMark}              
            />  
          );
        }).reverse()
      }
    </div>
  );
}

export default BookMarkAlertList;