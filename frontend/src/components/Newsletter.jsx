import React, { useState } from "react";

function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    console.log("Subscribing email:", email);
    setEmail("");
    // You can add actual subscription logic here
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-8 text-white flex flex-row justify-center items-center">
      <div className="max-w-md">
        <h3 className="text-2xl font-bold mb-2">Get weekly update</h3>
        <p className="text-gray-300 mb-4">
          Subscribe to our newsletter for the latest product updates and exclusive offers.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-row justify-center items-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-2 rounded-l-lg border-0 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
          />
          <button 
            type="submit"
            className="bg-blue-600 px-6 py-2 rounded-r-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}

export default Newsletter;
