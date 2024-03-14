import React, { useState, useEffect } from "react";
import { CiLock } from "react-icons/ci";
import { apiGet } from "../services";
const Tennis = () => {
  const [basketballData, setBasketballData] = useState(null);

 useEffect(() => {
   const fetchData = async () => {
     try {
       const response = await apiGet();
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
   }, 500); // 300000 milliseconds = 5 minutes

   // Xóa interval khi component unmount để tránh leak memory
   return () => clearInterval(interval);
 }, []);
  console.log(basketballData);
  return (
    <div className="w-4/5 mx-auto pt-8 bg-white h-screen">
      <div className="">
        <div className="border-b-4">MBA</div>
        <div className="space-y-4">
          {basketballData && basketballData.Games.length > 0 ? (
            basketballData.Games.map((game, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded shadow"
              >
                <div className="grid grid-cols-4 gap-4 mb-4 text-center">
                  <div className="text-left">{game.game_name}</div>
                  <div>Spread</div>
                  <div>Total</div>
                  <div>Money</div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {/* logo vs name */}
                  <div className="grid gap-4">
                    <div className="flex items-center space-x-2">
                      {/* <img
                        src={event.team1.logo}
                        alt={event.team1.name}
                        className="w-8 h-8"
                      /> */}
                      <div>
                        <div className="font-semibold">{game?.homeTeam}</div>
                        <div className="text-sm text-gray-600">
                          {/* {event.team1.record} */}
                        </div>
                      </div>
                      <span className="text-gray-800 font-bold">
                        {/* {event.team1.score} */}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {/* <img
                        src={event.team2.logo}
                        alt={event.team2.name}
                        className="w-8 h-8"
                      /> */}
                      <div>
                        <div className="font-semibold">{game?.awayTeam}</div>
                        <div className="text-sm text-gray-600">
                          {/* {event.team2.record} */}
                        </div>
                      </div>
                      <span className="text-gray-800 font-bold">
                        {/* {event.team2.score} */}
                      </span>
                    </div>
                  </div>
                  {/* spread */}
                  <div className="font-medium grid gap-4">
                    <div
                      className={`border-2 rounded-lg text-center ${
                        !game.bettingBoard.Spread &&
                        "flex justify-center items-center"
                      }`}
                    >
                      {game.bettingBoard.Spread ? (
                        <>
                          <p>{game.bettingBoard.Spread[0].name}</p>
                          <p>{game.bettingBoard.Spread[0].value}</p>
                        </>
                      ) : (
                        <CiLock className="text-2xl" />
                      )}
                    </div>
                    <div
                      className={`border-2 rounded-lg text-center ${
                        !game.bettingBoard.Spread &&
                        "flex justify-center items-center"
                      }`}
                    >
                      {game.bettingBoard.Spread ? (
                        <>
                          <p>{game.bettingBoard.Spread[1].name}</p>
                          <p>{game.bettingBoard.Spread[1].value}</p>
                        </>
                      ) : (
                        <CiLock className="text-2xl" />
                      )}
                    </div>
                  </div>
                  {/* total */}
                  <div className="font-medium grid gap-4">
                    <div
                      className={`border-2 rounded-lg text-center ${
                        game.bettingBoard.Totals &&
                        "flex justify-center items-center"
                      }`}
                    >
                      {game.bettingBoard.Totals ? (
                        <div className="flex flex-col">
                          <p>{game.bettingBoard.Totals[0].name}</p>
                          <p>{game.bettingBoard.Totals[0].value}</p>
                        </div>
                      ) : (
                        <CiLock className="text-2xl" />
                      )}
                    </div>
                    <div
                      className={`border-2 rounded-lg text-center ${
                        game.bettingBoard.Totals &&
                        "flex justify-center items-center"
                      }`}
                    >
                      {game.bettingBoard.Totals ? (
                        <div className="flex flex-col">
                          <p>{game.bettingBoard.Totals[1].name}</p>
                          <p>{game.bettingBoard.Totals[1].value}</p>
                        </div>
                      ) : (
                        <CiLock className="text-2xl" />
                      )}
                    </div>
                  </div>
                  {/* money */}
                  <div className="font-medium grid gap-4">
                    <div
                      className={`border-2 rounded-lg text-center ${
                        !game.bettingBoard["Money Line"] &&
                        "flex justify-center items-center"
                      }`}
                    >
                      {game.bettingBoard["Money Line"] ? (
                        <p>{game.bettingBoard["Money Line"][0].value}</p>
                      ) : (
                        <CiLock className="text-2xl" />
                      )}
                    </div>
                    <div
                      className={`border-2 rounded-lg text-center ${
                        !game.bettingBoard["Money Line"] &&
                        "flex justify-center items-center"
                      }`}
                    >
                      {game.bettingBoard["Money Line"] ? (
                        <p>{game.bettingBoard["Money Line"][1].value}</p>
                      ) : (
                        <CiLock className="text-2xl" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No basketball games available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tennis;
