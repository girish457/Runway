import { useState, useEffect } from "react";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    // Add animation classes when component mounts
    const sections = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-on-scroll {
          opacity: 0;
        }
        
        .delay-1 {
          animation-delay: 0.1s;
        }
        
        .delay-2 {
          animation-delay: 0.2s;
        }
        
        .delay-3 {
          animation-delay: 0.3s;
        }
        
        .delay-4 {
          animation-delay: 0.4s;
        }
        
        .delay-5 {
          animation-delay: 0.5s;
        }
        
        .success-message {
          animation: fadeInUp 0.3s ease-out;
        }
      `}</style>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 animate-on-scroll">Contact Us</h1>
        
        {submitSuccess && (
          <div className="success-message bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-center animate-on-scroll">
            Thank you for your message! We{`'`}ll get back to you soon.
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 animate-on-scroll delay-1">
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-md transition duration-300 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 animate-on-scroll delay-2">
            <h2 className="text-2xl font-semibold mb-4">Company Information</h2>
            <div className="space-y-4">
              <div className="animate-on-scroll delay-3">
                <h3 className="text-lg font-medium mb-2">Address</h3>
                <p className="text-gray-700">Jaipur, Rajasthan, India</p>
              </div>
              <div className="animate-on-scroll delay-4">
                <h3 className="text-lg font-medium mb-2">Phone</h3>
                <p className="text-gray-700">
                  <a href="tel:+919680820403" className="text-blue-600 hover:underline">+91 96808 20403</a>
                </p>
              </div>
              <div className="animate-on-scroll delay-5">
                <h3 className="text-lg font-medium mb-2">Email</h3>
                <p className="text-gray-700">
                  <a href="mailto:Runwaybyyogesh@gmail.com" className="text-blue-600 hover:underline">Runwaybyyogesh@gmail.com</a>
                </p>
              </div>
              <div className="animate-on-scroll delay-6">
                <h3 className="text-lg font-medium mb-2">Business Hours</h3>
                <p className="text-gray-700">Monday to Saturday</p>
                <p className="text-gray-700">10:00 AM – 7:00 PM</p>
              </div>
              <div className="animate-on-scroll delay-7">
                <h3 className="text-lg font-medium mb-2">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-blue-600 hover:text-blue-800 transition duration-300">
                    <i className="fab fa-facebook-f text-2xl"></i>
                  </a>
                  <a href="#" className="text-pink-600 hover:text-pink-800 transition duration-300">
                    <i className="fab fa-instagram text-2xl"></i>
                  </a>
                  <a href="#" className="text-blue-400 hover:text-blue-600 transition duration-300">
                    <i className="fab fa-twitter text-2xl"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-md p-6 animate-on-scroll delay-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">Visit Our Store</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923173944!2d75.54208125!3d26.88583355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c5d0967%3A0xce3c29d8a4d6511d!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1652253220610!5m2!1sen!2sin" 
              width="100%" 
              height="300" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-md"
              title="Google Maps Location">
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;