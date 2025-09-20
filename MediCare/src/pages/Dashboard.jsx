import React from "react";
import { Link } from "react-router-dom";
export default function Dashboard() {
  const features = [
    {
      title: "Check Available Medicines",
      description:
        "Quickly search and browse the list of medicines available across pharmacies.",
      link: "/Medicine-availability",
      icon: "💊",
    },
    {
      title: "Doctor Availability",
      description: "View and connect with available doctors for consultations.",
      link: "/Doctors-List",
      icon: "👨‍⚕️",
    },
    {
      title: "Symptom Checker Chatbot",
      description:
        "Chat with our AI-powered assistant to check symptoms and get guidance.",
      link: "/chat",
      icon: "🤖",
    },
    {
      title: "Video Call with Doctor",
      description:
        "Book a slot and securely connect with doctors via video consultation.",
      link: "/videocall",
      icon: "📹",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 text-[#0f172a]">
      {/* Hero Section */}
      <header className="text-center py-16 px-6">
        <h1 className="text-5xl font-extrabold text-[#0f172a] mb-4">
          Welcome to <span className="text-blue-600">MediCare</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your one-stop healthcare platform – check medicines, find doctors,
          chat with our AI assistant, and consult via video call.
        </p>
      </header>

      {/* Features Grid */}
      <section className="px-6 py-10 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">What We Offer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <Link
              key={idx}
              to={feature.link}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 mt-12 border-t border-gray-200 text-gray-500 text-sm">
        © {new Date().getFullYear()} MediCare. All rights reserved.
      </footer>
    </div>
  );
}
