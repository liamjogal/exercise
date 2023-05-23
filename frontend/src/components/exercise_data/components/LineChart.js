import {
  ScatterChart,
  Scatter,
  Label,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import moment from "moment";

import { useSelector } from "react-redux";

export default function ExerciseLineChart(props) {
  const data = [];
  var propsCopy = JSON.parse(JSON.stringify(props));
  console.log(propsCopy);

  // console.log(props);
  // props.data.forEach((element) => {
  //   data.push(element);
  // });

  propsCopy.data.forEach((element) => {
    // var date = element.date.slice(0, 10);
    // var daymonth = date.slice(5, 10);
    // var year = "-".concat(date.slice(0, 4));
    // date = daymonth.concat(year);
    // console.log(date);
    element.numdate = new Date(element.date).getTime();
  });
  console.log(propsCopy);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${moment(label).format("MM-DD-YY")} : ${
            payload[0].value + " lbs"
          }`}</p>
        </div>
      );
    }
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart width={500} height={300} data={propsCopy.data}>
        <XAxis
          type="date"
          dataKey="numdate"
          name="date"
          scale="time"
          hasTick
          tickFormatter={(unixTime) => moment(unixTime).format("MM-DD-YY")}
        >
          <Label value="Date" position="bottom" />
        </XAxis>
        <YAxis>
          <Label value="Weight (lbs)" angle={-90} position="insideLeft" />
        </YAxis>
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ strokeDasharray: "3 3" }}
        />
        <CartesianGrid />
        <Line type="monotone" dataKey="weight" unit="lbs" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}
