import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../common/Button';
import { adminService } from '../../services/adminService';
import { 
  Search, 
  FileDown, 
  Loader2, 
  CalendarDays, 
  X,
  Eye,
  Phone,
  Mail
} from 'lucide-react';

export function LeadCapturesSection() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    program: '',
    state: '',
    search: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    loadLeads();
  }, [currentPage, filters]);

  // Close date modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDateModal && !event.target.closest('.date-modal')) {
        setShowDateModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDateModal]);

  const loadLeads = async () => {
    try {
      setLoading(true);
      const response = await adminService.getAllLeads({
        page: currentPage,
        limit: 10,
        ...filters
      });
      setLeads(response.data.leads);
    } catch (err) {
      console.error('Failed to load leads:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = async () => {
    setIsExporting(true);
    try {
      // Combine current filters with date range
      const exportFilters = {
        ...filters,
        ...(dateRange.startDate && { startDate: dateRange.startDate }),
        ...(dateRange.endDate && { endDate: dateRange.endDate })
      };

      const response = await adminService.exportLeadsCSV(exportFilters);
      
      // Create blob from response
      const blob = new Blob([response.data], { type: 'text/csv' });
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Generate filename with current date and filters
      const timestamp = new Date().toISOString().split('T')[0];
      let filename = `leads_export_${timestamp}`;
      
      if (exportFilters.program) filename += `_${exportFilters.program}`;
      if (exportFilters.state) filename += `_${exportFilters.state}`;
      if (exportFilters.startDate) filename += `_from_${exportFilters.startDate}`;
      if (exportFilters.endDate) filename += `_to_${exportFilters.endDate}`;
      filename += '.csv';
      
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      // Clear date range filters after successful export
      setDateRange({
        startDate: '',
        endDate: ''
      });
      
      // Close date modal after successful export
      setShowDateModal(false);
    } catch (err) {
      console.error('Failed to export CSV:', err);
      alert('Failed to export CSV: ' + (err.message || 'Unknown error'));
    } finally {
      setIsExporting(false);
    }
  };

  const handleQuickDateFilter = (days) => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    setDateRange({
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    });
  };

  const clearDateFilter = () => {
    setDateRange({
      startDate: '',
      endDate: ''
    });
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-12 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-sitm-maroon mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-300">Loading lead captures...</p>
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 dark:border-slate-700">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Lead Captures
            </h2>
            
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold"
                />
              </div>
              
              <select
                value={filters.program}
                onChange={(e) => setFilters(prev => ({ ...prev, program: e.target.value }))}
                className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold"
              >
                <option value="">All Programs</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="ME">ME</option>
                <option value="CE">CE</option>
                <option value="BCA">BCA</option>
                <option value="BBA">BBA</option>
                <option value="DATA_SCIENCE">Data Science</option>
              </select>

              <select
                value={filters.state}
                onChange={(e) => setFilters(prev => ({ ...prev, state: e.target.value }))}
                className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold"
              >
                <option value="">All States</option>
                <option value="Assam">Assam</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Bihar">Bihar</option>
                <option value="Odisha">Odisha</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Other">Other States</option>
              </select>

              {/* CSV Export Button */}
              <Button
                onClick={() => setShowDateModal(true)}
                className="flex items-center gap-2 bg-sitm-maroon hover:bg-sitm-maroon/90 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
              >
                <FileDown className="w-4 h-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Program
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  State
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Academic
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <div className="text-gray-500 dark:text-gray-400">
                      <p className="text-lg font-medium mb-2">No lead captures found</p>
                      <p className="text-sm">Lead captures will appear here once students fill the lead form</p>
                    </div>
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-gray-50 dark:hover:bg-slate-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {lead.firstName} {lead.lastName}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm space-y-1">
                        <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                          <Phone size={14} className="text-gray-400" />
                          {lead.phone}
                        </div>
                        {lead.email && (
                          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <Mail size={14} className="text-gray-400" />
                            {lead.email}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900 dark:text-white">
                        {lead.program}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {lead.state}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm space-y-1">
                        <div className="text-gray-900 dark:text-white">
                          10th: {lead.tenthPercentage}%
                        </div>
                        <div className="text-gray-500 dark:text-gray-400">
                          12th: {lead.twelfthInfo}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        className="text-sitm-maroon hover:text-sitm-maroon-light dark:text-sitm-gold dark:hover:text-sitm-gold-light flex items-center gap-1"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Date Selection Modal */}
      {showDateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/60 to-black/40 backdrop-blur-md"
            onClick={() => setShowDateModal(false)}
          />

          {/* Modal */}
          <div className="date-modal relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700">
            {/* Header */}
            <div className="bg-gradient-to-r from-sitm-navy via-sitm-maroon to-sitm-navy px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <CalendarDays className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Export Leads CSV</h3>
                    <p className="text-white/80 text-sm">Select date range for export</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDateModal(false)}
                  className="p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Quick Date Filters */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Quick Filters</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleQuickDateFilter(7)}
                    className="px-4 py-3 text-sm bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors font-medium"
                  >
                    Last 7 days
                  </button>
                  <button
                    onClick={() => handleQuickDateFilter(30)}
                    className="px-4 py-3 text-sm bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors font-medium"
                  >
                    Last 30 days
                  </button>
                  <button
                    onClick={() => handleQuickDateFilter(90)}
                    className="px-4 py-3 text-sm bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors font-medium"
                  >
                    Last 3 months
                  </button>
                  <button
                    onClick={clearDateFilter}
                    className="px-4 py-3 text-sm bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors font-medium"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Custom Date Range */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Custom Date Range</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                      From Date
                    </label>
                    <input
                      type="date"
                      value={dateRange.startDate}
                      onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                      To Date
                    </label>
                    <input
                      type="date"
                      value={dateRange.endDate}
                      onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sitm-maroon dark:focus:ring-sitm-gold transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Current Selection Display */}
              {(dateRange.startDate || dateRange.endDate) && (
                <div className="p-4 bg-gradient-to-r from-sitm-maroon/10 to-sitm-navy/10 dark:from-sitm-maroon/20 dark:to-sitm-navy/20 rounded-lg border border-sitm-maroon/20 dark:border-sitm-maroon/30">
                  <h5 className="text-sm font-semibold text-sitm-maroon dark:text-sitm-maroon-light mb-2">
                    Selected Date Range
                  </h5>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-medium">From:</span> {dateRange.startDate ? new Date(dateRange.startDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      }) : 'Not selected'}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-medium">To:</span> {dateRange.endDate ? new Date(dateRange.endDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      }) : 'Not selected'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-slate-800 rounded-b-2xl border-t border-gray-200 dark:border-slate-700">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDateModal(false)}
                  className="flex-1"
                  disabled={isExporting}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleExportCSV}
                  disabled={isExporting}
                  className="flex-1 bg-sitm-maroon hover:bg-sitm-maroon/90 text-white"
                >
                  {isExporting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <FileDown className="w-4 h-4 mr-2" />
                      Export CSV
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
