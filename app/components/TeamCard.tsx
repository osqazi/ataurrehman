import { Mail, Phone } from 'lucide-react';
import Link from 'next/link';

interface Member {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
}

export default function TeamCard({ member }: { member: Member }) {
  return (
    <Link href={`/team/${member.id}`}>
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer h-full">
        {/* Profile Image Placeholder */}
        <div className="bg-gray-200 h-64 flex items-center justify-center relative overflow-hidden">
          <div className="text-gray-500 text-center">
            <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-xl font-bold text-gray-600">
                {member.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <span className="text-sm">Profile Image</span>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
          <p className="text-primary-600 font-semibold mb-4">{member.position}</p>
          
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-primary-600" />
              <span className="text-xs">{member.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-primary-600" />
              <span className="text-xs">{member.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}