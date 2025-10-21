// 'use client';
// import { useState, FormEvent } from 'react';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import Link from 'next/link';
// import { Search, Eye, Calendar, FileText, MapPin, Scale } from 'lucide-react';

// interface DistrictCase {
//   id: number;
//   caseId: string;
//   caseNo: string;
//   caseDetail: string;
//   courtName: string;
//   districtName: string;
//   oldCaseNo: string;
//   viewLink: string;
//   status?: string;
//   hearingDate?: string;
// }

// interface CaseDetail {
//   caseNo: string;
//   court: string;
//   advocate1: string;
//   advocate2: string;
//   underSection: string;
//   hcCaseNumber: string;
//   caseValue: string;
//   diaryEntries: Array<{
//     serialNo: string;
//     diary: string;
//     date: string;
//   }>;
// }

// export default function DistrictCasesSearch() {
//   const [caseNo, setCaseNo] = useState<string>('');
//   const [caseYear, setCaseYear] = useState<string>(new Date().getFullYear().toString());
//   const [district, setDistrict] = useState<string>('2');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [cases, setCases] = useState<DistrictCase[]>([]);
//   const [selectedCase, setSelectedCase] = useState<CaseDetail | null>(null);
//   const [showModal, setShowModal] = useState<boolean>(false);
//   const [error, setError] = useState<string>('');

//   const districts = [
//     { value: '2', label: 'Karachi (South)' },
//     { value: '3', label: 'Karachi (West)' },
//     { value: '4', label: 'Karachi (East)' },
//     { value: '5', label: 'Karachi (Central)' },
//     { value: '6', label: 'Karachi (Malir)' },
//     { value: '7', label: 'Hyderabad' },
//     { value: '8', label: 'Thatta' },
//     { value: '9', label: 'Badin' },
//     { value: '10', label: 'Dadu' },
//     { value: '90', label: 'Jamshoro @ Kotri' },
//     { value: '11', label: 'Tharparkar @ Mithi' },
//     { value: '12', label: 'Mirpurkhas' },
//     { value: '93', label: 'Umerkot' },
//     { value: '13', label: 'Sanghar' },
//     { value: '14', label: 'Naushahro Feroze' },
//     { value: '15', label: 'Shaheed Benazirabad' },
//     { value: '16', label: 'Sukkur' },
//     { value: '17', label: 'Khairpur' },
//     { value: '18', label: 'Ghotki' },
//     { value: '19', label: 'Larkana' },
//     { value: '92', label: 'KAMBER-SHAHDADKOT @ KAMBER' },
//     { value: '20', label: 'Shikarpur' },
//     { value: '21', label: 'Jacobabad' },
//     { value: '91', label: 'Kashmore @ Kandhkot' },
//   ];

//   const handleSearch = async (e: FormEvent) => {
//     e.preventDefault();
    
//     if (!caseNo.trim()) {
//       setError('Please enter a case number');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     setCases([]);

//     try {
//       console.log('Sending search request...');
//       const response = await fetch('/api/district-cases/search', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           caseNo: caseNo.trim(),
//           caseYear: caseYear.trim(),
//           district: district,
//         }),
//       });

//       console.log('Response status:', response.status);

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log('Search response:', data);

//       if (data.success) {
//         setCases(data.data);
//         if (data.data.length === 0) {
//           setError('No cases found matching your search criteria');
//         }
//       } else {
//         setError(data.error || 'Failed to search cases');
//       }
//     } catch (err) {
//       console.error('Search error:', err);
//       setError(err instanceof Error ? err.message : 'Network error: Unable to search cases');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleViewCase = async (caseId: string) => {
//     try {
//       console.log('Fetching case details for:', caseId);
//       const response = await fetch(`/api/district-cases/${caseId}`);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log('Case details response:', data);

//       if (data.success) {
//         setSelectedCase(data.data);
//         setShowModal(true);
//       } else {
//         setError(data.error || 'Failed to load case details');
//       }
//     } catch (err) {
//       console.error('Case detail error:', err);
//       setError(err instanceof Error ? err.message : 'Network error: Unable to load case details');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
      
//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-12">
//         <div className="container-custom">
//           <div className="max-w-4xl mx-auto text-center">
//             <h1 className="text-4xl md:text-5xl font-bold mb-4">District Courts Case Search</h1>
//             <p className="text-xl text-primary-100">
//               Search and track cases across all District Courts in Sindh
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Search Section */}
//       <section className="section-padding bg-white">
//         <div className="container-custom">
//           <div className="max-w-4xl mx-auto">
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
//               <div className="bg-primary-600 px-6 py-4 text-white rounded-t-2xl">
//                 <h2 className="text-xl font-bold flex items-center">
//                   <Search className="h-5 w-5 mr-2" />
//                   Search Cases
//                 </h2>
//               </div>
              
//               <div className="p-6">
//                 <form onSubmit={handleSearch} className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     {/* District Select */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         <MapPin className="h-4 w-4 inline mr-1" />
//                         District
//                       </label>
//                       <select
//                         value={district}
//                         onChange={(e) => setDistrict(e.target.value)}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
//                       >
//                         {districts.map((dist) => (
//                           <option key={dist.value} value={dist.value}>
//                             {dist.label}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     {/* Case Number */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         <FileText className="h-4 w-4 inline mr-1" />
//                         Case Number
//                       </label>
//                       <input
//                         type="number"
//                         value={caseNo}
//                         onChange={(e) => setCaseNo(e.target.value)}
//                         placeholder="Enter case number"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
//                         required
//                       />
//                     </div>

//                     {/* Case Year */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         <Calendar className="h-4 w-4 inline mr-1" />
//                         Case Year
//                       </label>
//                       <input
//                         type="number"
//                         value={caseYear}
//                         onChange={(e) => setCaseYear(e.target.value)}
//                         placeholder="Year"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
//                         min="2000"
//                         max={new Date().getFullYear() + 1}
//                       />
//                     </div>
//                   </div>

//                   {error && (
//                     <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//                       <p className="text-red-700">{error}</p>
//                     </div>
//                   )}

//                   <div className="flex justify-center">
//                     <button
//                       type="submit"
//                       disabled={loading}
//                       className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
//                     >
//                       {loading ? (
//                         <>
//                           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                           Searching...
//                         </>
//                       ) : (
//                         <>
//                           <Search className="h-4 w-4 mr-2" />
//                           Search Cases
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Results Section */}
//       {cases.length > 0 && (
//         <section className="section-padding bg-gray-50">
//           <div className="container-custom">
//             <div className="max-w-6xl mx-auto">
//               <div className="bg-white rounded-2xl shadow-lg">
//                 <div className="bg-green-600 px-6 py-4 text-white rounded-t-2xl">
//                   <h2 className="text-xl font-bold flex items-center justify-between">
//                     <span>Search Results</span>
//                     <span className="text-sm font-normal bg-green-700 px-3 py-1 rounded-full">
//                       {cases.length} case(s) found
//                     </span>
//                   </h2>
//                 </div>
                
//                 <div className="p-6">
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                       <thead className="bg-gray-50">
//                         <tr>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             S.No
//                           </th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Case Details
//                           </th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Court Name
//                           </th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Status
//                           </th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Action
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {cases.map((caseItem, index) => (
//                           <tr key={caseItem.id} className="hover:bg-gray-50 transition-colors">
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                               {index + 1}
//                             </td>
//                             <td className="px-6 py-4 text-sm text-gray-900">
//                               <div>
//                                 <p className="font-semibold text-primary-700">{caseItem.caseNo}</p>
//                                 <p className="text-gray-600 text-sm mt-1">{caseItem.caseDetail}</p>
//                                 {caseItem.oldCaseNo && (
//                                   <p className="text-xs text-gray-500 mt-1">
//                                     HC Case: {caseItem.oldCaseNo}
//                                   </p>
//                                 )}
//                               </div>
//                             </td>
//                             <td className="px-6 py-4 text-sm text-gray-900">
//                               {caseItem.courtName}
//                             </td>
//                             <td className="px-6 py-4 text-sm">
//                               <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
//                                 {caseItem.status || 'Pending'}
//                               </span>
//                               {caseItem.hearingDate && (
//                                 <p className="text-xs text-gray-500 mt-1">
//                                   Next: {caseItem.hearingDate}
//                                 </p>
//                               )}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm">
//                               <button
//                                 onClick={() => handleViewCase(caseItem.caseId)}
//                                 className="inline-flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
//                               >
//                                 <Eye className="h-4 w-4 mr-1" />
//                                 View
//                               </button>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Case Detail Modal */}
//       {showModal && selectedCase && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="bg-primary-600 px-6 py-4 text-white rounded-t-2xl flex justify-between items-center">
//               <h3 className="text-xl font-bold">Case Details</h3>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="text-white hover:text-gray-200 transition-colors"
//               >
//                 ✕
//               </button>
//             </div>
            
//             <div className="p-6">
//               {/* Case Information */}
//               <div className="bg-white rounded-lg border border-gray-200 mb-6">
//                 <div className="bg-primary-50 px-4 py-3 border-b border-gray-200">
//                   <h4 className="font-semibold text-primary-900">Case Information</h4>
//                 </div>
//                 <div className="p-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Case Number</label>
//                       <p className="text-gray-900 bg-gray-50 p-3 rounded border font-mono">{selectedCase.caseNo}</p>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Court</label>
//                       <p className="text-gray-900 bg-gray-50 p-3 rounded border">{selectedCase.court}</p>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Advocate 1</label>
//                       <p className="text-gray-900 bg-gray-50 p-3 rounded border">{selectedCase.advocate1 || 'Not specified'}</p>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Advocate 2</label>
//                       <p className="text-gray-900 bg-gray-50 p-3 rounded border">{selectedCase.advocate2 || 'Not specified'}</p>
//                     </div>
//                     <div className="md:col-span-2">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Under Section</label>
//                       <p className="text-gray-900 bg-gray-50 p-3 rounded border">{selectedCase.underSection}</p>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">HC Case Number</label>
//                       <p className="text-gray-900 bg-yellow-50 p-3 rounded border border-yellow-200">{selectedCase.hcCaseNumber}</p>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Case Value</label>
//                       <p className="text-gray-900 bg-yellow-50 p-3 rounded border border-yellow-200 font-semibold">{selectedCase.caseValue}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Diary Entries */}
//               {selectedCase.diaryEntries && selectedCase.diaryEntries.length > 0 && (
//                 <div className="bg-white rounded-lg border border-gray-200">
//                   <div className="bg-primary-50 px-4 py-3 border-b border-gray-200">
//                     <h4 className="font-semibold text-primary-900">Case Proceedings</h4>
//                     <p className="text-sm text-primary-700">Diary Entries ({selectedCase.diaryEntries.length})</p>
//                   </div>
//                   <div className="p-4">
//                     <div className="space-y-4">
//                       {selectedCase.diaryEntries.map((entry, index) => (
//                         <div key={index} className="border-l-4 border-primary-500 pl-4 py-2">
//                           <div className="flex justify-between items-start mb-2">
//                             <span className="text-sm font-medium text-gray-900">Entry #{entry.serialNo}</span>
//                             <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">
//                               {entry.date}
//                             </span>
//                           </div>
//                           <p className="text-gray-700 text-sm">{entry.diary}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </div>
//   );
// }

'use client';
import { useState, FormEvent } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { Search, Eye, Calendar, FileText, MapPin, Scale } from 'lucide-react';

interface DistrictCase {
  id: number;
  caseId: string;
  caseNo: string;
  caseDetail: string;
  courtName: string;
  districtName: string;
  oldCaseNo: string;
  viewLink: string;
  status?: string;
  hearingDate?: string;
}

interface CaseDetail {
  caseNo: string;
  court: string;
  advocate1: string;
  advocate2: string;
  underSection: string;
  hcCaseNumber: string;
  caseValue: string;
  diaryEntries: Array<{
    serialNo: string;
    diary: string;
    date: string;
  }>;
}

export default function DistrictCasesSearch() {
  const [caseNo, setCaseNo] = useState<string>('');
  const [caseYear, setCaseYear] = useState<string>(new Date().getFullYear().toString());
  const [district, setDistrict] = useState<string>('2');
  const [loading, setLoading] = useState<boolean>(false);
  const [cases, setCases] = useState<DistrictCase[]>([]);
  const [selectedCase, setSelectedCase] = useState<CaseDetail | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loadingCaseDetails, setLoadingCaseDetails] = useState<boolean>(false);
  const [loadingCaseId, setLoadingCaseId] = useState<string | null>(null);

  const districts = [
    { value: '2', label: 'Karachi (South)' },
    { value: '3', label: 'Karachi (West)' },
    { value: '4', label: 'Karachi (East)' },
    { value: '5', label: 'Karachi (Central)' },
    { value: '6', label: 'Karachi (Malir)' },
    { value: '7', label: 'Hyderabad' },
    { value: '8', label: 'Thatta' },
    { value: '9', label: 'Badin' },
    { value: '10', label: 'Dadu' },
    { value: '90', label: 'Jamshoro @ Kotri' },
    { value: '11', label: 'Tharparkar @ Mithi' },
    { value: '12', label: 'Mirpurkhas' },
    { value: '93', label: 'Umerkot' },
    { value: '13', label: 'Sanghar' },
    { value: '14', label: 'Naushahro Feroze' },
    { value: '15', label: 'Shaheed Benazirabad' },
    { value: '16', label: 'Sukkur' },
    { value: '17', label: 'Khairpur' },
    { value: '18', label: 'Ghotki' },
    { value: '19', label: 'Larkana' },
    { value: '92', label: 'KAMBER-SHAHDADKOT @ KAMBER' },
    { value: '20', label: 'Shikarpur' },
    { value: '21', label: 'Jacobabad' },
    { value: '91', label: 'Kashmore @ Kandhkot' },
  ];

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!caseNo.trim()) {
      setError('Please enter a case number');
      return;
    }

    setLoading(true);
    setError('');
    setCases([]);

    try {
      console.log('Sending search request...');
      const response = await fetch('/api/district-cases/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          caseNo: caseNo.trim(),
          caseYear: caseYear.trim(),
          district: district,
        }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Search response:', data);

      if (data.success) {
        setCases(data.data);
        if (data.data.length === 0) {
          setError('No cases found matching your search criteria');
        }
      } else {
        setError(data.error || 'Failed to search cases');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'Network error: Unable to search cases');
    } finally {
      setLoading(false);
    }
  };

  const handleViewCase = async (caseId: string) => {
    setLoadingCaseDetails(true);
    setLoadingCaseId(caseId);
    setError('');

    try {
      console.log('Fetching case details for:', caseId);
      const response = await fetch(`/api/district-cases/${caseId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Case details response:', data);

      if (data.success) {
        setSelectedCase(data.data);
        setShowModal(true);
      } else {
        setError(data.error || 'Failed to load case details');
      }
    } catch (err) {
      console.error('Case detail error:', err);
      setError(err instanceof Error ? err.message : 'Network error: Unable to load case details');
    } finally {
      setLoadingCaseDetails(false);
      setLoadingCaseId(null);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCase(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">District Courts Case Search</h1>
            <p className="text-xl text-primary-100">
              Search and track cases across all District Courts in Sindh
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
              <div className="bg-primary-600 px-6 py-4 text-white rounded-t-2xl">
                <h2 className="text-xl font-bold flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Search Cases
                </h2>
              </div>
              
              <div className="p-6">
                <form onSubmit={handleSearch} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* District Select */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="h-4 w-4 inline mr-1" />
                        District
                      </label>
                      <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      >
                        {districts.map((dist) => (
                          <option key={dist.value} value={dist.value}>
                            {dist.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Case Number */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FileText className="h-4 w-4 inline mr-1" />
                        Case Number
                      </label>
                      <input
                        type="number"
                        value={caseNo}
                        onChange={(e) => setCaseNo(e.target.value)}
                        placeholder="Enter case number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        required
                      />
                    </div>

                    {/* Case Year */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="h-4 w-4 inline mr-1" />
                        Case Year
                      </label>
                      <input
                        type="number"
                        value={caseYear}
                        onChange={(e) => setCaseYear(e.target.value)}
                        placeholder="Year"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        min="2000"
                        max={new Date().getFullYear() + 1}
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-700">{error}</p>
                    </div>
                  )}

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Searching...
                        </>
                      ) : (
                        <>
                          <Search className="h-4 w-4 mr-2" />
                          Search Cases
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {cases.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg">
                <div className="bg-green-600 px-6 py-4 text-white rounded-t-2xl">
                  <h2 className="text-xl font-bold flex items-center justify-between">
                    <span>Search Results</span>
                    <span className="text-sm font-normal bg-green-700 px-3 py-1 rounded-full">
                      {cases.length} case(s) found
                    </span>
                  </h2>
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
                            Case Details
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Court Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {cases.map((caseItem, index) => (
                          <tr key={caseItem.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {index + 1}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              <div>
                                <p className="font-semibold text-primary-700">{caseItem.caseNo}</p>
                                <p className="text-gray-600 text-sm mt-1">{caseItem.caseDetail}</p>
                                {caseItem.oldCaseNo && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    HC Case: {caseItem.oldCaseNo}
                                  </p>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {caseItem.courtName}
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                {caseItem.status || 'Pending'}
                              </span>
                              {caseItem.hearingDate && (
                                <p className="text-xs text-gray-500 mt-1">
                                  Next: {caseItem.hearingDate}
                                </p>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <button
                                onClick={() => handleViewCase(caseItem.caseId)}
                                disabled={loadingCaseDetails && loadingCaseId === caseItem.caseId}
                                className="inline-flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {loadingCaseDetails && loadingCaseId === caseItem.caseId ? (
                                  <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Wait...
                                  </>
                                ) : (
                                  <>
                                    <Eye className="h-4 w-4 mr-1" />
                                    View
                                  </>
                                )}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Case Detail Modal */}
      {showModal && selectedCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-primary-600 px-6 py-4 text-white rounded-t-2xl flex justify-between items-center">
              <h3 className="text-xl font-bold">Case Details</h3>
              <button
                onClick={closeModal}
                className="text-white hover:text-gray-200 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              {/* Case Information */}
              <div className="bg-white rounded-lg border border-gray-200 mb-6">
                <div className="bg-primary-50 px-4 py-3 border-b border-gray-200">
                  <h4 className="font-semibold text-primary-900">Case Information</h4>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Case Number</label>
                      <p className="text-gray-900 bg-gray-50 p-3 rounded border font-mono">{selectedCase.caseNo}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Court</label>
                      <p className="text-gray-900 bg-gray-50 p-3 rounded border">{selectedCase.court}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Advocate 1</label>
                      <p className="text-gray-900 bg-gray-50 p-3 rounded border">{selectedCase.advocate1 || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Advocate 2</label>
                      <p className="text-gray-900 bg-gray-50 p-3 rounded border">{selectedCase.advocate2 || 'Not specified'}</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Under Section</label>
                      <p className="text-gray-900 bg-gray-50 p-3 rounded border">{selectedCase.underSection}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">HC Case Number</label>
                      <p className="text-gray-900 bg-yellow-50 p-3 rounded border border-yellow-200">{selectedCase.hcCaseNumber}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Case Value</label>
                      <p className="text-gray-900 bg-yellow-50 p-3 rounded border border-yellow-200 font-semibold">{selectedCase.caseValue}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Diary Entries */}
              {selectedCase.diaryEntries && selectedCase.diaryEntries.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200">
                  <div className="bg-primary-50 px-4 py-3 border-b border-gray-200">
                    <h4 className="font-semibold text-primary-900">Case Proceedings</h4>
                    <p className="text-sm text-primary-700">Diary Entries ({selectedCase.diaryEntries.length})</p>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      {selectedCase.diaryEntries.map((entry, index) => (
                        <div key={index} className="border-l-4 border-primary-500 pl-4 py-2">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-sm font-medium text-gray-900">Entry #{entry.serialNo}</span>
                            <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">
                              {entry.date}
                            </span>
                          </div>
                          <p className="text-gray-700 text-sm">{entry.diary}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}