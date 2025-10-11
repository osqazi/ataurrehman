'use client';
import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-green-900 mb-2">Thank You!</h3>
        <p className="text-green-700 mb-4">
          Your consultation request has been received. Our team will contact you within 24 hours.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="btn-primary bg-green-600 hover:bg-green-700"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Book Your Consultation</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="Enter your first name"
          />
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="Enter your last name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="your.email@example.com"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="+92 XXX XXXXXXX"
          />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
          Service Required *
        </label>
        <select
          id="service"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
        >
          <option value="">Select a service</option>
          <option value="corporate">Corporate Advisory</option>
          <option value="litigation">Litigation & Dispute Resolution</option>
          <option value="criminal">Criminal Defense</option>
          <option value="family">Family Law & Divorce</option>
          <option value="real-estate">Real Estate & Property</option>
          <option value="ip">Intellectual Property</option>
          <option value="employment">Employment Law</option>
          <option value="arbitration">Arbitration</option>
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Case Details *
        </label>
        <textarea
          id="message"
          required
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-vertical"
          placeholder="Please describe your legal matter in detail..."
        />
      </div>

      <div className="mb-6">
        <label htmlFor="consultation" className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Consultation Type
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="flex items-center">
            <input type="radio" name="consultation" value="online" className="mr-2 text-primary-600" defaultChecked />
            Online Consultation
          </label>
          <label className="flex items-center">
            <input type="radio" name="consultation" value="phone" className="mr-2 text-primary-600" />
            Phone Consultation
          </label>
          <label className="flex items-center">
            <input type="radio" name="consultation" value="office" className="mr-2 text-primary-600" />
            Office Visit
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Submitting...</span>
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            <span>Book Consultation</span>
          </>
        )}
      </button>
    </form>
  );
}