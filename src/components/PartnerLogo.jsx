import React, { useEffect } from "react";

const PartnerLogosSection = () => {
  return (
    <section className="bg-[#1f2937] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Our Trusted Partners
        </h2>
        <p className="text-gray-400 mb-12">
          These partners help power and verify Coinrise's platform
        </p>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 items-center justify-center"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {/* BitPay */}
          <a
            href="https://www.bitpay.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-75 transition duration-300 text-center"
          >
            <p className="text-sm text-gray-400 mt-2">BitPay</p>
          </a>

          {/* Trustpilot */}
          <a
            href="https://www.trustpilot.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-75 transition duration-300 text-center"
          >
            <p className="text-sm text-gray-400 mt-2">Trustpilot</p>
          </a>

          {/* CoinGecko */}
          <a
            href="https://www.coingecko.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-75 transition duration-300 text-center"
          >
            <p className="text-sm text-gray-400 mt-2">CoinGecko</p>
          </a>

          {/* CoinMarketCap */}
          <a
            href="https://www.coinmarketcap.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-75 transition duration-300 text-center"
          >
            <p className="text-sm text-gray-400 mt-2">CoinMarketCap</p>
          </a>

          {/* Blockchain.com */}
          <a
            href="https://www.blockchain.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-75 transition duration-300 text-center"
          >
            <p className="text-sm text-gray-400 mt-2">Blockchain.com</p>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PartnerLogosSection;
