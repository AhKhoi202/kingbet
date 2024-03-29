import React, { useState, useEffect, useRef } from "react";
import { CiLock } from "react-icons/ci";
import UseWebSocket from "./UseWebSocket";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { apiGet } from "../services";

const Live = () => {
  const eventsData = [
    {
      id: 1,
      time: "Tomorrow • 9:10 AM",
      team1: {
        name: "Raptors",
        score: "39",
        logo: "https://media.itsfogo.com/media/upload/prod/participants/7/57f4209a.svg",
        spread: "+10.5",
        spread1: "1.87",
        total: "232.5",
        total1: "2.5",
        money: "4.60",
      },
      team2: {
        name: "Suns",
        score: "36",
        logo: "https://media.itsfogo.com/media/upload/prod/participants/7/3a84aa69.svg",
        spread: "+10.5",
        spread1: "1.87",
        total: "232.5",
        total1: "2.5",
        money: "",
      },
    },
  ];

  const [basketballData, setBasketballData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiGet();
        console.log(response);

        if (response.data.Sports) {
          const basketball = response.data.Sports.find(
            (sport) => sport.SportType === "Basketball"
          );
          setBasketballData(basketball);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    // Gọi fetchData lần đầu tiên khi component được render
    fetchData();
    // Thiết lập interval để gọi fetchData mỗi 5 phút
    const interval = setInterval(() => {
      fetchData();
    }, 300000); // 300000 milliseconds = 5 minutes
    // Xóa interval khi component unmount để tránh leak memory
    return () => clearInterval(interval);
  }, []);
  const [matches, setMatches] = useState([]);
  const [data, setData] = useState();
  const wsUrl = `ws://123.27.3.32:8765/kingsbet/live?token=96602715-cb62-4fe2-ae00-040a40b28995`;
  // const ws = UseWebSocket(wsUrl);
  const ws = new WebSocket(wsUrl);
  // const ww = useRef(0);
  useEffect(function () {
    if (ws) {
      ws.onopen = () => {
        // console.log("Connected", ww.current);
        ws.send("something");
      };
      ws.onmessage = (event) => {
        // console.log(event.data);
        const jsonData = JSON.parse(event.data);
        setData(jsonData?.payload?.game);
      };
      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
      ws.onclose = () => {
        console.log("WebSocket connection closed");
      };
    }
  }, []);
  console.log(data);
  return (
    <div className="w-4/5 mx-auto pt-8 bg-white h-screen">
      <div className="">
        <div className="border-b-4">MBA</div>
        <div>
          tên đội 1:
          {data?.results?.length > 0
            ? data.results[0]?.name.value
            : "Đang tải..."}
          {data?.results?.length > 0 ? data.results[0]?.odds : "Đang tải..."}
          tên đội 2:
          {data?.results?.length > 1
            ? data.results[1]?.name.value
            : "Đang tải..."}
          {data?.results?.length > 0 ? data.results[1]?.odds : "Đang tải..."}
        </div>
      </div>
      {eventsData.map((event) => (
        <Card key={event.id} className="">
          <CardHeader className="grid grid-cols-4 gap-4 mb-4 text-center">
            <div className="text-left">{event.time}</div>
            <div>Spread</div>
            <div>Total</div>
            <div>Money</div>
          </CardHeader>
          <CardContent className="grid grid-cols-4 gap-4">
            {/* logo vs name */}
            <div className="grid gap-4">
              <div className="flex items-center space-x-2">
                <img
                  src={event.team1.logo}
                  alt={event.team1.name}
                  className="w-8 h-8"
                />
                <div>
                  <div className="font-semibold">{event.team1.name}</div>
                  <div className="text-sm text-gray-600">
                    {/* {event.team1.record} */}
                  </div>
                </div>
                <span className="text-gray-800 font-bold">
                  {event.team1.score}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <img
                  src={event.team2.logo}
                  alt={event.team2.name}
                  className="w-8 h-8"
                />
                <div>
                  <div className="font-semibold">{event.team2.name}</div>
                  <div className="text-sm text-gray-600">
                    {/* {event.team2.record} */}
                  </div>
                </div>
                <span className="text-gray-800 font-bold">
                  {event.team2.score}
                </span>
              </div>
            </div>
            <div className="font-medium grid gap-4">
              <div
                className={`border-2 rounded-lg text-center ${
                  !event.team1.spread && "flex justify-center items-center"
                }`}
              >
                {event.team1.spread ? (
                  <>
                    <p>{event.team1.spread}</p>
                    <p>{event.team1.spread1}</p>
                  </>
                ) : (
                  <CiLock className="text-2xl" />
                )}
              </div>
              <div
                className={`border-2 rounded-lg text-center ${
                  !event.team2.spread && "flex justify-center items-center"
                }`}
              >
                {event.team2.spread ? (
                  <>
                    <p>{event.team2.spread}</p>
                    <p>{event.team2.spread1}</p>
                  </>
                ) : (
                  <CiLock className="text-2xl" />
                )}
              </div>
            </div>
            <div className="font-medium grid gap-4">
              <div
                className={`border-2 rounded-lg text-center ${
                  !event.team1.total && "flex justify-center items-center"
                }`}
              >
                {event.team1.total ? (
                  <>
                    <p>O {event.team1.total}</p>
                    <p>{event.team1.total1}</p>
                  </>
                ) : (
                  <CiLock className="text-2xl" />
                )}
              </div>
              <div
                className={`border-2 rounded-lg text-center ${
                  !event.team2.total && "flex justify-center items-center"
                }`}
              >
                {event.team2.total ? (
                  <>
                    <p>U {event.team2.total}</p>
                    <p>{event.team2.total1}</p>
                  </>
                ) : (
                  <CiLock className="text-2xl" />
                )}
              </div>
            </div>
            <div className="font-medium grid gap-4">
              <div
                className={`border-2 rounded-lg text-center ${
                  !event.team1.money && "flex justify-center items-center"
                }`}
              >
                {event.team1.money ? (
                  <p>{event.team1.money}</p>
                ) : (
                  <CiLock className="text-2xl" />
                )}
              </div>
              <div
                className={`border-2 rounded-lg text-center ${
                  !event.team2.money && "flex justify-center items-center"
                }`}
              >
                {event.team2.money ? (
                  <p>{event.team2.money}</p>
                ) : (
                  <CiLock className="text-2xl" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Live;
