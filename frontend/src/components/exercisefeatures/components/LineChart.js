import {
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

export default function ExerciseLineChart(props) {
  var propsCopy = JSON.parse(JSON.stringify(props));

  propsCopy.data.forEach((element) => {
    element.numdate = new Date(element.date).getTime();
  });
  propsCopy.data = propsCopy.data.sort((ent1, ent2) =>
    ent1.date < ent2.date ? -1 : ent1.date > ent2.date ? 1 : 0
  );

  var biggest = {};

  propsCopy.data.forEach((entry) => {
    if (
      biggest.hasOwnProperty(String(entry.date)) &&
      entry.weight > biggest[entry.date]
    ) {
      biggest[String(entry.date)] = entry;
    } else if (!biggest.hasOwnProperty(String(entry.date))) {
      biggest[String(entry.date)] = entry;
    }
  });

  propsCopy.data = Object.values(biggest);

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
        <Line type="monotone" dataKey="weight" unit="lbs" stroke="blue" />
      </LineChart>
    </ResponsiveContainer>
  );
}
