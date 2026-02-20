import { useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const features = [
  {
    title: "Student Management",
    description: "Comprehensive student profiles, attendance tracking, and academic performance monitoring all in one place.",
    icon: "👨‍🎓",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Fees Collection",
    description: "Automated fee management with online payments, invoicing, and detailed financial reporting.",
    icon: "💰",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    title: "Staff Management",
    description: "Complete employee records, payroll processing, attendance, and performance evaluation tools.",
    icon: "👥",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Homework & Assignment",
    description: "Digital assignment submission, automated grading, and real-time progress tracking for students.",
    icon: "📚",
    gradient: "from-orange-500 to-red-500"
  },
  {
    title: "Bus Live Tracking",
    description: "Real-time GPS tracking, route management, safety alerts, and parent notifications.",
    icon: "🚌",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    title: "ID Card & Marksheet",
    description: "Automated generation of professional ID cards, certificates, mark sheets, and reports.",
    icon: "🎓",
    gradient: "from-indigo-500 to-blue-500"
  },
];

const stats = [
  { number: "10,000+", label: "Active Students", icon: "👨‍🎓" },
  { number: "500+", label: "Schools Trust Us", icon: "🏫" },
  { number: "98%", label: "Satisfaction Rate", icon: "⭐" },
  { number: "24/7", label: "Support Available", icon: "💬" },
];

const Landing = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative text-white py-24 px-6 overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-block animate-fade-in">
              <span className="bg-yellow-400/20 text-yellow-300 px-5 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border border-yellow-400/30">
                ✨ #1 School Management Solution in India
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight animate-slide-up">
              Transform Your School with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500">
                Smart ERP
              </span>
            </h1>

            <p className="mb-6 text-gray-200 text-xl leading-relaxed">
              Empower education with our comprehensive digital platform. Streamline operations, enhance communication, and create a connected learning environment.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 text-black px-8 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-yellow-500/50 hover:scale-105 transform"
              >
                Get Started Free →
              </button>
              
              <button
                onClick={() => {
                  const el = document.getElementById("features");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white/20 transition-all duration-300 text-white px-8 py-4 rounded-2xl font-semibold hover:scale-105 transform"
              >
                Explore Features
              </button>
            </div>

            <div className="flex items-center gap-6 pt-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 border-4 border-blue-900 flex items-center justify-center text-2xl">
                    {i === 3 ? "😊" : ""}
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1 text-yellow-400 font-semibold text-lg">
                  ★★★★★ <span className="text-white ml-2">5.0</span>
                </div>
                <p className="text-gray-300">Trusted by 500+ Schools Nationwide</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
              className="relative w-full max-w-lg mx-auto drop-shadow-2xl transform hover:scale-110 transition-transform duration-500"
              alt="School ERP"
            />
            {/* Floating Elements */}
            <div className="absolute top-10 right-10 bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-xl animate-float">
              <div className="text-4xl mb-2">📊</div>
              <div className="text-sm font-semibold">Analytics</div>
            </div>
            <div className="absolute bottom-10 left-10 bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-xl animate-float animation-delay-2000">
              <div className="text-4xl mb-2">🎯</div>
              <div className="text-sm font-semibold">Smart Tools</div>
            </div>
          </div>
        </div>
      </section>
      

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center transform hover:scale-110 transition-all duration-300 cursor-pointer group">
                <div className="text-5xl mb-3 group-hover:animate-bounce">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-medium text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wide">🎯 Powerful Features</span>
            <h2 className="text-4xl md:text-6xl font-extrabold mt-3 mb-4 text-gray-900">
              Everything You Need to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                Manage Your School
              </span>
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
              Our comprehensive suite of tools helps you streamline operations and focus on what matters most - quality education.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((item, index) => (
              <div 
                key={index} 
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-transparent overflow-hidden hover:-translate-y-3"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-4xl mb-5 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    {item.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${item.gradient} transition-all">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">{item.description}</p>
                  
                  <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-4 transition-all">
                    <span>Learn more</span>
                    <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bus Tracking Section */}
      <section id="bus-tracking" className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-3 transform group-hover:scale-105 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1518459031867-a89b944bffe0?auto=format&fit=crop&w=800&q=60" 
                  alt="bus tracking" 
                  className="w-full rounded-2xl" 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white rounded-2xl p-5 shadow-xl text-center hover:shadow-2xl transition-shadow hover:-translate-y-1 duration-300">
                <div className="text-4xl font-extrabold text-green-600 mb-1">50+</div>
                <div className="text-xs text-gray-600 font-semibold">Active Buses</div>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-xl text-center hover:shadow-2xl transition-shadow hover:-translate-y-1 duration-300">
                <div className="text-4xl font-extrabold text-blue-600 mb-1">100%</div>
                <div className="text-xs text-gray-600 font-semibold">GPS Accurate</div>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-xl text-center hover:shadow-2xl transition-shadow hover:-translate-y-1 duration-300">
                <div className="text-4xl font-extrabold text-purple-600 mb-1">24/7</div>
                <div className="text-xs text-gray-600 font-semibold">Monitoring</div>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 space-y-6">
            <div>
              <span className="text-green-600 font-bold text-sm uppercase tracking-wide">🛡️ Safety First</span>
              <h2 className="text-4xl md:text-5xl font-extrabold mt-3 mb-4 text-gray-900">
                Real-Time
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                  Bus Live Tracking
                </span>
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Ensure student safety with our advanced GPS tracking system. Monitor every bus in real-time and keep parents informed with instant notifications.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-3xl flex-shrink-0">📍</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1 text-lg">Real-time GPS Location</h4>
                  <p className="text-gray-600 text-sm">Track exact location of every bus with pinpoint accuracy</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl flex-shrink-0">⏱️</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1 text-lg">ETA & Route History</h4>
                  <p className="text-gray-600 text-sm">Get arrival times and complete journey history</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-3xl flex-shrink-0">🔔</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1 text-lg">Instant Notifications</h4>
                  <p className="text-gray-600 text-sm">Automatic alerts for arrivals, delays & emergencies</p>
                </div>
              </div>
            </div>

            <button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105 transform">
              Explore Bus Tracking →
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-purple-600 font-bold text-sm uppercase tracking-wide">💎 Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-3 mb-4 text-gray-900">
              Built for Modern Education
            </h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              We understand the unique challenges of school management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "🚀", title: "Easy Setup", desc: "Get started in minutes with intuitive onboarding", gradient: "from-blue-500 to-cyan-500" },
              { icon: "🔒", title: "Secure & Reliable", desc: "Bank-level security with 99.9% uptime", gradient: "from-green-500 to-emerald-500" },
              { icon: "💬", title: "24/7 Support", desc: "Round-the-clock assistance whenever needed", gradient: "from-orange-500 to-red-500" },
              { icon: "📱", title: "Mobile Ready", desc: "Access from anywhere on any device", gradient: "from-purple-500 to-pink-500" }
            ].map((item, index) => (
              <div key={index} className="text-center group hover:-translate-y-2 transition-transform duration-300">
                <div className={`w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center text-5xl mx-auto mb-5 transform group-hover:rotate-12 transition-transform shadow-xl group-hover:shadow-2xl`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Ready to Transform Your School?</h2>
            <p className="text-gray-200 text-xl">Get in touch for a free demo, pricing details, or any questions</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">📞</div>
                  <div>
                    <div className="text-sm text-gray-300">Phone</div>
                    <div className="font-semibold text-lg">+91-8117856483</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">✉️</div>
                  <div>
                    <div className="text-sm text-gray-300">Email</div>
                    <div className="font-semibold text-lg break-all">hr@briskodetechnology.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">📍</div>
                  <div>
                    <div className="text-sm text-gray-300">Address</div>
                    <div className="font-semibold text-lg">Briskode Technology Pvt. Ltd.</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/20">
                <h4 className="font-bold mb-4 text-lg">Business Hours</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-semibold text-white">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-semibold text-white">10:00 AM - 4:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                <span className="text-2xl">🎓</span> School ERP
              </h3>
              <p className="text-sm">Empowering education through innovative technology solutions.</p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-yellow-400 transition-colors">Features</a></li>
                <li><a href="#bus-tracking" className="hover:text-yellow-400 transition-colors">Bus Tracking</a></li>
                <li><a href="#contact" className="hover:text-yellow-400 transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-yellow-400 transition-colors">About Us</a></li>
                <li><a href="#contact" className="hover:text-yellow-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 Briskode Technology Pvt. Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Landing;

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!email || !message) return toast.error("Please provide email and message");
    const subject = encodeURIComponent("Enquiry from School ERP Landing Page");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`);
    window.location.href = `mailto:hr@briskodetechnology.com?subject=${subject}&body=${body}`;
    toast.success("Opening mail client...");
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h3>
        <p className="text-gray-600 text-sm">We'll get back to you within 24 hours</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
        <input 
          type="text"
          placeholder="John Doe" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all" 
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
        <input 
          type="email"
          placeholder="john@school.com" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all" 
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
        <input 
          type="tel"
          placeholder="+91-XXXXXXXXXX" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all" 
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Your Message *</label>
        <textarea 
          placeholder="Tell us about your requirements..." 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all h-32 resize-none" 
          required
        />
      </div>

      <button 
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
      >
        Send Message →
      </button>
    </form>
  );
};
