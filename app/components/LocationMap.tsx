import React from 'react';

const LocationMap = () => {
  const address = "V25F+5H7, Artillery Maidan, Karachi, Pakistan";
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-3">
      <h3 className="text-xl font-bold text-gray-900 mb-2">Location</h3>
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg overflow-hidden">
          <iframe
            src={mapUrl}
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location - Artillery Maidan, Karachi, Pakistan"
            className="w-full h-64"
          />
        </div>
        {/* <div className="p-3 bg-gray-50 rounded-lg">
          <p className="font-medium text-gray-900 text-center">
            Artillery Maidan, Karachi, Pakistan
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default LocationMap;