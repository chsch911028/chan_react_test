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
              id={alerts[i].id}
              status={alerts[i].status}
              type={alerts[i].type}
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