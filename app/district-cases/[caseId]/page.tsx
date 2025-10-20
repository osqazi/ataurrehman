// 'use client';
// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useParams } from 'next/navigation';

// export default function CaseDetail() {
//   const params = useParams();
//   const caseId = params.caseId;
  
//   const [caseData, setCaseData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (caseId) {
//       fetchCaseDetail();
//     }
//   }, [caseId]);

//   const fetchCaseDetail = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`/api/cases/${caseId}`);
//       const data = await response.json();
      
//       if (data.success) {
//         setCaseData(data.data);
//       } else {
//         setError('Failed to fetch case details');
//       }
//     } catch (err) {
//       setError('Error fetching case details');
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
//           <p className="mt-4 text-gray-600">Loading case details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !caseData) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-600 mb-4">{error || 'Case not found'}</p>
//           <div className="space-x-4">
//             <button
//               onClick={fetchCaseDetail}
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Retry
//             </button>
//             <Link
//               href="/"
//               className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
//             >
//               Back to List
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-6">
//           <Link
//             href="/"
//             className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
//           >
//             <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//             </svg>
//             Back to Cases List
//           </Link>
//           <h1 className="text-3xl font-bold text-gray-900">Case Profile</h1>
//         </div>

//         {/* Case Details */}
//         <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
//           <div className="bg-blue-600 px-6 py-4 text-white">
//             <h2 className="text-xl font-bold">Case Details</h2>
//           </div>
//           <div className="p-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Case No</label>
//                   <p className="text-gray-900 bg-gray-50 p-3 rounded border">{caseData.caseNo}</p>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Court</label>
//                   <p className="text-gray-900 bg-gray-50 p-3 rounded border">{caseData.court}</p>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Advocate 1</label>
//                   <p className="text-gray-900 bg-gray-50 p-3 rounded border">{caseData.advocate1 || 'N/A'}</p>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Under Section</label>
//                   <p className="text-gray-900 bg-gray-50 p-3 rounded border">{caseData.underSection || 'N/A'}</p>
//                 </div>
//               </div>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Advocate 2</label>
//                   <p className="text-gray-900 bg-gray-50 p-3 rounded border">{caseData.advocate2 || 'N/A'}</p>
//                 </div>
//                 <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
//                   <label className="block text-sm font-medium text-yellow-800 mb-1">HC Case Number</label>
//                   <p className="text-yellow-900">{caseData.hcCaseNumber}</p>
//                 </div>
//                 <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
//                   <label className="block text-sm font-medium text-yellow-800 mb-1">Case Value</label>
//                   <p className="text-yellow-900 font-semibold">{caseData.caseValue || 'N/A'}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Diary Entries */}
//         {caseData.diaryEntries.length > 0 && (
//           <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//             <div className="bg-green-600 px-6 py-4 text-white">
//               <h2 className="text-xl font-bold">Case Diary</h2>
//             </div>
//             <div className="p-6">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         S.No
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Diary
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Date
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {caseData.diaryEntries.map((entry, index) => (
//                       <tr key={index} className="hover:bg-gray-50 transition-colors">
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                           {entry.serialNo}
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-900">
//                           {entry.diary}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm">
//                           <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">
//                             {entry.date}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// 'use client';
// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useParams } from 'next/navigation';

// export default function CaseDetailPage() {
//   const params = useParams();
//   const caseId = params.caseId;
  
//   const [caseData, setCaseData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [apiStatus, setApiStatus] = useState('');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (caseId) {
//       fetchCaseData();
//     }
//   }, [caseId]);

//   const fetchCaseData = async () => {
//     try {
//       setLoading(true);
//       setError('');
//       console.log('Page - Fetching REAL data for case:', caseId);
      
//       const response = await fetch(`/api/cases/${caseId}`);
//       const data = await response.json();
      
//       console.log('API Response:', data);
      
//       if (data.success) {
//         setCaseData(data.data);
//         setApiStatus(data.source || 'unknown');
//       } else {
//         setError(data.error || 'Failed to fetch case details');
//         setApiStatus('error');
//       }
//     } catch (error) {
//       console.error('Failed to fetch case data:', error);
//       setError('Network error: Unable to fetch case details');
//       setApiStatus('network-error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading real case details...</p>
//           <p className="text-sm text-gray-500 mt-2">Fetching data from District Courts website</p>
//           <p className="text-xs text-gray-400 mt-1">Case ID: {caseId}</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !caseData) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center max-w-md">
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             <p className="font-bold">Error Loading Case Details</p>
//             <p>{error}</p>
//           </div>
//           <div className="space-x-4">
//             <button
//               onClick={fetchCaseData}
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Try Again
//             </button>
//             <Link
//               href="/"
//               className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
//             >
//               Back to List
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-6">
//           <Link
//             href="/"
//             className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
//           >
//             <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//             </svg>
//             Back to Cases List
//           </Link>
//           <h1 className="text-3xl font-bold text-gray-900">Case Profile</h1>
//           <p className="text-gray-600 mt-2">Case ID: {caseId}</p>
          
//           {/* API Status Indicator */}
//           {apiStatus && (
//             <div className={`mt-2 text-sm ${
//               apiStatus === 'live-data' ? 'text-green-600' : 
//               apiStatus === 'basic-listing' ? 'text-yellow-600' :
//               apiStatus === 'fetch-error' ? 'text-orange-600' : 
//               'text-gray-600'
//             }`}>
//               {apiStatus === 'live-data' && '✓ Live data loaded from District Courts'}
//               {apiStatus === 'basic-listing' && '⚠ Basic information from case listing'}
//               {apiStatus === 'fetch-error' && '⚠ Limited data available'}
//             </div>
//           )}
//         </div>

//         {/* Data Source Notice */}
//         {apiStatus !== 'live-data' && (
//           <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
//             <div className="flex items-start">
//               <svg className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//               </svg>
//               <div>
//                 <h3 className="text-lg font-medium text-yellow-800">Limited Data Available</h3>
//                 <p className="text-yellow-700 mt-1">
//                   We were able to fetch basic case information but couldn't access the detailed case profile. 
//                   This might be due to authentication requirements on the District Courts website.
//                 </p>
//                 {caseData.viewLink && (
//                   <p className="text-yellow-700 mt-2">
//                     For complete case details, please visit the{' '}
//                     <a href={caseData.viewLink} target="_blank" rel="noopener noreferrer" className="underline font-semibold">
//                       official case page
//                     </a>.
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Success Notice */}
//         {apiStatus === 'live-data' && (
//           <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
//             <div className="flex items-start">
//               <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//               </svg>
//               <div>
//                 <h3 className="text-lg font-medium text-green-800">Live Data Loaded</h3>
//                 <p className="text-green-700 mt-1">
//                   Successfully fetched real-time case data from the District Courts website.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Case Details */}
//         <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
//           <div className="bg-blue-600 px-6 py-4 text-white">
//             <h2 className="text-xl font-bold">Case Information</h2>
//           </div>
//           <div className="p-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Case Number</label>
//                   <p className="text-gray-900 bg-gray-50 p-3 rounded border font-mono">{caseData.caseNo}</p>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Case Title</label>
//                   <p className="text-gray-900 bg-gray-50 p-3 rounded border">{caseData.fullTitle || caseData.caseNo}</p>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Court</label>
//                   <p className="text-gray-900 bg-gray-50 p-3 rounded border">{caseData.court}</p>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
//                   <p className="text-gray-900 bg-gray-50 p-3 rounded border">{caseData.district}</p>
//                 </div>
//               </div>
//               <div className="space-y-4">
//                 <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
//                   <label className="block text-sm font-medium text-yellow-800 mb-1">High Court Case Number</label>
//                   <p className="text-yellow-900 font-semibold">{caseData.oldCaseNo}</p>
//                 </div>
//                 <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
//                   <label className="block text-sm font-medium text-yellow-800 mb-1">Case Value</label>
//                   <p className="text-yellow-900 font-semibold">{caseData.caseValue}</p>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Under Section</label>
//                   <p className="text-gray-900 bg-gray-50 p-3 rounded border">{caseData.underSection}</p>
//                 </div>
//                 {caseData.viewLink && (
//                   <div>
//                     <a 
//                       href={caseData.viewLink} 
//                       target="_blank" 
//                       rel="noopener noreferrer"
//                       className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                     >
//                       <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//                       </svg>
//                       View Original Case on SHC Website
//                     </a>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Legal Representation */}
//         {(caseData.advocate1 || caseData.advocate2) && (
//           <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
//             <div className="bg-green-600 px-6 py-4 text-white">
//               <h2 className="text-xl font-bold">Legal Representation</h2>
//             </div>
//             <div className="p-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Advocate 1</label>
//                   <p className="text-gray-900 bg-gray-50 p-3 rounded border">{caseData.advocate1}</p>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Advocate 2</label>
//                   <p className="text-gray-900 bg-gray-50 p-3 rounded border">{caseData.advocate2}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Diary Entries */}
//         {caseData.diaryEntries && caseData.diaryEntries.length > 0 && (
//           <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//             <div className="bg-purple-600 px-6 py-4 text-white">
//               <h2 className="text-xl font-bold">Case Proceedings</h2>
//               <p className="text-purple-200 text-sm mt-1">Diary Entries ({caseData.diaryEntries.length} entries)</p>
//             </div>
//             <div className="p-6">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         S.No
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Proceedings
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Date
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {caseData.diaryEntries.map((entry, index) => (
//                       <tr key={index} className="hover:bg-gray-50 transition-colors">
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                           {entry.serialNo}
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-900">
//                           {entry.diary}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm">
//                           <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">
//                             {entry.date}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface DiaryEntry {
  serialNo: string;
  diary: string;
  date: string;
}

interface CaseData {
  caseNo: string;
  fullTitle?: string;
  court: string;
  district: string;
  oldCaseNo: string;
  caseValue?: string;
  underSection?: string;
  viewLink?: string;
  advocate1?: string;
  advocate2?: string;
  diaryEntries?: DiaryEntry[];
  [key: string]: any; // For any additional properties
}

interface ApiResponse {
  success: boolean;
  data: CaseData;
  source?: string;
  error?: string;
}

export default function CaseDetailPage() {
  const params = useParams();
  const caseId = params.caseId as string;
  
  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [apiStatus, setApiStatus] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (caseId) {
      fetchCaseData();
    }
  }, [caseId]);

  const fetchCaseData = async (): Promise<void> => {
    try {
      setLoading(true);
      setError('');
      console.log('Page - Fetching REAL data for case:', caseId);
      
      const response = await fetch(`/api/cases/${caseId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse = await response.json();
      
      console.log('API Response:', data);
      
      if (data.success) {
        setCaseData(data.data);
        setApiStatus(data.source || 'unknown');
      } else {
        setError(data.error || 'Failed to fetch case details');
        setApiStatus('error');
      }
    } catch (error) {
      console.error('Failed to fetch case data:', error);
      setError(error instanceof Error ? error.message : 'Network error: Unable to fetch case details');
      setApiStatus('network-error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading real case details...</p>
          <p className="text-sm text-gray-500 mt-2">Fetching data from District Courts website</p>
          <p className="text-xs text-gray-400 mt-1">Case ID: {caseId}</p>
        </div>
      </div>
    );
  }

  if (error || !caseData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-bold">Error Loading Case Details</p>
            <p>{error}</p>
          </div>
          <div className="space-x-4">
            <button
              onClick={fetchCaseData}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              Back to List
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Cases List
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Case Profile</h1>
          <p className="text-gray-600 mt-2">Case ID: {caseId}</p>
          
          {/* API Status Indicator */}
          {apiStatus && (
            <div className={`mt-2 text-sm ${
              apiStatus === 'live-data' ? 'text-green-600' : 
              apiStatus === 'basic-listing' ? 'text-yellow-600' :
              apiStatus === 'fetch-error' ? 'text-orange-600' : 
              'text-gray-600'
            }`}>
              {apiStatus === 'live-data' && '✓ Live data loaded from District Courts'}
              {apiStatus === 'basic-listing' && '⚠ Basic information from case listing'}
              {apiStatus === 'fetch-error' && '⚠ Limited data available'}
            </div>
          )}
        </div>

        {/* Data Source Notice */}
        {apiStatus !== 'live-data' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-lg font-medium text-yellow-800">Limited Data Available</h3>
                <p className="text-yellow-700 mt-1">
                  We were able to fetch basic case information but couldn't access the detailed case profile. 
                  This might be due to authentication requirements on the District Courts website.
                </p>
                {caseData.viewLink && (
                  <p className="text-yellow-700 mt-2">
                    For complete case details, please visit the{' '}
                    <a href={caseData.viewLink} target="_blank" rel="noopener noreferrer" className="underline font-semibold">
                      official case page
                    </a>.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Success Notice */}
        {apiStatus === 'live-data' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-lg font-medium text-green-800">Live Data Loaded</h3>
                <p className="text-green-700 mt-1">
                  Successfully fetched real-time case data from the District Courts website.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Case Details */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
          <div className="bg-blue-600 px-6 py-4 text-white">
            <h2 className="text-xl font-bold">Case Information</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Case Number</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded border font-mono">{caseData.caseNo}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Case Title</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded border">{caseData.fullTitle || caseData.caseNo}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Court</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded border">{caseData.court}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded border">{caseData.district}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
                  <label className="block text-sm font-medium text-yellow-800 mb-1">High Court Case Number</label>
                  <p className="text-yellow-900 font-semibold">{caseData.oldCaseNo}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
                  <label className="block text-sm font-medium text-yellow-800 mb-1">Case Value</label>
                  <p className="text-yellow-900 font-semibold">{caseData.caseValue || 'Not specified'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Under Section</label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded border">{caseData.underSection || 'Not specified'}</p>
                </div>
                {caseData.viewLink && (
                  <div>
                    <a 
                      href={caseData.viewLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View Original Case on SHC Website
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Legal Representation */}
        {(caseData.advocate1 || caseData.advocate2) && (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
            <div className="bg-green-600 px-6 py-4 text-white">
              <h2 className="text-xl font-bold">Legal Representation</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {caseData.advocate1 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Advocate 1</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded border">{caseData.advocate1}</p>
                  </div>
                )}
                {caseData.advocate2 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Advocate 2</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded border">{caseData.advocate2}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Diary Entries */}
        {caseData.diaryEntries && caseData.diaryEntries.length > 0 && (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-purple-600 px-6 py-4 text-white">
              <h2 className="text-xl font-bold">Case Proceedings</h2>
              <p className="text-purple-200 text-sm mt-1">Diary Entries ({caseData.diaryEntries.length} entries)</p>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        S.No
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Proceedings
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {caseData.diaryEntries.map((entry: DiaryEntry, index: number) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.serialNo}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {entry.diary}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">
                            {entry.date}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}