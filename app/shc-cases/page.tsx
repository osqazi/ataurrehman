"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Link from "next/link";

interface Case {
  srNo: string;
  caseType: string;
  caseNo: string;
  caseYear: string;
  bench: string;
  circuit: string;
  parties: string;
  matter: string;
  institutionDate: string;
  lastDate: string;
  nextDate: string;
  status: string;
  caseId: string | null;
}

interface StoredData {
  cases: Case[];
  timestamp: number;
  searchParams: {
    city: string;
    caseNum: string;
    caseYear: string;
  };
}

export default function SHCCasesPage() {
  const router = useRouter();
  const [allCases, setAllCases] = useState<Case[]>([]); // All loaded cases (stored but not shown)
  const [displayCases, setDisplayCases] = useState<Case[]>([]); // Cases to display (filtered/search results)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [advocateCode] = useState("29694");
  const [city, setCity] = useState("khi");
  const [caseNum, setCaseNum] = useState('');
  const [caseYear, setCaseYear] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  // Filter states for client-side filtering
  const [filterCaseNum, setFilterCaseNum] = useState('');
  const [filterCaseYear, setFilterCaseYear] = useState('');
  const [filterCity, setFilterCity] = useState('karachi');
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [hasInitialData, setHasInitialData] = useState(false);

  // Session storage key
  const STORAGE_KEY = 'shc-cases-data';
  const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

  // Get data from session storage
  const getStoredData = (): StoredData | null => {
    if (typeof window === 'undefined') return null;
    
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (!stored) return null;
      
      const data: StoredData = JSON.parse(stored);
      
      // Check if data is still valid (within 10 minutes)
      const isExpired = Date.now() - data.timestamp > CACHE_DURATION;
      if (isExpired) {
        sessionStorage.removeItem(STORAGE_KEY);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Error reading from session storage:', error);
      return null;
    }
  };

  // Save data to session storage
  const saveToStorage = (cases: Case[]) => {
    if (typeof window === 'undefined') return;
    
    try {
      const data: StoredData = {
        cases,
        timestamp: Date.now(),
        searchParams: { city, caseNum, caseYear }
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to session storage:', error);
    }
  };

  // Clear session storage
  const clearStorage = () => {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem(STORAGE_KEY);
  };

  // Check if stored data matches current search parameters
  const isStoredDataRelevant = (storedData: StoredData): boolean => {
    return (
      storedData.searchParams.city === city &&
      storedData.searchParams.caseNum === caseNum &&
      storedData.searchParams.caseYear === caseYear
    );
  };

  // Load all cases at once
  const loadAllCases = async (isNewSearch = false, useCache = true) => {
    // Check session storage first (unless explicitly bypassing cache)
    if (useCache && !isNewSearch) {
      const storedData = getStoredData();
      if (storedData && isStoredDataRelevant(storedData)) {
        setAllCases(storedData.cases);
        // Don't display anything initially - wait for filter/search
        setDisplayCases([]);
        setHasInitialData(true);
        setLoading(false);
        return;
      }
    }

    if (isNewSearch) {
      setIsSearching(true);
      setAllCases([]);
      setDisplayCases([]);
      // Clear storage for new search
      clearStorage();
    }
    
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/shc-cases?advocateCode=${advocateCode}&city=${city}&caseNum=${caseNum}&caseYear=${caseYear}`
      );
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to fetch cases");
      }

      setAllCases(result.data);
      setHasInitialData(true);
      saveToStorage(result.data);
      
      // Auto-apply search filters if search parameters are provided
      if (caseNum || caseYear) {
        const filtered = filterCases(result.data);
        setDisplayCases(filtered);
        setIsFilterActive(true);
      } else {
        // If no search parameters, don't show any data initially
        setDisplayCases([]);
        setIsFilterActive(false);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error occurred");
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  // Client-side filtering function
  const filterCases = (casesToFilter: Case[] = allCases): Case[] => {
    return casesToFilter.filter(caseItem => {
      const matchesCaseNum = !filterCaseNum || 
        caseItem.caseNo.toLowerCase().includes(filterCaseNum.toLowerCase());
      const matchesCaseYear = !filterCaseYear || 
        caseItem.caseYear.includes(filterCaseYear);
      const matchesCity = !filterCity || filterCity === 'all' || 
        caseItem.circuit.toLowerCase().includes(filterCity.toLowerCase());
      
      return matchesCaseNum && matchesCaseYear && matchesCity;
    });
  };

  // Apply filter to loaded data
  const applyFilter = () => {
    if (allCases.length === 0) {
      setError("No data available to filter. Please load data first.");
      return;
    }
    
    const filtered = filterCases();
    setDisplayCases(filtered);
    setIsFilterActive(!!filterCaseNum || !!filterCaseYear || (filterCity !== 'all'));
  };

  // Clear all filters
  const clearFilter = () => {
    setFilterCaseNum('');
    setFilterCaseYear('');
    setFilterCity('karachi');
    setDisplayCases([]);
    setIsFilterActive(false);
  };

  // Show all data (remove filters)
  const showAllData = () => {
    setDisplayCases(allCases);
    setIsFilterActive(false);
  };

  // Refresh data (bypass cache)
  const refreshData = () => {
    clearStorage();
    loadAllCases(true, false);
  };

  // Initial load - try cache first
  useEffect(() => {
    loadAllCases(false, true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadAllCases(true, false);
  };

  const handleViewCase = (caseId: string) => {
    router.push(`/shc-cases/${caseId}`);
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            Sindh High Court Cases
          </h1>
          {hasInitialData && (
            <div className="flex items-center gap-2">
              <button
                onClick={refreshData}
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-sm"
                title="Refresh data (bypass cache)"
              >
                Refresh Data
              </button>
            </div>
          )}
        </div>

        {/* Client-side Filter Form (No API Call) */}
        <div className="md:flex md:gap-4 lg:flex lg:gap-4 justify-center items-center mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-lg font-semibold text-gray-700 mb-2 md:mb-0">
            Search Case:
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Case Number
            </label>
            <input
              type="text"
              value={filterCaseNum}
              onChange={(e) => setFilterCaseNum(e.target.value)}
              placeholder="Enter case number"
              className="border rounded px-3 py-2 w-full max-w-xs"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year
            </label>
            <input
              type="text"
              value={filterCaseYear}
              onChange={(e) => setFilterCaseYear(e.target.value)}
              placeholder="Enter year"
              className="border rounded px-3 py-2 w-full max-w-xs"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Circuit
            </label>
            <select
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              className="border rounded px-3 py-2 w-full max-w-xs"
            >
              <option value="karachi">Karachi</option>
              <option value="sukkur">Sukkur</option>
              <option value="hyderabad">Hyderabad</option>
              <option value="larkana">Larkana</option>
              <option value="mirpurkhas">Mirpurkhas</option>
            </select>
          </div>
          <div className="flex gap-2 pt-4">
            <button
              onClick={applyFilter}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              disabled={!hasInitialData}
            >
              Search Case
            </button>
            <button
              onClick={clearFilter}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              disabled={!isFilterActive}
            >
              Clear
            </button>
            <Link href={'/district'}>
            <button
              className="bg-amber-700 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              District Cases
            </button>
            </Link>
          </div>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Updating. Please wait...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {!loading && !error && displayCases.length === 0 && hasInitialData && (
          <div className="text-center py-8 text-gray-600">
            {isFilterActive 
              ? "No cases match your search criteria." 
              : "Enter your Case Detail Above and Search."}
          </div>
        )}

        {!loading && displayCases.length > 0 && (
          <div className="overflow-x-auto">
            {/* <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">
                Showing {displayCases.length} of {allCases.length} cases
                {isFilterActive && " (filtered results)"}
              </p>
            </div> */}
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="px-4 py-2 border">Sr#</th>
                  <th className="px-4 py-2 border">Type</th>
                  <th className="px-4 py-2 border">Case No</th>
                  <th className="px-4 py-2 border">Year</th>
                  <th className="px-4 py-2 border">Bench</th>
                  <th className="px-4 py-2 border">Circuit</th>
                  <th className="px-4 py-2 border">Parties</th>
                  <th className="px-4 py-2 border">Matter</th>
                  <th className="px-4 py-2 border">Institution Date</th>
                  <th className="px-4 py-2 border">Last Date</th>
                  <th className="px-4 py-2 border">Next Date</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {displayCases.map((caseItem, index) => (
                  <tr key={`${caseItem.caseNo}-${caseItem.caseYear}-${index}`} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{caseItem.srNo}</td>
                    <td className="px-4 py-2 border">{caseItem.caseType}</td>
                    <td className="px-4 py-2 border">{caseItem.caseNo}</td>
                    <td className="px-4 py-2 border">{caseItem.caseYear}</td>
                    <td className="px-4 py-2 border">{caseItem.bench}</td>
                    <td className="px-4 py-2 border">{caseItem.circuit}</td>
                    <td className="px-4 py-2 border">
                      <div
                        dangerouslySetInnerHTML={{ __html: caseItem.parties }}
                      />
                    </td>
                    <td className="px-4 py-2 border">{caseItem.matter}</td>
                    <td className="px-4 py-2 border">
                      {caseItem.institutionDate}
                    </td>
                    <td className="px-4 py-2 border">{caseItem.lastDate}</td>
                    <td className="px-4 py-2 border">{caseItem.nextDate}</td>
                    <td className="px-4 py-2 border">
                      <div
                        dangerouslySetInnerHTML={{ __html: caseItem.status }}
                      />
                    </td>
                    <td className="px-4 py-2 border">
                      {caseItem.caseId ? (
                        <button
                          onClick={() => handleViewCase(caseItem.caseId!)}
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block text-sm"
                        >
                          View
                        </button>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}