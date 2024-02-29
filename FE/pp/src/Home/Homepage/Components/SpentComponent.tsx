import { Box, Typography, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import {
  getCircleColorForSavings,
  getCircleColorForSpent,
} from "./Component.utility";
import {
  AccountBalance,
  AccountBalanceWallet,
  LocalAtm,
  Sell,
} from "@mui/icons-material";
import React from "react";
import { BASE_URL } from "../../../constants";

export const SpentComponent = () => {
  const formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const circleStyle: React.CSSProperties = {
    // border: "2px solid black",
    backgroundColor: "white",
    padding: "2.5rem",
    margin: "2rem 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "2rem",
    width: "15rem",
    boxShadow:
      "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
  };
  type maxamounttype = {
    key: string;
    value: number;
  };
  const reset = { key: "", value: 0 };

  const [TotalAmount, setTotalAmount] = useState(0);
  const [TotalSpent, setTotalSpent] = useState(0);
  const [MaxAmount, setMaxAmount] = useState<maxamounttype>(reset);
  const [Savings, setSavings] = useState(0);

  const fetchSpent = async () => {
    const jwt_token = localStorage.getItem("jwt_token");
    try {
      const response = await axios.get(
        `${BASE_URL}/fetchCurrentMonthRecord`,
        {
          headers: {
            Authorization: `${jwt_token}`,
          },
        }
      );
      let responseData = response.data;
      const currentDate = new Date();
      const currentMonth = currentDate.toLocaleString("default", {
        month: "long",
      });
      const currentYear = currentDate.getFullYear();
      const currentMonthKey = `${currentMonth} ${currentYear}`;
      //   setThisMonth(currentMonthKey);
      const currentMonthData = responseData[currentMonthKey];
      console.log(currentMonthData["Savings"]);
      setSavings(currentMonthData["Savings"]);
      let max_value: number = 0;
      let max_spent: maxamounttype = { key: "", value: 0 };
      let total_amount: number = 0;
      for (const key in currentMonthData) {
        total_amount += currentMonthData[key];
        if (key !== "Savings") {
          max_value += currentMonthData[key];
        }
        if (key !== "Savings" && currentMonthData[key] > max_spent.value) {
          max_spent = { key, value: currentMonthData[key] };
        }
      }
      setTotalAmount(total_amount);
      setTotalSpent(max_value);
      setMaxAmount(max_spent);
      console.log("Total amount: ", total_amount);
      console.log("Maximum amount", max_value);
    } catch (error) {
      console.log(error);
    }
  };

  const count: number = TotalSpent;
  const percentage = (count / TotalAmount) * 100;
  const savings: number = Savings;
  const savingspercent = (savings / TotalAmount) * 100;
  const HighestSpent: number = MaxAmount["value"];
  const HighestSpentPercent = (HighestSpent / TotalAmount) * 100;
  const customStyles = {
    path: {
      stroke: getCircleColorForSpent(percentage),
    },
    text: {
      fill: "#000",
      fontSize: "0.6rem",
    },
  };

  const customStyles1 = {
    path: {
      stroke: getCircleColorForSavings(savingspercent),
    },
    text: {
      fill: "#000",
      fontSize: "0.6rem",
    },
  };

  const customStyles2 = {
    path: {
      stroke: getCircleColorForSpent(HighestSpentPercent),
    },
    text: {
      fill: "#000",
      fontSize: "0.6rem",
    },
  };

  console.log(HighestSpent, HighestSpentPercent);

  useEffect(() => {
    fetchSpent();
  }, [TotalAmount]);
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography
        sx={{ textAlign: "left", marginLeft: "3%", fontWeight: "bold" }}
        variant="h4"
      >
        Spent Analysis
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          padding: "2rem",
        }}
      >
        <div style={circleStyle}>
          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
          >
            <Box sx={{ marginRight: "5px" }}>
              <LocalAtm sx={{ fontSize: "2rem" }} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Spents
              </Typography>
            </Box>
          </Box>
          <CircularProgressbar
            value={percentage}
            text={`₹ ${formatter.format(count).slice(1)}`}
            styles={customStyles}
          />
        </div>
        <div style={circleStyle}>
          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
          >
            <Box sx={{ marginRight: "5px" }}>
              <AccountBalanceWallet sx={{ fontSize: "2rem" }} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Balance
              </Typography>
            </Box>
          </Box>
          <CircularProgressbar
            value={savingspercent}
            text={`₹ ${formatter.format(savings).slice(1)}`}
            styles={customStyles1}
          />
        </div>
        <div style={circleStyle}>
          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
          >
            <Box sx={{ marginRight: "5px" }}>
              <Sell sx={{ fontSize: "2rem" }} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Highest Spent
              </Typography>
            </Box>
          </Box>
          <CircularProgressbar
            value={HighestSpentPercent}
            text={`₹${formatter.format(HighestSpent).slice(1)}`}
            styles={customStyles2}
          />
        </div>
      </Box>
    </Box>
  );
};
