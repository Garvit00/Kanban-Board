import React from 'react';
const TicketCard = ({ ticket, groupingOption }) => {

    const getStatusLabel = (status) => {
        switch (status) {
          case 'Todo':
            return(
              <span><img src='../icons/To-do.svg' alt="todo" style={{marginRight:'7px'}}/></span>
            );
          case 'In progress':
              return(
                  <span><img src='../icons/in-progress.svg' alt="inprogress" style={{marginRight:'7px'}}/></span>
                )
          case 'Backlog':
              return(
                  <span><img src='../icons/Backlog.svg' alt="backlog" style={{marginRight:'7px'}}/></span>
                )
          case 'Done':
              return(
                  <span><img src='../icons/Done.svg' alt="done" style={{marginRight:'7px'}}/></span>
                )
          default:
              return(
                  <span><img src='../icons/Cancelled.svg' alt="cancelled" style={{marginRight:'7px'}}/></span>
                )
        }
      };

      const getPriorityLabel = (priority) => {
        switch (parseInt(priority)) {
          case 4:
            return(
              <span><img src='../icons/Urgent-Priority-colour.svg' alt="urgent" style={{marginRight:'7px'}}/></span>
            );
          case 3:
              return(
                  <span><img src='../icons/Img - High Priority.svg' alt="high" style={{marginRight:'7px'}}/></span>
                )
          case 2:
              return(
                  <span><img src='../icons/Img - Medium Priority.svg' alt="medium" style={{marginRight:'7px'}}/></span>
                )
          case 1:
              return(
                  <span><img src='../icons/Img - Low Priority.svg' alt="low" style={{marginRight:'7px'}}/></span>
                )
          default:
              return(
                  <span><img src='../icons/No-priority.svg' alt="No priority" style={{marginRight:'7px'}}/></span>
                )
        }
      };

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
          <img src='../icons/avatar.svg' alt='' className="avatar" />
      </div>

      <div className="ticket-title">
        
        <h3>
            {(groupingOption === 'user' || groupingOption === 'priority') && (
            <span>{getStatusLabel(ticket.status)}</span>
            )}
            
            {ticket.title}</h3>
      </div>

      <div className="ticket-details">
        <div className="ticket-priority">
            {(groupingOption === 'status' || groupingOption === 'user') && (
            <span>{getPriorityLabel(ticket.priority)}</span>
            )}
        </div>

        <div className="ticket-tag">
          <span>{<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="5" cy="5" r="5" fill="#d3d3d3" />
                </svg>
                }{ticket.tag[0]}
            </span>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
