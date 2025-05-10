"use client"
// import { Suspense } from 'react'
// import ServiceForm from "../components/ServiceForm"
import { Phone, Mail, MapPin, Building } from 'lucide-react'

const Page = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 mb-10">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Contact Us</h1>
          <p className="text-sm text-gray-500 mb-6 text-center">Last updated on 01-05-2025 11:28:14</p>
          
          <div className="space-y-6">
            <p className="text-gray-700">You may contact us using the information below:</p>
            
            <div className="space-y-4 mt-6">
              <div className="flex items-start">
                <Building className="text-orange-500 mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold">Merchant Legal entity name:</h3>
                  <p className="text-gray-700">SHABRA SOFTECH SOLUTIONS PRIVATE LIMITED</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="text-orange-500 mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold">Registered Address:</h3>
                  <p className="text-gray-700">NC 105, SBI OFFICERS COLONY, Chitragupta Nagar, Sampatchak, Patna- 800020, Bihar, Patna, Bihar, PIN: 800020</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="text-orange-500 mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold">Operational Address:</h3>
                  <p className="text-gray-700">NC 105, SBI OFFICERS COLONY, Chitragupta Nagar, Sampatchak, Patna- 800020, Bihar, Patna, Bihar, PIN: 800020</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="text-orange-500 mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold">Telephone No:</h3>
                  <p className="text-gray-700">9646534433</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="text-orange-500 mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold">E-Mail ID:</h3>
                  <p className="text-gray-700">abhishek@shopu.live</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Send Us a Message</h2>
          <Suspense fallback={<div>Loading...</div>}>
            <ServiceForm />
          </Suspense>
        </div> */}
      </div>
    </div>
  )
}

export default Page
