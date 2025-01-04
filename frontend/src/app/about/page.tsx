export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12 text-gray-900">About </h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8 prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 pb-2 relative">
              Welcome to Pingbix Blog
              <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-orange-500"></span>
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Welcome to the official Pingbix blog - your comprehensive resource for everything related to modern communication solutions. Our blog serves as a knowledge hub where you can discover in-depth insights about CPaaS, SMS, IVR, and various other communication products that are shaping the future of business connectivity.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 pb-2 relative">
              Our Expertise
              <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-orange-500"></span>
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-gray-700">
              <li><strong>CPaaS Solutions:</strong> Explore our Communications Platform as a Service offerings, enabling seamless integration of communication features into your applications.</li>
              <li><strong>SMS Services:</strong> Learn about our enterprise SMS solutions, bulk messaging capabilities, and SMS marketing strategies.</li>
              <li><strong>IVR Systems:</strong> Discover how our Interactive Voice Response solutions can enhance your customer service experience.</li>
              <li><strong>Communication APIs:</strong> Stay updated with our latest API developments and integration possibilities.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 pb-2 relative">
              What You'll Find Here
              <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-orange-500"></span>
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <ul className="list-disc pl-6 space-y-3">
                <li>Industry insights and trends in communication technology</li>
                <li>Best practices for implementing communication solutions</li>
                <li>Case studies and success stories</li>
                <li>Technical tutorials and implementation guides</li>
                <li>Product updates and new feature announcements</li>
                <li>Tips for optimizing your communication strategy</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 pb-2 relative">
              Why Choose Pingbix
              <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-orange-500"></span>
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                At Pingbix, we combine technical expertise with industry knowledge to deliver reliable and scalable communication solutions. Our blog reflects our commitment to:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>Providing up-to-date, relevant information</li>
                <li>Sharing practical, implementable solutions</li>
                <li>Supporting businesses in their digital transformation journey</li>
                <li>Building a community of communication technology enthusiasts</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 pb-2 relative">
              Stay Connected
              <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-orange-500"></span>
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Subscribe to our newsletter and follow us on social media to stay updated with the latest in communication technology. Join our growing community of businesses and developers who are shaping the future of digital communication.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 