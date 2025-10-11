// 'use client';

// import { use, useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { ArrowLeft } from 'lucide-react';
// import Header from '@/app/components/Header';

// interface CaseDetail {
//   caseId: string;
//   title: string;
//   status: string;
//   caseNumber?: string;
//   dates?: string;
//   caseTitle?: string;
//   stayDate?: string;
//   lastHearing?: string;
//   nextHearing?: string;
//   lastRoster?: string;
//   futureFixation?: string;
//   firNo?: string;
//   underSections?: string;
//   disposalDate?: string;
//   disposingBench?: string;
//   natureOfDisposal?: string;
//   remarks?: string;
// }

// export default function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
//   const router = useRouter();
//   const { id } = use(params);
//   const [caseDetail, setCaseDetail] = useState<CaseDetail | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCaseDetail = async () => {
//       try {
//         const response = await fetch(`/api/shc-cases/${id}`);
//         const result = await response.json();
        
//         if (result.success) {
//           setCaseDetail(result.data);
//         } else {
//           setError(result.error || 'Failed to fetch case details');
//         }
//       } catch (err) {
//         setError('Network error occurred');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCaseDetail();
//   }, [id]);

//   const InfoSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
//     <div className="bg-gray-50 rounded-lg p-4 mb-4">
//       <h3 className="text-lg font-semibold text-blue-800 mb-3 border-b pb-2">{title}</h3>
//       {children}
//     </div>
//   );

//   const InfoRow = ({ label, value, className = "" }: { label: string; value?: string; className?: string }) => (
//     <div className={`grid grid-cols-3 gap-4 py-2 border-b border-gray-200 last:border-0 ${className}`}>
//       <div className="font-semibold text-gray-700">{label}:</div>
//       <div className="col-span-2 text-gray-900 whitespace-pre-line">{value || 'N/A'}</div>
//     </div>
//   );

//   if (loading) {
//     return (
//         <div>
//             <Header/>
//       <div className="container mx-auto p-6">        
//         <div className="text-center py-16">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading case details...</p>
//         </div>
//       </div>
//       </div>
//     );
//   }
  

//   if (error || !caseDetail) {
//     return (
//         <div>
//             <Header/>
//       <div className="container mx-auto p-6">       
//         <button
//           onClick={() => router.back()}
//           className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
//         >
//           <ArrowLeft size={20} />
//           Back to Cases
//         </button>
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           {error || 'Case not found'}
//         </div>
//       </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//          <Header/>
//     <div className="container mx-auto p-6 max-w-6xl">       
//       <button
//         onClick={() => router.back()}
//         className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
//       >
//         <ArrowLeft size={20} />
//         Back to Cases
//       </button>

//       <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//         {/* Header */}
//         <div className="bg-blue-600 text-white p-6">
//           <div className="flex justify-between items-start">
//             <div>
//               <h1 className="text-2xl font-bold mb-2">{caseDetail.title}</h1>
//               <p className="text-blue-100">Case ID: {caseDetail.caseId}</p>
//             </div>
//             <span className={`px-4 py-2 rounded text-sm font-semibold ${
//               caseDetail.status.toLowerCase().includes('disposed') 
//                 ? 'bg-green-500' 
//                 : 'bg-yellow-500'
//             }`}>
//               {caseDetail.status}
//             </span>
//           </div>
//         </div>

//         <div className="p-6">
//           {/* Remarks */}
//           {caseDetail.remarks && (
//             <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
//               <p className="font-semibold text-yellow-800">Remarks:</p>
//               <p className="text-gray-700 mt-1">{caseDetail.remarks}</p>
//             </div>
//           )}

//           {/* Section 1: Case Information */}
//           <InfoSection title="SECTION 1: Case Information">
//             <InfoRow label="Case No" value={caseDetail.caseNumber} />
//             <InfoRow label="Case Title" value={caseDetail.caseTitle} />
//             <InfoRow label="Dates" value={caseDetail.dates} />
//             <InfoRow label="Stay Grant/End Date" value={caseDetail.stayDate} />
//           </InfoSection>

//           {/* Hearing Details */}
//           <InfoSection title="Hearing Details">
//             <InfoRow label="Last Hearing" value={caseDetail.lastHearing} />
//             <InfoRow label="Next Hearing" value={caseDetail.nextHearing} />
//             <InfoRow label="Last Roster Discharged" value={caseDetail.lastRoster} />
//             <InfoRow label="Future Fixation (Tentative)" value={caseDetail.futureFixation} />
//           </InfoSection>

//           {/* Section 2: FIR Information */}
//           <InfoSection title="SECTION 2: FIR Information">
//             <InfoRow label="FIR No & Year" value={caseDetail.firNo} />
//             <InfoRow label="Under Section(s)" value={caseDetail.underSections} />
//           </InfoSection>

//           {/* Section 3: Disposal Information */}
//           {caseDetail.disposalDate && (
//             <InfoSection title="SECTION 3: Disposal Information">
//               <InfoRow label="Disposal Date" value={caseDetail.disposalDate} />
//               <InfoRow label="Disposing Bench" value={caseDetail.disposingBench} />
//               <InfoRow label="Nature of Disposal" value={caseDetail.natureOfDisposal} />
//             </InfoSection>
//           )}
//         </div>
//       </div>
//     </div>
    
//     </div>
//   );
// }

'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Header from '@/app/components/Header';

interface CaseDetail {
  caseId: string;
  title: string;
  status: string;
  caseNumber?: string;
  dates?: string;
  caseTitle?: string;
  stayDate?: string;
  lastHearing?: string;
  nextHearing?: string;
  lastRoster?: string;
  futureFixation?: string;
  firNo?: string;
  underSections?: string;
  disposalDate?: string;
  disposingBench?: string;
  natureOfDisposal?: string;
  remarks?: string;
}

export default function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [caseDetail, setCaseDetail] = useState<CaseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCaseDetail = async () => {
      try {
        const response = await fetch(`/api/shc-cases/${id}`);
        const result = await response.json();
        
        if (result.success) {
          setCaseDetail(result.data);
        } else {
          setError(result.error || 'Failed to fetch case details');
        }
      } catch (err) {
        setError('Network error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCaseDetail();
  }, [id]);

  const handleMoreDetails = () => {
    if (caseDetail?.caseId) {
      const externalUrl = `https://cases.shc.gov.pk/khi/web/index.php?r=cases%2Fview&id=${caseDetail.caseId}`;
      window.open(externalUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const InfoSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-gray-50 rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold text-blue-800 mb-3 border-b pb-2">{title}</h3>
      {children}
    </div>
  );

  const InfoRow = ({ label, value, className = "" }: { label: string; value?: string; className?: string }) => (
    <div className={`grid grid-cols-3 gap-4 py-2 border-b border-gray-200 last:border-0 ${className}`}>
      <div className="font-semibold text-gray-700">{label}:</div>
      <div className="col-span-2 text-gray-900 whitespace-pre-line">{value || 'N/A'}</div>
    </div>
  );

  if (loading) {
    return (
        <div>
            <Header/>
      <div className="container mx-auto p-6">        
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading case details...</p>
        </div>
      </div>
      </div>
    );
  }
  

  if (error || !caseDetail) {
    return (
        <div>
            <Header/>
      <div className="container mx-auto p-6">       
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft size={20} />
          Back to Cases
        </button>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Case not found'}
        </div>
      </div>
      </div>
    );
  }

  return (
    <div>
         <Header/>
    <div className="container mx-auto p-6 max-w-6xl">       
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
      >
        <ArrowLeft size={20} />
        Back to Cases
      </button>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold mb-2">{caseDetail.title}</h1>
              <p className="text-blue-100">Case ID: {caseDetail.caseId}</p>
            </div>
            <span className={`px-4 py-2 rounded text-sm font-semibold ${
              caseDetail.status.toLowerCase().includes('disposed') 
                ? 'bg-green-500' 
                : 'bg-yellow-500'
            }`}>
              {caseDetail.status}
            </span>
          </div>
        </div>

        <div className="p-6">
          {/* Remarks */}
          {caseDetail.remarks && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="font-semibold text-yellow-800">Remarks:</p>
              <p className="text-gray-700 mt-1">{caseDetail.remarks}</p>
            </div>
          )}

          {/* Section 1: Case Information */}
          <InfoSection title="SECTION 1: Case Information">
            <InfoRow label="Case No" value={caseDetail.caseNumber} />
            <InfoRow label="Case Title" value={caseDetail.caseTitle} />
            <InfoRow label="Dates" value={caseDetail.dates} />
            <InfoRow label="Stay Grant/End Date" value={caseDetail.stayDate} />
          </InfoSection>

          {/* Hearing Details */}
          <InfoSection title="Hearing Details">
            <InfoRow label="Last Hearing" value={caseDetail.lastHearing} />
            <InfoRow label="Next Hearing" value={caseDetail.nextHearing} />
            <InfoRow label="Last Roster Discharged" value={caseDetail.lastRoster} />
            <InfoRow label="Future Fixation (Tentative)" value={caseDetail.futureFixation} />
          </InfoSection>

          {/* Section 2: FIR Information */}
          <InfoSection title="SECTION 2: FIR Information">
            <InfoRow label="FIR No & Year" value={caseDetail.firNo} />
            <InfoRow label="Under Section(s)" value={caseDetail.underSections} />
          </InfoSection>

          {/* Section 3: Disposal Information */}
          {caseDetail.disposalDate && (
            <InfoSection title="SECTION 3: Disposal Information">
              <InfoRow label="Disposal Date" value={caseDetail.disposalDate} />
              <InfoRow label="Disposing Bench" value={caseDetail.disposingBench} />
              <InfoRow label="Nature of Disposal" value={caseDetail.natureOfDisposal} />
            </InfoSection>
          )}

          {/* More Details Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleMoreDetails}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              <ExternalLink size={20} />
              More Details on Official Website
            </button>
            <p className="text-sm text-gray-600 mt-2">
              This will open the official Sindh High Court website in a new tab with complete case details.
            </p>
          </div>
        </div>
      </div>
    </div>
    
    </div>
  );
}