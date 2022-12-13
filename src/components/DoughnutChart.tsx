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
        backgroundColor: ["red", "blue"],
      },
    ],
    labels: ["Errors", "Total"],
  };

  return (
    <div className="DoughnutChart" style={{ width: "30%", height: "30%" }}>
      <Doughnut data={doughnutData} />
    </div>
  );
};

export default DoughnutChart;
