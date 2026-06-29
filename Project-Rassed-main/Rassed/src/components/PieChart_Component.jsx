import React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

function PieChart_Component() {
  const data = [
    { label: "Groceries", value: 40, color: "#3b82f6" },
    { label: "Utilities", value: 30, color: "#22c55e" },
    { label: "Luxury", value: 30, color: "#ef4444" },
  ];

  const sizing = {
    margin: { right: 20 },
    width: 300,
    height: 200,
    // hideLegend: true,
  };

  const getArcLabel = (params) => `${params.value}%`;

  return (
    <div
      style={{
        position: "relative",
        zIndex: 0, // make sure this layer is "behind" things like headers, dialogs, etc.
      }}
    >
      <PieChart
        series={[
          {
            outerRadius: 100,
            data,
            arcLabel: getArcLabel,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontSize: 14,
          },
        }}
        {...sizing}
      />
    </div>
  );
}

export default PieChart_Component;
