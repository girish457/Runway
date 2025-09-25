import { useEffect } from "react";

function AboutUs() {
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
        
        .delay-6 {
          animation-delay: 0.6s;
        }
      `}</style>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 animate-on-scroll">About Us</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-on-scroll delay-1">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-700 mb-4">
            Welcome to Runway by Yogesh, where fashion meets elegance. Founded with a passion for creating 
            beautiful clothing that empowers individuals to express their unique style, we have been 
            dedicated to providing high-quality, fashionable apparel since our inception.
          </p>
          <p className="text-gray-700 mb-4">
            Our journey began with a simple vision: to make fashion accessible to everyone while maintaining 
            the highest standards of quality and craftsmanship. Over the years, we have grown from a small 
            boutique to a recognized name in the fashion industry, but our commitment to excellence remains 
            unchanged.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-on-scroll delay-2">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            At Runway by Yogesh, our mission is to inspire confidence through fashion. We believe that 
            what you wear should reflect who you are and how you want to be perceived. Our carefully 
            curated collections are designed to help you make a statement, whether you{`'`}re heading to 
            the office, a social event, or simply enjoying a casual day out.
          </p>
          <p className="text-gray-700">
            We are committed to sustainability and ethical practices in all aspects of our business. 
            From sourcing eco-friendly materials to ensuring fair labor practices, we strive to make 
            a positive impact on both people and the planet.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 animate-on-scroll delay-3">
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center animate-on-scroll delay-4">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-star text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-medium mb-2">Quality</h3>
              <p className="text-gray-700">
                We never compromise on quality. Every piece in our collection is crafted with attention 
                to detail and premium materials.
              </p>
            </div>
            <div className="text-center animate-on-scroll delay-5">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-lightbulb text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-medium mb-2">Innovation</h3>
              <p className="text-gray-700">
                We constantly strive to bring fresh ideas and innovative designs to our customers, 
                keeping up with the latest fashion trends.
              </p>
            </div>
            <div className="text-center animate-on-scroll delay-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-heart text-purple-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-medium mb-2">Customer Satisfaction</h3>
              <p className="text-gray-700">
                Our customers are at the heart of everything we do. We are dedicated to providing 
                exceptional service and an enjoyable shopping experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;