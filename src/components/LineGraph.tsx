import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
  } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { useContext } from "react";
ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
  );

  import { MovieContext, MovieContextType } from '../providers/MovieProvider';
  import { MovieType } from '../models/Movietype.types';

const LineGraph = () => {

    const {movies}  = useContext(MovieContext) as MovieContextType;

    const labels = movies?.map((movie:MovieType)=> movie.title)

    const data = {
        labels,
        datasets: [
            {
                type: "line" as const,
                label: "Vote Count",
                borderColor: "rgb(255, 99, 132)",
                borderWidth: 2,
                fill: false,
                data: movies?.map((movie:MovieType)=> movie.vote_count),
                yAxisID: 'y-axis-1', 
            },
            {
                type: "bar" as const,
                label: "Average Rating",
                backgroundColor: "rgb(75, 192, 192)",
                data: movies?.map((movie:MovieType)=> movie.vote_average),
                borderWidth: 2,
                borderColor: "white",
                yAxisID: 'y-axis-2', 

            }
        ]
    }

    return (
        <Chart type="bar" data={data} />
    );
};

export default LineGraph;