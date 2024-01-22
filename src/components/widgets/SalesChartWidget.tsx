import { useTranslation } from "react-i18next";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
  
  ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
  );


import { Bar, Line } from 'react-chartjs-2';
import faker from 'faker';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../core/store/store";
import { changeChartLabels, changeChartMeasure, changeChartRange } from "../../core/store/appSettingsSlice";

ChartJS.register(
// CategoryScale,
LinearScale,
PointElement,
LineElement,
BarElement,
// Title,
// Tooltip,
// Legend
);

export const SalesChartWidget = () => {
	const { t } = useTranslation();
	const [activeFirstButton, setActiveFirstButton] = useState("line");
	const [activeSecondButton, setActiveSecondButton] = useState("turnover");
	const [activeThirdButton, setActiveThirdButton] = useState("day");	
	const [isPrevious, setIsPrevious] = useState(false);
	const theme = useSelector((state: RootState) => state.globalSettings.theme);
	const chart = useSelector((state: RootState) => state.globalSettings.chart);
	const lang = useSelector((state: RootState) => state.globalSettings.lang);
	const dispatch = useDispatch();

	const turnoverData = [1200, 700, 900, 650, 1120, 400, 890, 1400, 1600, 1000, 530, 720, 1300, 500, 1900, 1270, 460, 800, 1190, 1500, 1230, 600, 1530, 1720];
	const soldData = [110, 60, 81, 55, 106, 39, 84, 142, 163, 97, 56, 71, 124, 47, 189, 112, 45, 76, 109, 167, 123, 52, 170, 182];

	const optionsLine = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
				position: 'top' as const,	
			},
			title: {
				display: false,
			},
		},
	};

	const optionsBar = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
				position: 'top' as const,
			},
			title: {
				display: false,
			},
		},
	};	
	// const [usedData, setUsedData] = useState(turnoverData);

	const data1 = {
		labels: chart.labels,
		datasets: [
			{
				data: activeThirdButton === 'day' ? turnoverData.map((res)=> res/30) : activeThirdButton === "week" ? turnoverData.map((res)=> res/4) : turnoverData,
				borderColor: '#5a57ff',
				backgroundColor: chart.labels.map(() => ('#5a57ff')),
				pointBackgroundColor: chart.labels.map(() => ('#5a57ff')),
				pointRadius: 3,
			},
		],
	};
	const data2 = {
		labels: chart.labels,
		datasets: [
			{
				data: activeThirdButton === 'day' ? soldData.map((res)=> res/30) : activeThirdButton === "week" ? soldData.map((res)=> res/4) : soldData,
				borderColor: '#5a57ff',
				backgroundColor: chart.labels.map(() => ('#5a57ff')),
				pointBackgroundColor: chart.labels.map(() => ('#5a57ff')),
				pointRadius: 3,
			},
		],
	};

	const data3 = {
		labels: chart.labels,
		datasets: [
			{
				data: activeThirdButton === 'day' ? turnoverData.map((res)=> res/30) : activeThirdButton === "week" ? turnoverData.map((res)=> res/4) : turnoverData,
				borderColor: '#5a57ff',
				backgroundColor: chart.labels.map((value, index, array) => (index === array.length - 1 ? '#9993FF' : '#5a57ff')),
				pointBackgroundColor: chart.labels.map((value, index, array) => (index === array.length - 1 ? '#9993FF' : '#5a57ff')),
				pointRadius: chart.labels.map((value, index, array) => (index === array.length - 1 ? 8 : 3)),
			},
			{
				data: activeThirdButton === 'day' ? turnoverData.map((res)=> res/50) : activeThirdButton === "week" ? turnoverData.map((res)=> res/7) : turnoverData.map((res)=> res/3),
				borderColor: 'red',
				backgroundColor: 'red',				
			},
		],
	}

	const data4 = {
		labels: chart.labels,
		datasets: [
			{
				data: activeThirdButton === 'day' ? soldData.map((res)=> res/30) : activeThirdButton === "week" ? soldData.map((res)=> res/4) : soldData,
				borderColor: '#5a57ff',
				backgroundColor: chart.labels.map((value, index, array) => (index === array.length - 1 ? '#9993FF' : '#5a57ff')),
				pointBackgroundColor: chart.labels.map((value, index, array) => (index === array.length - 1 ? '#9993FF' : '#5a57ff')),
				pointRadius: chart.labels.map((value, index, array) => (index === array.length - 1 ? 8 : 3)),
			},
			{
				data: activeThirdButton === 'day' ? soldData.map((res)=> res/50) : activeThirdButton === "week" ? soldData.map((res)=> res/7) : soldData.map((res)=> res/3),
				borderColor: 'red',
				backgroundColor: 'red',
			},
		],
	}
	const [data, setData] = useState(data1);
	const changeLabels = (type: string) => {
		dispatch(changeChartLabels(type));
	}

	const handleFirstChange = (type: string) => {
		setActiveFirstButton(type);
	};
	const handleSecondChange = (measure: string) => {
		setActiveSecondButton(measure);
		dispatch(changeChartMeasure(measure));
	};
	const handleThirdChange = (range: string) => {
		setActiveThirdButton(range);
		changeLabels(range);
	};
	const changeIsPrevious = ()=> {
		setIsPrevious(!isPrevious);
	}

	useEffect(() => {
		dispatch(changeChartLabels(activeThirdButton));
		setData(chart.measure == "turnover" ? !isPrevious ? data1 : data3 : !isPrevious ? data2 : data4);
	}, [chart.labels, chart.measure, lang, isPrevious]);
	
	return <div className="card chart">
		<h1 className="card__title">{t("Chart")}</h1>
		<div className="flex">
			<div className="flex flex-col items-center w-[35%]">
				<label>{t("ChartType")}</label>
				<div>
					<button
						className={`left ranking__button ${theme === "dark" ? activeFirstButton === 'line' ? 'active__ranking__button' : "bg-[#353535]" : activeFirstButton === 'line' ? 'active__ranking__button' : ""} transition duration-300 ease-linear`}
						onClick={() => handleFirstChange("line")}
					>
						📈
					</button>
					<button
						className={`right ranking__button ${theme === "dark" ? activeFirstButton === 'col' ? 'active__ranking__button' : "bg-[#353535]" : activeFirstButton === 'col' ? 'active__ranking__button' : ""} transition duration-300 ease-linear`}
						onClick={() => handleFirstChange("col")}
					>
						📊
					</button>
				</div>
				<label>{t("Measure")}</label>
				<div>
					<button
						className={`left ranking__button ${theme === "dark" ? activeSecondButton === 'turnover' ? 'active__ranking__button' : "bg-[#353535]" : activeSecondButton === 'turnover' ? 'active__ranking__button' : ""} transition duration-300 ease-linear`}
						onClick={() => handleSecondChange("turnover")}
					>
						{t("ChartTurnover")}
					</button>
					<button
						className={`right ranking__button ${theme === "dark" ? activeSecondButton === 'sold' ? 'active__ranking__button' : "bg-[#353535]" : activeSecondButton === 'sold' ? 'active__ranking__button' : ""} transition duration-300 ease-linear`}
						onClick={() => handleSecondChange("sold")}
					>
						{t("ChartSold")}
					</button>
				</div>				
				<label>{t("Range")}</label>
				<div>
					<button
						className={`left ranking__button ${theme === "dark" ? activeThirdButton === 'day' ? 'active__ranking__button' : "bg-[#353535]" : activeThirdButton === 'day' ? 'active__ranking__button' : ""} transition duration-300 ease-linear`}
						onClick={() => handleThirdChange("day")}
					>
						{t("Today")}
					</button>
					<button
						className={`ranking__button ${theme === "dark" ? activeThirdButton === 'week' ? 'active__ranking__button' : "bg-[#353535]" : activeThirdButton === 'week' ? 'active__ranking__button' : ""} transition duration-300 ease-linear`}
						onClick={() => handleThirdChange("week")}
					>
						{t("Week")}
					</button>
					<button
						className={`right ranking__button ${theme === "dark" ? activeThirdButton === 'month' ? 'active__ranking__button' : "bg-[#353535]" : activeThirdButton === 'month' ? 'active__ranking__button' : ""} transition duration-300 ease-linear`}
						onClick={() => handleThirdChange("month")}
					>
						{t("Month")}
					</button>
				</div>				
				<span>
					<label className="m-2">{t("ShowPreviousSeries")}</label>
					<input className="rounded" type="checkbox" onClick={() => changeIsPrevious()}/>
				</span>
			</div>
			<div className="w-[65%]">
				{
					activeFirstButton === 'line' ? <><Line options={optionsLine} data={data} /></> : <Bar options={optionsBar} data={data} />
				}				
			</div>
		</div>
	</div>
};
