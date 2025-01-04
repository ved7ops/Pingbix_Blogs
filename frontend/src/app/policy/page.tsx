export default function EndUserPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12 text-gray-900">End User Policy</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8 prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 pb-2 relative">
              1. Introduction
              <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-orange-500"></span>
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                At Pingbix, our commitment to maintaining healthy and safe traffic is paramount. We provide platforms that facilitate direct communication between Merchants and End Users. To establish and sustain trust and loyalty, we have implemented a comprehensive set of best practice guidelines and policies. These guidelines, informed by our expertise and industry standards, align with regulatory, Mobile Network Operator (MNO), and broader industry sector guidance.
              </p>
              <p>
                Even with healthy traffic, we acknowledge that Vulnerable End Users may occasionally interact with Offerings. Pingbix views this as a crucial aspect and is dedicated to ensuring that Vulnerable End Users are not adversely affected during their interactions with our platforms.
              </p>
              <p>
                The purpose of this Vulnerable End User Policy is to outline our approach, ensuring Merchants prioritize the protection of Vulnerable End Users and that Offerings do not exploit vulnerabilities, delivering fair customer outcomes across all geographical regions.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 pb-2 relative">
              2. Scope
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-orange-500"></span>
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The Vulnerable Customer Policy applies to all Offerings operating through Pingbix and encompasses all interactions Pingbix has with Customers or End Users. Third-Party providers interacting directly with Pingbix End Users are also bound by the standards outlined in this policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 pb-2 relative">
              3. Definitions
              <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-orange-500"></span>
            </h2>
            <ul className="space-y-4">
              {[
                { term: 'Vulnerable End User', def: 'An End User with a characteristic, circumstance, or need making them less likely to make fully informed decisions, and susceptible to suffering detriment.' },
                { term: 'Colleagues', def: 'Employees, contractors, directors, and advisers to Pingbix.' },
                { term: 'Customer', def: 'An individual with a contract with an MNO for mobile telephony services.' },
                { term: 'End User', def: 'The individual seeking to access the Offering.' },
                { term: 'Merchant', def: 'The content provider responsible for an Offering\'s operation, content, marketing, and promotion.' },
                { term: 'MNO', def: 'Mobile Network Operator in the country where the Offering is offered.' },
                { term: 'Offering', def: 'Services paid for by the Customer through their mobile phone bill.' },
                { term: 'Refund Request', def: 'A request for the repayment of money paid to a Merchant in relation to an Offering.' },
                { term: 'Regulator', def: 'The official body appointed in the country regulating Telecom services (TRAI).' },
              ].map((item, index) => (
                <li key={index} className="flex gap-2">
                  <span className="font-semibold text-gray-900 min-w-[180px]">{item.term}:</span>
                  <span className="text-gray-700">{item.def}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 pb-2 relative">
              4. Roles and Responsibilities
              <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-orange-500"></span>
            </h2>
            <p className="text-gray-700 leading-relaxed">
              All Colleagues are responsible for daily management and implementation of the Vulnerable End User policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 pb-2 relative">
              5. Treatment of a Vulnerable End User
              <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-orange-500"></span>
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Colleagues ensure fair outcomes throughout the End User journey.</li>
              <li>Merchants take appropriate actions to support Vulnerable End Users.</li>
              <li>Alternative communication methods are accommodated to remove access barriers.</li>
              <li>Regular reviews of identified Vulnerable End Users are conducted.</li>
              <li>Cases at risk of unfair outcomes are escalated to the Customer Solutions team.</li>
              <li>Additional support is provided to enable informed decisions.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 pb-2 relative">
              6. Risk Matrix
              <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-orange-500"></span>
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Pingbix maintains an internal Vulnerability Matrix, categorizing risks as low, medium, or high. Updated quarterly, it can be provided to regulators or MNOs upon request.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 pb-2 relative">
              7. Complaints Procedure and Vulnerable Customers
              <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-orange-500"></span>
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>The complaints process considers the needs of Vulnerable End Users.</li>
              <li>Customer service agents are trained to recognize and assist vulnerable individuals.</li>
              <li>Information useful to Vulnerable End Users is made easily accessible.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 pb-2 relative">
              8. Compliance
              <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-orange-500"></span>
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Adherence to this policy is considered part of best industry practices. Offerings on Pingbix's platforms must protect Vulnerable End Users to the same extent outlined in this policy. Noncompliance may result in corrective action by Pingbix.
              </p>
              <p className="italic">
                This Vulnerable End User Policy is subject to periodic review and updates.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 