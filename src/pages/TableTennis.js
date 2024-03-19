import React, { useState, useEffect, useRef } from "react";
import { CiLock } from "react-icons/ci";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { apiGet } from "../services";
const TableTableTennis = () => {
  const [basketballData, setBasketballData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiGet();
        if (response.data.Sports) {
          const basketball = response.data.Sports.find(
            (sport) => sport.SportType === "Tennis"
            // (sport) => sport.SportType === "Table Tennis"
          );
          setBasketballData(basketball);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 500000);
    // 300000 milliseconds = 5 minutes
    // Xóa interval khi component unmount để tránh leak memory
    return () => clearInterval(interval);
  }, []);
  const [data, setData] = useState();
  const wsUrl = `ws://123.27.3.32:8765/kingsbet/live?token=96602715-cb62-4fe2-ae00-040a40b28995`;
  const ws = useRef(null);
  useEffect(() => {
    ws.current = new WebSocket(wsUrl);
    ws.current.onopen = () => {
      console.log("WebSocket connection established");
      ws.current.send("something");
    };
    ws.current.onmessage = (event) => {
      const jsonData = JSON.parse(event.data);
      setData(jsonData?.payload?.game);
    };
    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
    };
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (!data || !basketballData || basketballData.Games.length === 0) return; // Nếu không có dữ liệu ban đầu, không cần cập nhật
    const updatedGames = basketballData.Games.map((game) => {
      [
        "2Way - Who will win?",
        "Who will win second set?",
        "Match Winner",
      ].forEach((betType) => {
        game.bettingBoard[betType]?.forEach((bet, index) => {
          const liveUpdate = data.results.find(
            (result) => result.id === bet.id
          );
          if (liveUpdate) {
            // Cập nhật thông tin cược với dữ liệu mới
            game.bettingBoard[betType][index] = {
              ...bet,
              odds: liveUpdate.odds,
              name: liveUpdate.name.value,
              resultName: liveUpdate.name.value,
            };
          }
        });
      });
      return game; // Trả lại trận đấu đã được cập nhật
    });

    setBasketballData({ ...basketballData, Games: updatedGames });
  }, [data]);

  // console.log(data);
  console.log(basketballData);
  return (
    <div className="w-4/5 mx-auto pt-8 bg-white h-screen">
      <div className="">
        <div className="border-b-4">MBA</div>
        <div className="space-y-4">
          {basketballData && basketballData.Games.length > 0 ? (
            basketballData.Games.map((game, index) => (
              <Card
                key={index}
                className="p-4 border border-gray-200 rounded shadow"
              >
                <CardHeader className="grid grid-cols-4 gap-4 mb-4 text-center">
                  <div className="text-left">{game.game_name}</div>
                  <div>Money</div>
                  <div>Money</div>
                </CardHeader>
                <CardContent className="grid grid-cols-4 gap-4">
                  <div className="col-span-1">
                    {/* Example for home and away teams, adjust accordingly */}
                    <div className="font-semibold">{game?.homeTeam}</div>
                    <div className="font-semibold">{game?.awayTeam}</div>
                  </div>
                  {/*Money */}
                  <div className="col-span-1 grid gap-4">
                    {/* {game?.bettingBoard["2Way - Who will win?"]?.map( */}
                    {game?.bettingBoard["Match Winner"]?.map(
                      (moneyLine, moneyLineIndex) => (
                        <div
                          key={moneyLineIndex}
                          className="border-2 rounded-lg text-center p-2"
                          data-bet-id={moneyLine.id}
                        >
                          <p id={`moneyline-name-${moneyLine.id}`}>
                            {moneyLine.resultName}
                          </p>
                          <p id={`moneyline-odds-${moneyLine.id}`}>
                            {moneyLine.odds}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                  {/*Who will win second set? */}
                  <div className="col-span-1 grid gap-4">
                    {/* {game?.bettingBoard["Who will win second set?"]?.map( */}
                    {game?.bettingBoard["Set 1 Winner"]?.map(
                      (second, secondIndex) => (
                        <div
                          key={secondIndex}
                          className="border-2 rounded-lg text-center p-2"
                          data-bet-id={second.id}
                        >
                          <p id={`second-name-${second.id}`}>
                            {second.resultName}
                          </p>
                          <p id={`second-odds-${second.id}`}>{second.odds}</p>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No basketball games available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableTableTennis;
