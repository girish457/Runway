function FAQs() {
  const faqData = [
    {
      question: "How do I place an order?",
      answer: "To place an order, simply browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or log in if you already have one. Follow the prompts to enter your shipping and payment information, then confirm your order."
    },
    {
      question: "What are the shipping charges?",
      answer: "We offer free shipping on orders over ₹1500. For orders below ₹1500, a flat shipping charge of ₹100 applies. Delivery typically takes 3-5 business days."
    },
    {
      question: "Can I return products?",
      answer: "Yes, we have a 7-day return policy. Items must be in their original condition with tags attached. Please contact our customer service team to initiate a return."
    },
    {
      question: "How long does delivery take?",
      answer: "Standard delivery takes 3-5 business days. Express delivery options are available at checkout for faster delivery."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit and debit cards, UPI payments, and popular digital wallets. All transactions are secure and encrypted."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you'll receive a confirmation email with tracking information. You can also log into your account to view your order status and tracking details."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Frequently Asked Questions</h1>
        
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{faq.question}</h2>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">Still have questions?</h2>
          <p className="text-center text-gray-700 mb-4">
            If you can&#39;t find the answer you&#39;re looking for, please contact our customer support team.
          </p>
          <div className="text-center">
            <a 
              href="/contact-us" 
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQs;