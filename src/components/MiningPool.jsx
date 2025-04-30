import React from "react";

const MiningPoolPage = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Join Our Powerful Bitcoin Mining Pool
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Combine your mining power with others and earn consistent profits —
          even without expensive hardware.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button className="bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition">
            Join the Pool
          </button>
          <button className="border border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-black transition">
            Learn More
          </button>
        </div>
      </section>

      {/* What is a Mining Pool */}
      <section className="py-16 px-6 md:px-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">What is a Mining Pool?</h2>
          <p className="text-lg leading-relaxed">
            A mining pool is a group of crypto miners who combine their
            computing power to increase the chance of finding Bitcoin blocks and
            receiving rewards. Rewards are then shared proportionally based on
            each participant's contribution.
          </p>
        </div>
        <div>
          <img
            src="/images/mining-pool-graphic.png"
            alt="Mining pool explanation"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold mb-12">How Our Pool Works</h2>
        <div className="grid md:grid-cols-5 gap-6 text-sm">
          {[
            "Connect Your Wallet",
            "Choose Your Mining Power",
            "Join the Pool",
            "Track Profits Daily",
            "Withdraw Earnings Anytime",
          ].map((step, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="text-3xl font-bold mb-4">{index + 1}</div>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pool Benefits */}
      <section className="bg-gray-100 py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold mb-12">Why Join Our Pool?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            ["Low Entry Barrier", "No hardware needed"],
            ["Stable Returns", "Daily profit sharing"],
            ["Real-Time Monitoring", "Track your stats"],
            ["High Uptime", "99.9% reliability"],
            ["Transparent Payouts", "No hidden fees"],
            ["Secure Platform", "Your data is safe"],
          ].map(([title, desc], i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Real-Time Stats (Optional) */}
      <section className="bg-white py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold mb-8">Live Mining Pool Stats</h2>
        <div className="grid md:grid-cols-4 gap-6 text-xl">
          <div>
            <strong>Current Hashrate:</strong> 950 TH/s
          </div>
          <div>
            <strong>BTC Mined This Month:</strong> 4.25 BTC
          </div>
          <div>
            <strong>Active Miners:</strong> 1,230
          </div>
          <div>
            <strong>Last Payout:</strong> 2 hours ago
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold mb-12">What Our Members Say</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              name: "James (USA)",
              feedback:
                "I've earned steady profits since joining the pool. Totally worth it!",
            },
            {
              name: "Amina (Nigeria)",
              feedback:
                "Easy to start and transparent earnings. Highly recommend!",
            },
          ].map(({ name, feedback }, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow">
              <p className="mb-4 italic">"{feedback}"</p>
              <div className="font-semibold">{name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Mine and Earn Together?
        </h2>
        <p className="mb-8">
          Take advantage of collective mining power and start earning Bitcoin
          today.
        </p>
        <button className="bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition">
          Join the Mining Pool Now
        </button>
      </section>
    </div>
  );
};

export default MiningPoolPage;
