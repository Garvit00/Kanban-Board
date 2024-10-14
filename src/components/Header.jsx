import React, {useState, useEffect, useRef} from 'react';
import Display from '../icons/Display.svg';
import down from '../icons/down.svg';

const Header = ({ groupingOption, setGroupingOption, sortOption, setSortOption }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null)
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (setterFunction, value) => {
    setterFunction(value);
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false); // Close the dropdown if clicked outside
    }
  };

  // Add event listener for clicks outside of the dropdown when it's open
  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Cleanup event listener
    };
  }, [isDropdownOpen]);

    return (
    <div className="kanban-header">
      <div className="header-left">
        <div className="dropdown" ref={dropdownRef}>
          <button onClick={toggleDropdown} className="dropdown-button">
            <img src={Display} alt='display'/><span style={{marginLeft: '5px'}}>Display</span>
            <img src={down} alt='down'/>
          </button>
          
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-group">
                <label htmlFor="grouping">Grouping</label>
                <select
                  id="grouping"
                  value={groupingOption}
                  onChange={(e) => handleOptionSelect(setGroupingOption, e.target.value)}
                >
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>

              <div className="dropdown-group">
                <label htmlFor="ordering">Ordering</label>
                <select
                  id="ordering"
                  value={sortOption}
                  onChange={(e) => handleOptionSelect(setSortOption, e.target.value)}
                >
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
      );
    };
  
  export default Header;
  