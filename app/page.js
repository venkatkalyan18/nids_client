"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [delay, setDelay] = useState(1); 

  const handleChange = (value) => {
      setDelay(parseInt(value)); 
  };

  const getData = async () => {
    const response = await fetch("http://localhost:5000/api/data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonData = await response.json();
    setData(jsonData.reverse()); 
  };

  useEffect(() => {
    getData(); 
    const interval = setInterval(() => {
      getData();
    }, delay * 1000); 

    return () => clearInterval(interval);
  }, [delay]); 

  const attributes = [
    "id",
    "frame_len",
    "frame_time_delta",
    "frame_time_relative",
    "ip_src",
    "ip_dst",
    "ip_len",
    "ip_ttl",
    "tcp_srcport",
    "tcp_dstport",
    "tcp_len",
    "tcp_flags_syn",
    "tcp_flags_ack",
    "tcp_flags_fin",
    "tcp_flags_rst",
    "tcp_flags_push",
    "tcp_flags_urg",
    "prediction",
  ];

  return (
    <div className="p-4 bg-gray-800 text-white overflow-auto w-full h-full">
      <div className="flex gap-5 justify-between">
        <h1 className="text-lg font-bold mb-4 text-white">Data Table</h1>
        <input
          type="number"
          value={delay}
          min={1}
          max={50}
          onChange={(e) => handleChange(e.target.value)}
          className="border-2 border-gray-600 h-8 text-md px-2 py-1 bg-gray-700 text-white placeholder-gray-400 text-center"
        />
      </div>
      <table className="w-full border-collapse border border-gray-600">
        <thead>
          <tr className="bg-gray-700">
            {attributes.map((key) => (
              <th key={key} className="border border-gray-600 px-4 py-2 text-left text-white">
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={`${item.prediction === 1 ? "text-red-400" : "text-green-400"}`}
            >
              {Object.values(item).map((value, idx) => (
                <td key={idx} className="border border-gray-600 px-4 py-2">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
