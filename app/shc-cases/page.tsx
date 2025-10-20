
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Header from "../components/Header";

// interface Case {
//   srNo: string;
//   caseType: string;
//   caseNo: string;
//   caseYear: string;
//   bench: string;
//   circuit: string;
//   parties: string;
//   matter: string;
//   institutionDate: string;
//   lastDate: string;
//   nextDate: string;
//   status: string;
//   caseId: string | null;
// }

// interface StoredData {
//   cases: Case[];
//   timestamp: number;
//   searchParams: {
//     city: string;
//     caseNum: string;
//     caseYear: string;
//   };
// }

// export default function SHCCasesPage() {
//   const router = useRouter();
//   const [allCases, setAllCases] = useState<Case[]>([]); // All loaded cases
//   const [filteredCases, setFilteredCases] = useState<Case[]>([]); // Filtered cases for display
//   const [loading, setLoading] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [advocateCode] = useState("29694");
//   const [city, setCity] = useState("khi");
//   const [caseNum, setCaseNum] = useState('');
//   const [caseYear, setCaseYear] = useState('');
//   const [isSearching, setIsSearching] = useState(false);
//   const [allDataLoaded, setAllDataLoaded] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [progress, setProgress] = useState({ current: 0, total: 0 });
  
//   // Filter states for client-side filtering
//   const [filterCaseNum, setFilterCaseNum] = useState('');
//   const [filterCaseYear, setFilterCaseYear] = useState('');
//   const [filterCity, setFilterCity] = useState('khi');
//   const [isFilterActive, setIsFilterActive] = useState(false);

//   // Session storage key
//   const STORAGE_KEY = 'shc-cases-data';
//   const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

//   // Get data from session storage
//   const getStoredData = (): StoredData | null => {
//     if (typeof window === 'undefined') return null;
    
//     try {
//       const stored = sessionStorage.getItem(STORAGE_KEY);
//       if (!stored) return null;
      
//       const data: StoredData = JSON.parse(stored);
      
//       // Check if data is still valid (within 10 minutes)
//       const isExpired = Date.now() - data.timestamp > CACHE_DURATION;
//       if (isExpired) {
//         sessionStorage.removeItem(STORAGE_KEY);
//         return null;
//       }
      
//       return data;
//     } catch (error) {
//       console.error('Error reading from session storage:', error);
//       return null;
//     }
//   };

//   // Save data to session storage
//   const saveToStorage = (cases: Case[]) => {
//     if (typeof window === 'undefined') return;
    
//     try {
//       const data: StoredData = {
//         cases,
//         timestamp: Date.now(),
//         searchParams: { city, caseNum, caseYear }
//       };
//       sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
//     } catch (error) {
//       console.error('Error saving to session storage:', error);
//     }
//   };

//   // Clear session storage
//   const clearStorage = () => {
//     if (typeof window === 'undefined') return;
//     sessionStorage.removeItem(STORAGE_KEY);
//   };

//   // Check if stored data matches current search parameters
//   const isStoredDataRelevant = (storedData: StoredData): boolean => {
//     return (
//       storedData.searchParams.city === city &&
//       storedData.searchParams.caseNum === caseNum &&
//       storedData.searchParams.caseYear === caseYear
//     );
//   };

//   // Fetch a single page
//   const fetchPage = async (page: number) => {
//     try {
//       const response = await fetch(
//         `/api/shc-cases?advocateCode=29694&page=${page}&city=${city}&caseNum=${caseNum}&caseYear=${caseYear}`
//       );
//       const result = await response.json();

//       if (!result.success) {
//         throw new Error(result.error || "Failed to fetch cases");
//       }

//       return result;
//     } catch (err) {
//       throw err;
//     }
//   };

//   // Load all pages sequentially
//   const loadAllCases = async (isNewSearch = false, useCache = true) => {
//     // Check session storage first (unless explicitly bypassing cache)
//     if (useCache && !isNewSearch) {
//       const storedData = getStoredData();
//       if (storedData && isStoredDataRelevant(storedData)) {
//         setAllCases(storedData.cases);
//         setFilteredCases(storedData.cases);
//         setAllDataLoaded(true);
//         setLoading(false);
//         return;
//       }
//     }

//     if (isNewSearch) {
//       setIsSearching(true);
//       setAllCases([]);
//       setFilteredCases([]);
//       setAllDataLoaded(false);
//       setCurrentPage(1);
//       // Reset filters when new search is performed
//       setFilterCaseNum('');
//       setFilterCaseYear('');
//       setFilterCity(city);
//       setIsFilterActive(false);
//       // Clear storage for new search
//       clearStorage();
//     }
    
//     setLoading(true);
//     setError(null);

//     try {
//       // Fetch first page immediately
//       const firstPageResult = await fetchPage(1);
//       setAllCases(firstPageResult.data);
//       setFilteredCases(firstPageResult.data); // Initially show all cases
//       setLoading(false);
      
//       // Update progress
//       if (firstPageResult.totalCount) {
//         const estimatedTotalPages = Math.ceil(firstPageResult.totalCount / 20);
//         setProgress({ current: 1, total: estimatedTotalPages });
//       }

//       // If there are more pages, start fetching them sequentially
//       if (firstPageResult.hasNextPage && firstPageResult.data.length > 0) {
//         setLoadingMore(true);
//         let nextPage = 2;
//         let allFetchedCases = [...firstPageResult.data];
        
//         while (true) {
//           try {
//             const nextPageResult = await fetchPage(nextPage);
            
//             if (nextPageResult.success && nextPageResult.data.length > 0) {
//               // Append new cases
//               allFetchedCases = [...allFetchedCases, ...nextPageResult.data];
//               setAllCases(allFetchedCases);
              
//               // Also update filtered cases with the new data
//               setFilteredCases(prevFiltered => {
//                 if (isFilterActive) {
//                   // Apply current filter to new data
//                   return filterCases(allFetchedCases);
//                 }
//                 return allFetchedCases;
//               });
              
//               // Update progress
//               setProgress(prev => ({ ...prev, current: nextPage }));
              
//               // Check if there are more pages
//               if (nextPageResult.hasNextPage) {
//                 nextPage++;
                
//                 // Small delay to prevent overwhelming the server
//                 await new Promise(resolve => setTimeout(resolve, 100));
//               } else {
//                 // No more pages - save to storage
//                 saveToStorage(allFetchedCases);
//                 setAllDataLoaded(true);
//                 setLoadingMore(false);
//                 break;
//               }
//             } else {
//               // No data or error in response - save what we have
//               saveToStorage(allFetchedCases);
//               setAllDataLoaded(true);
//               setLoadingMore(false);
//               break;
//             }
//           } catch (err) {
//             console.error(`Error fetching page ${nextPage}:`, err);
//             // Save what we have so far and continue
//             saveToStorage(allFetchedCases);
//             nextPage++;
//           }
//         }
//       } else {
//         // Only one page or no data - save to storage
//         saveToStorage(firstPageResult.data);
//         setAllDataLoaded(true);
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Network error occurred");
//       setLoading(false);
//       setLoadingMore(false);
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   // Client-side filtering function
//   const filterCases = (casesToFilter: Case[] = allCases): Case[] => {
//     return casesToFilter.filter(caseItem => {
//       const matchesCaseNum = !filterCaseNum || 
//         caseItem.caseNo.toLowerCase().includes(filterCaseNum.toLowerCase());
//       const matchesCaseYear = !filterCaseYear || 
//         caseItem.caseYear.includes(filterCaseYear);
//       const matchesCity = !filterCity || filterCity === 'all' || 
//         caseItem.circuit.toLowerCase().includes(filterCity.toLowerCase());
      
//       return matchesCaseNum && matchesCaseYear && matchesCity;
//     });
//   };

//   // Apply filter to loaded data
//   const applyFilter = () => {
//     const filtered = filterCases();
//     setFilteredCases(filtered);
//     setIsFilterActive(!!filterCaseNum || !!filterCaseYear || (filterCity !== 'all'));
//   };

//   // Clear all filters
//   const clearFilter = () => {
//     setFilterCaseNum('');
//     setFilterCaseYear('');
//     setFilterCity('all');
//     setFilteredCases(allCases);
//     setIsFilterActive(false);
//   };

//   // Refresh data (bypass cache)
//   const refreshData = () => {
//     clearStorage();
//     loadAllCases(true, false);
//   };

//   // Initial load - try cache first
//   useEffect(() => {
//     loadAllCases(false, true);
//   }, []);

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     loadAllCases(true, false);
//   };

//   const handleViewCase = (caseId: string) => {
//     router.push(`/shc-cases/${caseId}`);
//   };

//   // Progress percentage for the progress bar
//   const progressPercentage = progress.total > 0 
//     ? Math.min(100, (progress.current / progress.total) * 100)
//     : 0;

//   return (
//     <div>
//       <Header />
//       <div className="container mx-auto p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">
//             Sindh High Court Cases
//           </h1>
//           {allDataLoaded && (
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-gray-600">
//                 Data cached for 10 minutes
//               </span>
//               <button
//                 onClick={refreshData}
//                 className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-sm"
//                 title="Refresh data (bypass cache)"
//               >
//                 Refresh Data
//               </button>
//             </div>
//           )}
//         </div>

        
//         {/* Client-side Filter Form (No API Call) */}
//         {allCases.length > 0 && allDataLoaded && (
//           <div className="md:flex md:gap-4 lg:flex lg:gap-4 justify-center items-center mb-6 p-4 bg-gray-50 rounded-lg">
//             <div className="text-lg font-semibold text-gray-700 mb-2 md:mb-0">
//               Filter Loaded Data:
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Case Number
//               </label>
//               <input
//                 type="text"
//                 value={filterCaseNum}
//                 onChange={(e) => setFilterCaseNum(e.target.value)}
//                 placeholder="Filter by case number"
//                 className="border rounded px-3 py-2 w-full max-w-xs"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Year
//               </label>
//               <input
//                 type="text"
//                 value={filterCaseYear}
//                 onChange={(e) => setFilterCaseYear(e.target.value)}
//                 placeholder="Filter by year"
//                 className="border rounded px-3 py-2 w-full max-w-xs"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Circuit
//               </label>
//               <select
//                 value={filterCity}
//                 onChange={(e) => setFilterCity(e.target.value)}
//                 className="border rounded px-3 py-2 w-full max-w-xs"
//               >
//                 <option value="all">All Circuits</option>
//                 <option value="karachi">Karachi</option>
//                 <option value="sukkur">Sukkur</option>
//                 <option value="hyderabad">Hyderabad</option>
//                 <option value="larkana">Larkana</option>
//                 <option value="mirpurkhas">Mirpurkhas</option>
//               </select>
//             </div>
//             <div className="flex gap-2 pt-4">
//               <button
//                 onClick={applyFilter}
//                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//               >
//                 Apply Filter
//               </button>
//               <button
//                 onClick={clearFilter}
//                 className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
//                 disabled={!isFilterActive}
//               >
//                 Clear
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Progress Bar for multi-page loading */}
//         {loadingMore && (
//           <div className="mt-4">
//             <div className="bg-gray-200 rounded-full h-2.5">
//               <div 
//                 className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
//                 style={{ width: `${progressPercentage}%` }}
//               ></div>
//             </div>
//             <div className="text-center text-sm text-gray-600 mt-1">
//               Loading additional pages... {progress.current} of {progress.total}
//             </div>
//           </div>
//         )}

//         {loading && (
//           <div className="text-center py-8">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//             <p className="mt-4 text-gray-600">Loading cases...</p>
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//             {error}
//           </div>
//         )}

//         {!loading && !error && filteredCases.length === 0 && (
//           <div className="text-center py-8 text-gray-600">
//             {isFilterActive ? "No cases match your filter criteria." : "No cases found for this advocate code."}
//           </div>
//         )}

//         {!loading && filteredCases.length > 0 && (
//           <div className="overflow-x-auto">
//             <div className="mb-4 flex justify-between items-center">
//               <p className="text-gray-600">
//                 Showing {filteredCases.length} of {allCases.length} cases
//                 {loadingMore && " (loading more...)"}
//                 {allDataLoaded && !isFilterActive && " - All cases loaded"}
//                 {isFilterActive && " - Filtered results"}
//               </p>
//               <div className="flex items-center gap-2">
//                 {loadingMore && (
//                   <div className="flex items-center text-blue-600">
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
//                     Loading...
//                   </div>
//                 )}
//                 {allDataLoaded && !isFilterActive && (
//                   <div className="text-green-600 font-medium">
//                     ✓ All data loaded
//                   </div>
//                 )}
//                 {isFilterActive && (
//                   <div className="text-blue-600 font-medium">
//                     🔍 Filter Active
//                   </div>
//                 )}
//               </div>
//             </div>
//             <table className="min-w-full bg-white border border-gray-300">
//               <thead className="bg-gray-100 sticky top-0">
//                 <tr>
//                   <th className="px-4 py-2 border">Sr#</th>
//                   <th className="px-4 py-2 border">Type</th>
//                   <th className="px-4 py-2 border">Case No</th>
//                   <th className="px-4 py-2 border">Year</th>
//                   <th className="px-4 py-2 border">Bench</th>
//                   <th className="px-4 py-2 border">Circuit</th>
//                   <th className="px-4 py-2 border">Parties</th>
//                   <th className="px-4 py-2 border">Matter</th>
//                   <th className="px-4 py-2 border">Institution Date</th>
//                   <th className="px-4 py-2 border">Last Date</th>
//                   <th className="px-4 py-2 border">Next Date</th>
//                   <th className="px-4 py-2 border">Status</th>
//                   <th className="px-4 py-2 border">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredCases.map((caseItem, index) => (
//                   <tr key={`${caseItem.caseNo}-${caseItem.caseYear}-${index}`} className="hover:bg-gray-50">
//                     <td className="px-4 py-2 border">{caseItem.srNo}</td>
//                     <td className="px-4 py-2 border">{caseItem.caseType}</td>
//                     <td className="px-4 py-2 border">{caseItem.caseNo}</td>
//                     <td className="px-4 py-2 border">{caseItem.caseYear}</td>
//                     <td className="px-4 py-2 border">{caseItem.bench}</td>
//                     <td className="px-4 py-2 border">{caseItem.circuit}</td>
//                     <td className="px-4 py-2 border">
//                       <div
//                         dangerouslySetInnerHTML={{ __html: caseItem.parties }}
//                       />
//                     </td>
//                     <td className="px-4 py-2 border">{caseItem.matter}</td>
//                     <td className="px-4 py-2 border">
//                       {caseItem.institutionDate}
//                     </td>
//                     <td className="px-4 py-2 border">{caseItem.lastDate}</td>
//                     <td className="px-4 py-2 border">{caseItem.nextDate}</td>
//                     <td className="px-4 py-2 border">
//                       <div
//                         dangerouslySetInnerHTML={{ __html: caseItem.status }}
//                       />
//                     </td>
//                     <td className="px-4 py-2 border">
//                       {caseItem.caseId ? (
//                         <button
//                           onClick={() => handleViewCase(caseItem.caseId!)}
//                           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block text-sm"
//                         >
//                           View
//                         </button>
//                       ) : (
//                         <span className="text-gray-400">N/A</span>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Header from "../components/Header";

// interface Case {
//   srNo: string;
//   caseType: string;
//   caseNo: string;
//   caseYear: string;
//   bench: string;
//   circuit: string;
//   parties: string;
//   matter: string;
//   institutionDate: string;
//   lastDate: string;
//   nextDate: string;
//   status: string;
//   caseId: string | null;
// }

// interface StoredData {
//   cases: Case[];
//   timestamp: number;
//   searchParams: {
//     city: string;
//     caseNum: string;
//     caseYear: string;
//   };
// }

// export default function SHCCasesPage() {
//   const router = useRouter();
//   const [allCases, setAllCases] = useState<Case[]>([]); // All loaded cases
//   const [filteredCases, setFilteredCases] = useState<Case[]>([]); // Filtered cases for display
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [advocateCode] = useState("29694");
//   const [city, setCity] = useState("khi");
//   const [caseNum, setCaseNum] = useState('');
//   const [caseYear, setCaseYear] = useState('');
//   const [isSearching, setIsSearching] = useState(false);
  
//   // Filter states for client-side filtering
//   const [filterCaseNum, setFilterCaseNum] = useState('');
//   const [filterCaseYear, setFilterCaseYear] = useState('');
//   const [filterCity, setFilterCity] = useState('khi');
//   const [isFilterActive, setIsFilterActive] = useState(false);

//   // Session storage key
//   const STORAGE_KEY = 'shc-cases-data';
//   const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

//   // Get data from session storage
//   const getStoredData = (): StoredData | null => {
//     if (typeof window === 'undefined') return null;
    
//     try {
//       const stored = sessionStorage.getItem(STORAGE_KEY);
//       if (!stored) return null;
      
//       const data: StoredData = JSON.parse(stored);
      
//       // Check if data is still valid (within 10 minutes)
//       const isExpired = Date.now() - data.timestamp > CACHE_DURATION;
//       if (isExpired) {
//         sessionStorage.removeItem(STORAGE_KEY);
//         return null;
//       }
      
//       return data;
//     } catch (error) {
//       console.error('Error reading from session storage:', error);
//       return null;
//     }
//   };

//   // Save data to session storage
//   const saveToStorage = (cases: Case[]) => {
//     if (typeof window === 'undefined') return;
    
//     try {
//       const data: StoredData = {
//         cases,
//         timestamp: Date.now(),
//         searchParams: { city, caseNum, caseYear }
//       };
//       sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
//     } catch (error) {
//       console.error('Error saving to session storage:', error);
//     }
//   };

//   // Clear session storage
//   const clearStorage = () => {
//     if (typeof window === 'undefined') return;
//     sessionStorage.removeItem(STORAGE_KEY);
//   };

//   // Check if stored data matches current search parameters
//   const isStoredDataRelevant = (storedData: StoredData): boolean => {
//     return (
//       storedData.searchParams.city === city &&
//       storedData.searchParams.caseNum === caseNum &&
//       storedData.searchParams.caseYear === caseYear
//     );
//   };

//   // Load all cases at once
//   const loadAllCases = async (isNewSearch = false, useCache = true) => {
//     // Check session storage first (unless explicitly bypassing cache)
//     if (useCache && !isNewSearch) {
//       const storedData = getStoredData();
//       if (storedData && isStoredDataRelevant(storedData)) {
//         setAllCases(storedData.cases);
//         setFilteredCases(storedData.cases);
//         setLoading(false);
//         return;
//       }
//     }

//     if (isNewSearch) {
//       setIsSearching(true);
//       setAllCases([]);
//       setFilteredCases([]);
//       // Reset filters when new search is performed
//       setFilterCaseNum('');
//       setFilterCaseYear('');
//       setFilterCity(city);
//       setIsFilterActive(false);
//       // Clear storage for new search
//       clearStorage();
//     }
    
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(
//         `/api/shc-cases?advocateCode=${advocateCode}&city=${city}&caseNum=${caseNum}&caseYear=${caseYear}`
//       );
//       const result = await response.json();

//       if (!result.success) {
//         throw new Error(result.error || "Failed to fetch cases");
//       }

//       setAllCases(result.data);
//       setFilteredCases(result.data);
//       saveToStorage(result.data);
      
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Network error occurred");
//     } finally {
//       setLoading(false);
//       setIsSearching(false);
//     }
//   };

//   // Client-side filtering function
//   const filterCases = (casesToFilter: Case[] = allCases): Case[] => {
//     return casesToFilter.filter(caseItem => {
//       const matchesCaseNum = !filterCaseNum || 
//         caseItem.caseNo.toLowerCase().includes(filterCaseNum.toLowerCase());
//       const matchesCaseYear = !filterCaseYear || 
//         caseItem.caseYear.includes(filterCaseYear);
//       const matchesCity = !filterCity || filterCity === 'all' || 
//         caseItem.circuit.toLowerCase().includes(filterCity.toLowerCase());
      
//       return matchesCaseNum && matchesCaseYear && matchesCity;
//     });
//   };

//   // Apply filter to loaded data
//   const applyFilter = () => {
//     const filtered = filterCases();
//     setFilteredCases(filtered);
//     setIsFilterActive(!!filterCaseNum || !!filterCaseYear || (filterCity !== 'all'));
//   };

//   // Clear all filters
//   const clearFilter = () => {
//     setFilterCaseNum('');
//     setFilterCaseYear('');
//     setFilterCity('all');
//     setFilteredCases(allCases);
//     setIsFilterActive(false);
//   };

//   // Refresh data (bypass cache)
//   const refreshData = () => {
//     clearStorage();
//     loadAllCases(true, false);
//   };

//   // Initial load - try cache first
//   useEffect(() => {
//     loadAllCases(false, true);
//   }, []);

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     loadAllCases(true, false);
//   };

//   const handleViewCase = (caseId: string) => {
//     router.push(`/shc-cases/${caseId}`);
//   };

//   return (
//     <div>
//       <Header />
//       <div className="container mx-auto p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">
//             Sindh High Court Cases
//           </h1>
//           {allCases.length > 0 && (
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-gray-600">
//                 Data cached for 10 minutes
//               </span>
//               <button
//                 onClick={refreshData}
//                 className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-sm"
//                 title="Refresh data (bypass cache)"
//               >
//                 Refresh Data
//               </button>
//             </div>
//           )}
//         </div>
//         {/* Client-side Filter Form (No API Call) */}
//         {allCases.length > 0 && (
//           <div className="md:flex md:gap-4 lg:flex lg:gap-4 justify-center items-center mb-6 p-4 bg-gray-50 rounded-lg">
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Case Number
//               </label>
//               <input
//                 type="text"
//                 value={filterCaseNum}
//                 onChange={(e) => setFilterCaseNum(e.target.value)}
//                 placeholder="Filter by case number"
//                 className="border rounded px-3 py-2 w-full max-w-xs"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Year
//               </label>
//               <input
//                 type="text"
//                 value={filterCaseYear}
//                 onChange={(e) => setFilterCaseYear(e.target.value)}
//                 placeholder="Filter by year"
//                 className="border rounded px-3 py-2 w-full max-w-xs"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Circuit
//               </label>
//               <select
//                 value={filterCity}
//                 onChange={(e) => setFilterCity(e.target.value)}
//                 className="border rounded px-3 py-2 w-full max-w-xs"
//               >
//                 <option value="karachi">Karachi</option>
//                 <option value="sukkur">Sukkur</option>
//                 <option value="hyderabad">Hyderabad</option>
//                 <option value="larkana">Larkana</option>
//                 <option value="mirpurkhas">Mirpurkhas</option>
//               </select>
//             </div>
//             <div className="flex gap-2 pt-4">
//               <button
//                 onClick={applyFilter}
//                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//               >
//                 Search Case
//               </button>
//               <button
//                 onClick={clearFilter}
//                 className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
//                 disabled={!isFilterActive}
//               >
//                 Clear
//               </button>
//             </div>
//           </div>
//         )}

//         {loading && (
//           <div className="text-center py-8">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//             <p className="mt-4 text-gray-600">Fetching Update Data...</p>
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//             {error}
//           </div>
//         )}

//         {!loading && !error && filteredCases.length === 0 && (
//           <div className="text-center py-8 text-gray-600">
//             {isFilterActive ? "No cases match your filter criteria." : "No cases found for this advocate code."}
//           </div>
//         )}

//         {!loading && filteredCases.length > 0 && (
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-300">
//               <thead className="bg-gray-100 sticky top-0">
//                 <tr>
//                   <th className="px-4 py-2 border">Sr#</th>
//                   <th className="px-4 py-2 border">Type</th>
//                   <th className="px-4 py-2 border">Case No</th>
//                   <th className="px-4 py-2 border">Year</th>
//                   <th className="px-4 py-2 border">Bench</th>
//                   <th className="px-4 py-2 border">Circuit</th>
//                   <th className="px-4 py-2 border">Parties</th>
//                   <th className="px-4 py-2 border">Matter</th>
//                   <th className="px-4 py-2 border">Institution Date</th>
//                   <th className="px-4 py-2 border">Last Date</th>
//                   <th className="px-4 py-2 border">Next Date</th>
//                   <th className="px-4 py-2 border">Status</th>
//                   <th className="px-4 py-2 border">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredCases.map((caseItem, index) => (
//                   <tr key={`${caseItem.caseNo}-${caseItem.caseYear}-${index}`} className="hover:bg-gray-50">
//                     <td className="px-4 py-2 border">{caseItem.srNo}</td>
//                     <td className="px-4 py-2 border">{caseItem.caseType}</td>
//                     <td className="px-4 py-2 border">{caseItem.caseNo}</td>
//                     <td className="px-4 py-2 border">{caseItem.caseYear}</td>
//                     <td className="px-4 py-2 border">{caseItem.bench}</td>
//                     <td className="px-4 py-2 border">{caseItem.circuit}</td>
//                     <td className="px-4 py-2 border">
//                       <div
//                         dangerouslySetInnerHTML={{ __html: caseItem.parties }}
//                       />
//                     </td>
//                     <td className="px-4 py-2 border">{caseItem.matter}</td>
//                     <td className="px-4 py-2 border">
//                       {caseItem.institutionDate}
//                     </td>
//                     <td className="px-4 py-2 border">{caseItem.lastDate}</td>
//                     <td className="px-4 py-2 border">{caseItem.nextDate}</td>
//                     <td className="px-4 py-2 border">
//                       <div
//                         dangerouslySetInnerHTML={{ __html: caseItem.status }}
//                       />
//                     </td>
//                     <td className="px-4 py-2 border">
//                       {caseItem.caseId ? (
//                         <button
//                           onClick={() => handleViewCase(caseItem.caseId!)}
//                           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block text-sm"
//                         >
//                           View
//                         </button>
//                       ) : (
//                         <span className="text-gray-400">N/A</span>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

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
              {/* <span className="text-sm text-gray-600">
                {allCases.length} cases loaded • Data cached for 10 minutes
              </span> */}
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
            {/* <button
              onClick={showAllData}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={!hasInitialData || displayCases.length === allCases.length}
            >
              Show All
            </button> */}
            <button
              onClick={clearFilter}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              disabled={!isFilterActive}
            >
              Clear
            </button>
            <Link href={'/district-cases'}>
            <button
              className="bg-amber-700 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              District Cases
            </button>
            </Link>
          </div>
        </div>

        {/* Data Status Information */}
        {/* {hasInitialData && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-semibold">Data Status:</span> 
                <span className="ml-2">
                  {allCases.length} cases loaded in memory • 
                  {displayCases.length > 0 ? ` Showing ${displayCases.length} filtered cases` : ' No cases displayed - use search above'}
                </span>
              </div>
              {displayCases.length > 0 && (
                <button
                  onClick={() => {
                    const blob = new Blob([JSON.stringify(displayCases, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `shc-cases-${new Date().toISOString().split('T')[0]}.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700"
                >
                  Export JSON
                </button>
              )}
            </div>
          </div>
        )} */}

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