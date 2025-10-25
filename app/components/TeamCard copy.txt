import { Mail, Phone } from 'lucide-react';

interface Member {
  name: string;
  position: string;
  bio: string;
  email: string;
  phone: string;
  expertise: string[];
}

export default function TeamCard({ member }: { member: Member }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Profile Image Placeholder */}
      <div className="bg-gray-200 h-80 flex items-center justify-center relative overflow-hidden">
        <div className="text-gray-500 text-center">
          <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-600">
              {member.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <span>Profile Image</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
        <p className="text-primary-600 font-semibold mb-2">{member.position}</p>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>
        
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-primary-600" />
            <span>{member.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-primary-600" />
            <span>{member.phone}</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2">Expertise:</h4>
          <div className="flex flex-wrap gap-2">
            {member.expertise.map((skill, index) => (
              <span 
                key={index}
                className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}