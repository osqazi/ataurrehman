import Image from 'next/image';

/**
 * OtherTeamMembers Component
 * 
 * Displays supporting team members (interns, clerks, administrative staff)
 * in a clean, professional grid layout that matches the existing team page theme.
 */

interface OtherTeamMember {
  id: number;
  name: string;
  designation: string;
  image: string;
}

const otherTeamMembers: OtherTeamMember[] = [
  {
    id: 1,
    name: "Ali Muhammad Shah",
    designation: "Intern",
    image: "/teamImg/others/ali.webp",
  },
  {
    id: 2,
    name: "Manesh",
    designation: "Intern",
    image: "/teamImg/others/manesh.webp",
  },
  {
    id: 3,
    name: "Junaid Masih",
    designation: "Court Clerk",
    image: "/teamImg/others/junaid.webp",
  },
  {
    id: 4,
    name: "Nadeem Gill",
    designation: "Receptionist",
    image: "/teamImg/others/nadeem.webp",
  },
];

export default function OtherTeamMembers() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Other Team Members
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet the dedicated professionals who support our legal practice
          </p>
          <div className="w-24 h-1 bg-primary-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {otherTeamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Profile Image */}
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Member Info */}
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium text-sm">
                  {member.designation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
