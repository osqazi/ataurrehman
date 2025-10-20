// 'use client';
// import { useState, useEffect } from 'react';
// import Link from 'next/link';

// export default function CasesList() {
//   const [cases, setCases] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchCases();
//   }, []);

//   const fetchCases = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('/api/cases');
//       const data = await response.json();
      
//       if (data.success) {
//         setCases(data.data);
//       } else {
//         setError('Failed to fetch cases');
//       }
//     } catch (err) {
//       setError('Error fetching cases');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading cases...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-600 mb-4">{error}</p>
//           <button
//             onClick={fetchCases}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//           <div className="px-6 py-4 bg-gray-800 text-white">
//             <h1 className="text-2xl font-bold">High Court Cases List</h1>
//             <p className="text-gray-300 mt-1">Cases received from High Court</p>
//           </div>
          
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-600 text-white">
//                 <tr className="text-center">
//                   <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">#</th>
//                   <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Case Detail</th>
//                   <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Court Name</th>
//                   <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">District Name</th>
//                   <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Old Case No</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {cases.map((caseItem) => (
//                   <tr key={caseItem.id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
//                       {caseItem.id}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900">
//                       <Link 
//                         href={`/district-cases/${caseItem.caseId}`}
//                         className="flex items-start space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
//                       >
//                         <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mr-2">
//                           <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                           </svg>
//                         </span>
//                         <span className="flex-1">{caseItem.caseDetail}</span>
//                       </Link>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900">
//                       {caseItem.courtName}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900">
//                       {caseItem.districtName}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900">
//                       <div className="space-y-1">
//                         <span>{caseItem.oldCaseNo}</span>
//                         {caseItem.viewLink && (
//                           <a 
//                             href={caseItem.viewLink} 
//                             target="_blank" 
//                             rel="noopener noreferrer"
//                             className="inline-flex items-center text-xs text-green-600 hover:text-green-800 ml-2"
//                           >
//                             <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//                             </svg>
//                             View
//                           </a>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
          
//           {cases.length === 0 && (
//             <div className="text-center py-8 text-gray-500">
//               No cases found
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CaseItem {
  id: number;
  caseId: string;
  caseDetail: string;
  courtName: string;
  districtName: string;
  oldCaseNo: string;
  viewLink?: string;
}

interface ApiResponse {
  success: boolean;
  data: CaseItem[];
  message?: string;
}

export default function CasesList() {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch('/api/cases');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse = await response.json();
      
      if (data.success) {
        setCases(data.data);
      } else {
        setError(data.message || 'Failed to fetch cases');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching cases');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading cases...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchCases}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-800 text-white">
            <h1 className="text-2xl font-bold">High Court Cases List</h1>
            <p className="text-gray-300 mt-1">Cases received from High Court</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-600 text-white">
                <tr className="text-center">
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">#</th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Case Detail</th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Court Name</th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">District Name</th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Old Case No</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cases.map((caseItem: CaseItem) => (
                  <tr key={caseItem.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                      {caseItem.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <Link 
                        href={`/district-cases/${caseItem.caseId}`}
                        className="flex items-start space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mr-2 flex-shrink-0">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </span>
                        <span className="flex-1">{caseItem.caseDetail}</span>
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                      {caseItem.courtName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                      {caseItem.districtName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="space-y-1 text-center">
                        <span>{caseItem.oldCaseNo}</span>
                        {caseItem.viewLink && (
                          <a 
                            href={caseItem.viewLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-xs text-green-600 hover:text-green-800 ml-2"
                          >
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            View
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {cases.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No cases found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}