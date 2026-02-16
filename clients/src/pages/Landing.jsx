import { useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import FeatureCard from "../components/FeatureCard";

const features = [
  "Student Management",
  "Fees Collection",
  "Staff Management",
  "Homework & Assignment",
  "Bus Live Tracking",
  "ID Card & Marksheet",
];

const Landing = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      

      <section
        className="relative text-white py-20 px-6 overflow-hidden"
        style={{
          backgroundImage: `
      radial-gradient(circle at center, rgba(0,0,0,0.45), rgba(0,0,0,0.85)),
      url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1600&auto=format&fit=crop')
    `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center backdrop-blur-sm bg-black/20 rounded-2xl p-10">

          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Smart School ERP Software
            </h1>

            <p className="mb-6 text-gray-200 text-lg">
              Complete digital school management system for students, teachers and parents.
            </p>
            <button
              onClick={() => {
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-yellow-400 hover:bg-yellow-300 transition-all duration-300 text-black px-7 py-3 rounded-xl font-semibold shadow-lg"
            >
              Contact Us
            </button>

          </div>

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
            className="w-full max-w-sm mx-auto drop-shadow-2xl animate-bounce-slow"
          />

        </div>
      </section>
      

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <h2 className="text-center text-3xl font-bold mb-10">
          Our Services
        </h2>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
          {features.map((item, index) => (
            <FeatureCard key={index} title={item} />
          ))}
        </div>
      </section>

      {/* Bus Tracking Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Bus Live Tracking</h2>
            <p className="text-gray-700 mb-4">
              Track school buses in real-time, view route details and estimated arrival times. Keep parents and staff informed with live location sharing and alerts.
            </p>
            <ul className="list-disc pl-5 text-gray-700 mb-4">
              <li>Real-time GPS location</li>
              <li>ETA and route history</li>
              <li>Notifications for arrivals and delays</li>
            </ul>
            <button className="bg-green-900 text-white px-4 py-2 rounded">Learn More</button>
          </div>

          <div className="bg-white rounded shadow p-4">
            <img src="https://images.unsplash.com/photo-1518459031867-a89b944bffe0?auto=format&fit=crop&w=800&q=60" alt="bus map" className="w-full rounded" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-6">For demo, pricing or support, reach out to us.</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded shadow">
              <h3 className="font-semibold mb-2">Get in touch</h3>
              <p className="text-sm text-gray-600">Phone: +91-8117856483</p>
              <p className="text-sm text-gray-600">Email: hr@briskodetechnology.com</p>
              <p className="text-sm text-gray-600 mt-3">Address: Briskode Technology Pvt. Ltd.</p>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!email || !message) return toast.error("Please provide email and message");
    const subject = encodeURIComponent("Enquiry from landing page");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:hr@briskodetechnology.com?subject=${subject}&body=${body}`;
    toast.success("Opening mail client...");
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="input" />
      <input placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
      <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} className="input h-28" />
      <div>
        <button className="bg-yellow-400 text-black px-4 py-2 rounded">Send Message</button>
      </div>
    </form>
  );
};
