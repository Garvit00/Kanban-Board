import TicketCard from "./TicketCard";


const KanbanBoard = ({ tickets, userMap, groupingOption, sortOption }) => {
  // Function to group tickets based on the grouping option
  const groupTickets = () => {
    if (!Array.isArray(tickets)) return {};

    const grouped = tickets.reduce((acc, ticket) => {
      let key;
      
      if (groupingOption === 'user') {
        key = userMap[ticket.userId] || 'Unknown User';
      } else {
        key = ticket[groupingOption];
      }

      acc[key] = acc[key] || [];
      acc[key].push(ticket);
      return acc;
    }, {});

    if (groupingOption === 'status') {
        grouped['Done'] = grouped['Done'] || [];
        grouped['Cancelled'] = grouped['Cancelled'] || [];
      }
      console.log(grouped)
    return grouped;
    
  };
  
  // Function to sort tickets based on the sort option
  const sortedTickets = (groupedTickets) => {
    Object.keys(groupedTickets).forEach((key) => {
      groupedTickets[key].sort((a, b) => {
        if (sortOption === 'priority') return b.priority - a.priority; // Descending order for priority
        if (sortOption === 'title') return a.title.localeCompare(b.title); // Alphabetical(ascending) order for title
        return 0;
      });
    });
    return groupedTickets;
  };

  const grouped = sortedTickets(groupTickets());

  const getPriorityLabel = (priority) => {
    switch (parseInt(priority)) {
      case 4:
        return(
          <span><img src='../icons/Urgent-Priority-colour.svg' alt="urgent" style={{marginRight:'7px'}}/>Urgent</span>
        );
      case 3:
          return(
              <span><img src="../icons/Img - High Priority.svg" alt="high" style={{marginRight:'7px'}}/>High</span>
            )
      case 2:
          return(
              <span><img src="../icons/Img - Medium Priority.svg" alt="medium" style={{marginRight:'7px'}}/>Medium</span>
            )
      case 1:
          return(
              <span><img src="../icons/Img - Low Priority.svg" alt="low" style={{marginRight:'7px'}}/>Low</span>
            )
      default:
          return(
              <span><img src='../icons/No-priority.svg' alt="No priority" style={{marginRight:'7px'}}/>No Priority</span>
            )
    }
  };
  
  const getStatusLabel = (status) => {
      switch (status) {
        case 'Todo':
          return(
            <span><img src='../icons/To-do.svg' alt="todo" style={{marginRight:'7px'}}/>Todo</span>
          );
        case 'In progress':
            return(
                <span><img src='../icons/in-progress.svg' alt="inprogress" style={{marginRight:'7px'}}/>In Progress</span>
              )
        case 'Backlog':
            return(
                <span><img src='../icons/Backlog.svg' alt="backlog" style={{marginRight:'7px'}}/>Backlog</span>
              )
        case 'Done':
            return(
                <span><img src='../icons/Done.svg' alt="done" style={{marginRight:'7px'}}/>Done</span>
              )
        default:
            return(
                <span><img src='../icons/Cancelled.svg' alt="cancelled" style={{marginRight:'7px'}}/>Cancelled</span>
              )
      }
    };

    const getUserLabel = (userId) => {
        return (
            <span><img src="../icons/avatar.svg" alt="avatar" style={{marginRight:'7px'}}/>{userId}</span>
        )
    }

  return (
    <div className="kanban-board">
      {Object.keys(grouped).map((group, index) => (
        <div key={index} className="kanban-column">
          <div className="kanban-column-header">
          <span>{groupingOption === 'priority' ? getPriorityLabel(group) : groupingOption=== 'status' ? getStatusLabel(group) : getUserLabel(group)}<span style={{color:"grey"}}>{grouped[group].length}</span></span>
          <div className="kanban-column-actions">
              <button className="add-ticket-button"><img src="../icons/add.svg" alt="add"/></button>
              <button className="more-options-button"><img src='../icons/No-priority.svg' alt="more options"/></button>
            </div>
        </div>
            {console.log(group)}
          {grouped[group].map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} groupingOption={groupingOption} />
          ))}
        </div>
      ))}
    </div>
  );
};


export default KanbanBoard;
