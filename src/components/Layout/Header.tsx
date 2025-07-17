import React from 'react';
import { Search, Bell, User, LogOut, Calendar, Filter } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { GlobalSearchModal } from '../GlobalSearchModal';
import { DateRangeModal } from '../DateRangeModal';
import { FilterModal } from '../FilterModal';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [showSearch, setShowSearch] = React.useState(false);
  const [showDateRange, setShowDateRange] = React.useState(false);
  const [showFilters, setShowFilters] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [dateRange, setDateRange] = React.useState('01/01/24 - 31/12/25');

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="px-6 py-4 max-w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1 max-w-4xl mr-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearch(true)}
                placeholder="Search & Knowledge Discovery - ASK YOUR AI ASSISTANT"
                className="w-full pl-12 pr-6 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md bg-gray-50 focus:bg-white"
              />
            </div>
            <button
              onClick={() => setShowDateRange(true)}
              className="flex items-center px-4 py-3 bg-white border-2 border-gray-300 rounded-xl hover:border-primary-500 transition-colors whitespace-nowrap"
            >
              <Calendar className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-sm font-medium text-gray-700">Date Range: {dateRange}</span>
            </button>
            <button 
              onClick={() => setShowFilters(true)}
              className="flex items-center px-4 py-3 bg-white border-2 border-gray-300 rounded-xl hover:border-primary-500 transition-colors"
            >
              <Filter className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-sm font-medium text-gray-700">Filters</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Bell className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-900">{user?.name}</p>
                <p className="text-gray-500">{user?.role}</p>
              </div>
              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showSearch && (
        <GlobalSearchModal
          query={searchQuery}
          onClose={() => setShowSearch(false)}
          onQueryChange={setSearchQuery}
        />
      )}

      {showDateRange && (
        <DateRangeModal
          currentRange={dateRange}
          onClose={() => setShowDateRange(false)}
          onRangeChange={setDateRange}
        />
      )}

      {showFilters && (
        <FilterModal
          onClose={() => setShowFilters(false)}
        />
      )}
    </header>
  );
};