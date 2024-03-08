import React from "react";
import { CiLock } from "react-icons/ci";

const KinhBet = () => {
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
    // Thêm dữ liệu cho các sự kiện khác ở đây nếu muốn
  ];
  return (
    <div className="w-4/5 mx-auto pt-8 bg-white h-screen">
      <div className="">
        <div className="border-b-4">MBA</div>
        <div className="space-y-4">
          {eventsData.map((event) => (
            <div
              key={event.id}
              className="p-4 border border-gray-200 rounded shadow"
            >
              <div className="grid grid-cols-4 gap-4 mb-4 text-center">
                <div className="text-left">{event.time}</div>
                <div>Spread</div>
                <div>Total</div>
                <div>Money</div>
              </div>
              <div className="grid grid-cols-4 gap-4">
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KinhBet;
