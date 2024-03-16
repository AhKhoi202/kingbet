import React, { useState, useEffect, useRef } from "react";

const KingBet = () => {
  const [data, setData] = useState();
  const [specificSpread, setSpecificSpread] = useState(null);
  const [specificTotals, setSpecificTotals] = useState(null);
  const wsUrl = `ws://123.27.3.32:8765/kingsbet/live?token=96602715-cb62-4fe2-ae00-040a40b28995`;
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      ws.current.send("something");
    };

    ws.current.onmessage = (event) => {
      const jsonData = JSON.parse(event.data);
      setData(jsonData?.payload?.game);

      // Logic mới để tìm và thiết lập mục cụ thể
      const Spread = jsonData?.payload?.game?.results?.find(
        (result) => result.id === -1174994997
      );
      if (Spread) {
        setSpecificSpread(Spread);
      }
      const Totals = jsonData?.payload?.game?.results?.find(
        (result) => result.id === -1174994862
      );
      if (Totals) {
        setSpecificTotals(Totals);
      }
    };

    ws.current.onerror = (error) => {
      console.error("Lỗi WebSocket:", error);
    };

    ws.current.onclose = () => {
      console.log("Đóng kết nối WebSocket");
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);
  console.log(data);
  console.log(specificSpread);
  return (
    <div className="w-4/5 mx-auto pt-8 bg-white h-screen">
      {specificSpread ? (
        <div>
          <div>Tên: {specificSpread.name.value}</div>
          <div>Tỷ lệ cược: {specificSpread.odds}</div>
          {/* Hiển thị các trường khác nếu cần */}
        </div>
      ) : (
        <div>Không tìm thấy mục cụ thể</div>
      )}
      {specificTotals ? (
        <div>
          <div>Tên: {specificTotals.name.value}</div>
          <div>Tỷ lệ cược: {specificTotals.odds}</div>
          {/* Hiển thị các trường khác nếu cần */}
        </div>
      ) : (
        <div>Không tìm thấy mục cụ thể</div>
      )}
    </div>
  );
};

export default KingBet;
