import dynamic from "next/dynamic";
import { useEffect } from "react";
import styles from "./graphs.module.scss";

const Chart = dynamic(() => import('react-apexcharts'), {ssr: false})

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: "#999",
  },
  grid: {
    show: false
  },
  tooltip: {
    enabled: true,
    followCursor: true,
    shared: false,
    intersect: false,
    fillSeriesColor: true,
    theme: "dark",
    style: {
      fontSize: '12px',
      fontFamily: undefined,
      color: "#000000"
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    type: "numeric" as "numeric",
    axisBorder: {
      color: "#999"
    },
    axisTicks: {
      color: "#999"
    }
  },
  fill: {
    opacity: .3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: .7,
      opacityTo: .3
    }
  }
};

type GraphsProps = {
  title: string;
  name: string;
  data: number[];
}


export function Graphs({title, name, data}: GraphsProps) {


  const series = [
    {name, data}
  ]

  return (
    <div className={styles.main}>
      
      <div className={styles.chart}>
        <h3>{title}</h3>
        <Chart
          options={options}
          series={series}
          type="area"
          width="100%"
          height="100%"
        /> 
      </div>
    </div>
  )
}