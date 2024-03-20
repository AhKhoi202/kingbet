import React, { useState, useEffect, useRef } from "react";
import { CiLock } from "react-icons/ci";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { apiNBA, apiGet } from "../services";
const NBA = () => {
  const [basketballData, setBasketballData] = useState(null);
  const [updatedData, setUpdatedData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiNBA();
        // const response = await apiGet();
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
    fetchData();
    // Thiết lập interval để gọi fetchData
    const interval = setInterval(fetchData, 20000);
    // Xóa interval khi component unmount để tránh leak memory
    return () => clearInterval(interval);
  }, []);

  //ws
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
    // if (!data || !basketballData || basketballData.Games.length === 0) return; // Nếu không có dữ liệu ban đầu, không cần cập nhật
    const updatedGames = basketballData?.Games?.map((game) => {
      ["Spread", "Totals", "Money Line"].forEach((betType) => {
        game.bettingBoard[betType]?.forEach((bet, index) => {
          const liveUpdate = data.results.find(
            (result) => result.id === bet.id
          );
          console.log(liveUpdate);
          if (liveUpdate) {
            // Cập nhật thông tin cược với dữ liệu mới
            game.bettingBoard[betType][index] = {
              ...bet,
              value: liveUpdate.odds,
              name: liveUpdate.attr,
              // resultName: liveUpdate.name.value,
            };
          }
        });
      });
      return game; // Trả lại trận đấu đã được cập nhật
    });

    setBasketballData({ ...basketballData, Games: updatedGames });
    setUpdatedData(basketballData);
  }, [data]);

  // console.log(data);
  // console.log(updatedData);
  // console.log(basketballData);
  return (
    <div className="w-4/5 mx-auto pt-8 bg-white h-screen">
      <div className="">
        <div className="border-b-4">MBA</div>
        <div className="space-y-4">
          {updatedData && updatedData.Games && updatedData.Games.length > 0 ? (
            // {basketballData &&
            // basketballData?.Games?.length > 0 ? (
            // basketballData.Games.map((game, index) => (
            updatedData.Games.map((game, index) => (
              <Card
                key={index}
                className="p-4 border border-gray-200 rounded shadow"
              >
                <CardHeader className="grid grid-cols-4 gap-4 mb-4 text-center">
                  <div className="text-left">{game.game_name}</div>
                  <div>Spread</div>
                  <div>Total</div>
                  <div>Money</div>
                </CardHeader>
                <CardContent className="grid grid-cols-4 gap-4">
                  <div className="col-span-1">
                    {/* Example for home and away teams, adjust accordingly */}
                    <div className="font-semibold">{game?.homeTeam}</div>
                    <div className="font-semibold">{game?.awayTeam}</div>
                  </div>
                  {/* Example for Spread */}
                  <div className="col-span-1 grid gap-4">
                    {game.bettingBoard.Spread &&
                      game.bettingBoard.Spread.map((spread, spreadIndex) => (
                        <div
                          key={spreadIndex}
                          className="border-2 rounded-lg text-center p-2"
                          data-bet-id={spread.id}
                        >
                          {/*spread*/}
                          {/* <p>{spread.name}</p> */}
                          <p id={`spread-resultName-${spread.id}`}>
                            {spread.name}
                          </p>
                          <p id={`spread-odds-${spread.id}`}>{spread.value}</p>
                        </div>
                      ))}
                  </div>
                  {/* Totals */}
                  <div className="col-span-1 grid gap-4">
                    {game.bettingBoard.Totals &&
                      game.bettingBoard.Totals.map((total, totalIndex) => (
                        <div
                          key={totalIndex}
                          className="border-2 rounded-lg text-center p-2"
                          data-bet-id={total.id}
                        >
                          {/* <p id={`total-name-${total.id}`}>{total.name}</p> */}
                          <p id={`total-resultName-${total.id}`}>
                            {total.name}
                          </p>
                          <p id={`total-odds-${total.id}`}>{total.value}</p>
                        </div>
                      ))}
                  </div>
                  {/*Money */}
                  <div className="col-span-1 grid gap-4">
                    {game?.bettingBoard["Money Line"]?.map(
                      (moneyLine, moneyLineIndex) => (
                        <div
                          key={moneyLineIndex}
                          className="border-2 rounded-lg text-center p-2"
                          data-bet-id={moneyLine.id}
                        >
                          <p id={`moneyline-odds-${moneyLine.id}`}>
                            {moneyLine.value}
                          </p>
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

export default NBA;
