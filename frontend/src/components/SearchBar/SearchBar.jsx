import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <Search className="search-icon" size={20} />
      <input type="text" placeholder="Search for products, brands and more" />
    </div>
  );
};

export default SearchBar;
