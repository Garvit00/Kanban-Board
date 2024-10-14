import React, { useEffect, useState } from 'react';
import { fetchTickets } from './services/api';
import KanbanBoard from './components/KanbanBoard';
import Header from './components/Header';


function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupingOption, setGroupingOption] = useState(() => localStorage.getItem('groupingOption') || 'status');
  const [sortOption, setSortOption] = useState(() => localStorage.getItem('sortOption') || 'priority');

  useEffect(() => {
    const getData = async () => {
      const data = await fetchTickets();
      setTickets(data.tickets || []);
      setUsers(data.users || []);
    };
    getData();
  }, []);

  // Create a lookup map for user IDs to names
  const userMap = users.reduce((acc, user) => {
    acc[user.id] = user.name;
    return acc;
  }, {});


  useEffect(() => {
    localStorage.setItem('groupingOption', groupingOption);
    localStorage.setItem('sortOption', sortOption);
  }, [groupingOption, sortOption]);

  return (
    <div>
      <Header groupingOption={groupingOption}
        setGroupingOption={setGroupingOption}
        sortOption={sortOption}
        setSortOption={setSortOption} />
      <KanbanBoard tickets={tickets} userMap={userMap} groupingOption={groupingOption} sortOption={sortOption} />
    </div>
  );
}

export default App;
