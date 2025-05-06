"use client";
import React from "react";
import WhyChooseUsSection from "../components/WhyChooseUsSection";
import ComparisonTable from "../components/ComparisonSection";
import Wcs from "../components/wcs";
import ServiceForm from "../components/ServiceForm";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  service: string;
  text: string;
  rating: number;
  initials: string;
}

const TestimonialsClient: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Hyderabad",
      service: "Nutrition Guidance",
      text: "Thanks to the Nutrition Guidance, I have more energy and feel healthier than ever!",
      rating: 5,
      initials: "PS",
    },
    {
      id: 2,
      name: "Rahul Mehta",
      location: "Hyderabad",
      service: "Fitness Training",
      text: "The personal fitness training helped me achieve my goals faster than I imagined.",
      rating: 4,
      initials: "RM",
    },
    {
      id: 3,
      name: "Anjali Verma",
      location: "Hyderabad",
      service: "Wellness Coaching",
      text: "Wellness Coaching gave me a whole new perspective on healthy living.",
      rating: 5,
      initials: "AV",
    },
  ];

  const stats = [
    { label: "Clients Served", value: "2,500+" },
    { label: "Success Rate", value: "98%" },
    { label: "Expert Coaches", value: "20+" },
    { label: "Years Experience", value: "10+" },
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-5 h-5 ${
            i <= rating ? "text-orange-500" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.286 3.975c.3.921-.755 1.688-1.538 1.118l-3.388-2.46a1 1 0 00-1.176 0l-3.388 2.46c-.783.57-1.838-.197-1.538-1.118l1.286-3.975a1 1 0 00-.364-1.118L2.045 9.402c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.975z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 bg-orange-500 text-white rounded-full h-10 w-10 flex items-center justify-center text-lg font-bold">
                  {testimonial.initials}
                </div>
                <div className="ml-4">
                  <p className="text-lg font-medium text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {testimonial.location} - {testimonial.service}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{testimonial.text}</p>
              <div className="flex">{renderStars(testimonial.rating)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <p className="text-3xl font-extrabold text-orange-500">
                  {stat.value}
                </p>
                <p className="mt-1 text-lg font-medium text-gray-700">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <WhyChooseUsSection />
      <ComparisonTable />
      <Wcs />
      <ServiceForm />
    </div>
  );
};

export default TestimonialsClient;
