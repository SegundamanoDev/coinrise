import { useState, useEffect } from "react";
import { VictoryLine, VictoryChart, VictoryTheme } from "victory";

const LiveBinaryChart = () => {
  const [data, setData] = useState([{ x: 0, y: 100 }]);
  const [timer, setTimer] = useState(60); // countdown from 60 seconds

  // Update chart data
  useEffect(() => {
    const dataInterval = setInterval(() => {
      setData((prevData) => {
        const lastPoint = prevData[prevData.length - 1];
        const nextY =
          lastPoint.y + (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 2);
        const nextPoint = { x: lastPoint.x + 1, y: nextY };
        const updatedData = [...prevData, nextPoint];
        return updatedData.length > 30
          ? updatedData.slice(updatedData.length - 30)
          : updatedData;
      });
    }, 500);

    return () => clearInterval(dataInterval);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (timer === 0) return; // stop when timer reaches 0

    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timer]);

  // Reset after trade round ends
  useEffect(() => {
    if (timer === 0) {
      // For now, reset the timer after reaching zero
      setTimeout(() => {
        setTimer(60);
      }, 3000); // wait 3 seconds before resetting (simulate "trade closed")
    }
  }, [timer]);

  return (
    <div className="bg-homepage-bg dark:bg-primary-bg p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-primary dark:text-white">
          Live Trade Chart
        </h2>
        <div className="text-sm text-secondary dark:text-gray-300">
          {timer > 0 ? `Next trade closes in: ${timer}s` : "Trade Closed!"}
        </div>
      </div>

      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={10}
        height={220}
      >
        <VictoryLine
          data={data}
          interpolation="monotoneX"
          style={{
            data: {
              stroke:
                data[data.length - 1]?.y > data[data.length - 2]?.y
                  ? "#22c55e"
                  : "#ef4444",
              strokeWidth: 2,
            },
          }}
        />
      </VictoryChart>

      {timer === 0 && (
        <div className="mt-4 p-4 bg-red-500/10 dark:bg-red-400/10 rounded-lg text-center text-red-500 font-semibold">
          Trade window closed! Please wait...
        </div>
      )}
    </div>
  );
};

export default LiveBinaryChart;
