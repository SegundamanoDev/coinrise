import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip
);

const RealTimeBtcChart = () => {
  const [price, setPrice] = useState(null);
  const [change, setChange] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchBTCData = async () => {
      try {
        // Price + daily change
        const priceRes = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true"
        );
        const btc = priceRes.data.bitcoin;
        setPrice(btc.usd);
        setChange(btc.usd_24h_change.toFixed(2));

        // Historical data for chart (past 24 hours)
        const chartRes = await axios.get(
          "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=hourly"
        );
        const prices = chartRes.data.prices;

        setChartData({
          labels: prices.map((p) => {
            const date = new Date(p[0]);
            return `${date.getHours()}:00`;
          }),
          datasets: [
            {
              label: "BTC Price (USD)",
              data: prices.map((p) => p[1]),
              borderColor: "#facc15",
              backgroundColor: "rgba(250, 204, 21, 0.1)",
              tension: 0.3,
              fill: true,
            },
          ],
        });

        console.log(chartData);
      } catch (error) {
        console.error("Error fetching BTC data", error);
      }
    };

    fetchBTCData();
    const interval = setInterval(fetchBTCData, 60000); // refresh every minute
    return () => clearInterval(interval);
  }, []);

  const isPositive = change && parseFloat(change) >= 0;

  return (
    <section className="bg-gray-900 text-white py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Live Bitcoin Market
        </h2>
        <p className="text-gray-300 mb-8">
          Stay updated with the latest BTC price and market trends
        </p>

        {price !== null ? (
          <div className="text-3xl font-bold mb-4">
            1 BTC = ${price.toLocaleString()} USD
            <p
              className={`mt-2 text-xl font-medium ${
                isPositive ? "text-green-400" : "text-red-400"
              }`}
            >
              {isPositive ? "▲" : "▼"} {change}% Today
            </p>
          </div>
        ) : (
          <p className="text-gray-400 mb-4">Loading price...</p>
        )}

        {chartData ? (
          <div className="bg-white rounded-xl p-4 mt-6">
            <Line
              data={chartData}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
              }}
            />
          </div>
        ) : (
          <p className="text-gray-400">Loading chart...</p>
        )}
      </div>
    </section>
  );
};

export default RealTimeBtcChart;
