import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserData } from "../services/AccountApiService";
import "./DoughnutChart.css";
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Account from "../models/Account";

ChartJs.register(Tooltip, Title, ArcElement, Legend);

interface Dataset {
  data: number[];
  backgroundColor: string[];
  borderColor: string;
  borderWidth: number;
  animationSpeed: number;
}
interface Data {
  datasets: Dataset[];
  labels: string[];
}

const DoughnutChart = () => {
  const uid: string | undefined = useParams().uid;
  const [accountData, setAccountData] = useState<Account>();

  const getErrors = () => {
    return accountData?.scores.reduce((acc, val) => {
      return acc + val.errors;
    }, 0);
  };

  const getTotal = () => {
    return accountData?.scores.reduce((acc, val) => {
      return acc + val.total;
    }, 0);
  };

  useEffect(() => {
    getUserData(uid!).then((res) => setAccountData(res));
  }, []);
  const totalErrors = getErrors();
  const totalAttempted = getTotal();
  const doughnutData: Data = {
    datasets: [
      {
        data: [totalErrors!, totalAttempted!],
        backgroundColor: ["#facc15", "#64748b"],
        borderColor: "#bcd8c1",
        borderWidth: 2,
        animationSpeed: 1,
      },
    ],
    labels: ["Errors", "Total attempted"],
  };

  return (
    <div className="doughnutChart" style={{ width: "100%", height: "100%" }}>
      <Doughnut data={doughnutData} className="doughnut" />
    </div>
  );
};

export default DoughnutChart;
