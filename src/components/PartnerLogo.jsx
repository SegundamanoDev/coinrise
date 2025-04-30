import React from "react";

const PartnerLogosSection = () => {
  return (
    <section className="bg-[#1f2937] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Our Trusted Partners
        </h2>
        <p className="text-gray-400 mb-12">
          These partners help power and verify Coinrise's platform
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 items-center justify-center">
          {/* BitPay */}
          <a
            href="https://www.bitpay.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-75 transition duration-300"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c7/BitPay_logo.svg"
              alt="BitPay"
              className="h-12 mx-auto"
            />
          </a>

          {/* Trustpilot */}
          <a
            href="https://www.trustpilot.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-75 transition duration-300"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Trustpilot_logo.svg"
              alt="Trustpilot"
              className="h-10 mx-auto"
            />
          </a>

          {/* CoinGecko */}
          <a
            href="https://www.coingecko.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-75 transition duration-300"
          >
            <img
              src="https://cryptologos.cc/logos/coingecko-logo.svg"
              alt="CoinGecko"
              className="h-12 mx-auto"
            />
          </a>

          {/* CoinMarketCap */}
          <a
            href="https://www.coinmarketcap.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-75 transition duration-300"
          >
            <img
              src="https://cryptologos.cc/logos/coinmarketcap-coinmarketcap-logo.svg"
              alt="CoinMarketCap"
              className="h-12 mx-auto"
            />
          </a>

          {/* Blockchain.com */}
          <a
            href="https://www.blockchain.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-75 transition duration-300"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/10/Blockchain.com_logo.svg"
              alt="Blockchain.com"
              className="h-8 mx-auto"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PartnerLogosSection;
