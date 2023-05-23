import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// want to set datakeys for chart to exercise and reps
// will have seperate data structures for all data and graph data
// will filter graph data based off exercise and reps selected by graph data
// filter on y axis set
// reset y axis vals on x axis set

export default function LineGraph() {
  const _id = useLocation().state.id;
  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [xValueOptions, setXValueOptions] = useState([]);
  const [yValueOptions, setYValueOptions] = useState([]);

  const filterGraph = (exercise, reps) => {
    setGraphData(
      data.filter((entry) => entry.exercise === exercise && entry.reps === reps)
    );

    console.log(graphData);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/exercises", {
        params: { id: _id },
      });

      const jsonData = response.data;
      setData(jsonData);

      // ideal data is array of objects
      // [{xaxis: {y val options:[yval]}}]
      const firstExericse = jsonData[0].exercise;
      const firstReps = jsonData[0].reps;

      filterGraph(firstExericse, firstReps);

      if (jsonData.length > 0) {
        const firstDataItem = jsonData[0];
        setYValueOptions(Object.keys(firstDataItem));
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(data);
  }, []);

  const handleXAxisChange = (event) => {
    // Set x-axis accordingly, set y axis to first option and setyoptions accordingly

    const selectedXAxis = event.target.value;
    const first = data.find(selectedXAxis);
    setGraphData(
      data.filter(
        (entry) => entry.exercise === selectedXAxis && entry.reps === first.reps
      )
    );
    setXAxis(selectedXAxis);

    // Set x-axis accordingly, setyoptions accordingly, and set y axis to first option
    if (selectedXAxis) {
      setYValueOptions(graphData.map((entry) => entry.reps));
    } else {
      setYValueOptions([]);
    }

    // Reset y-axis selection
    setYAxis("");
  };

  const handleYAxisChange = (event) => {
    setYAxis(event.target.value);
  };

  return (
    <div>
      <FormControl>
        <InputLabel id="xAxis-label">X Axis:</InputLabel>
        <Select
          labelId="xAxis-label"
          id="xAxis"
          value={xAxis}
          onChange={handleXAxisChange}
        >
          <MenuItem value="">Select X Axis</MenuItem>
          {/* Render options based on available data keys */}
          {Object.keys(data[0] || {}).map((key) => (
            <MenuItem key={key} value={key}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel id="yAxis-label">Y Axis:</InputLabel>
        <Select
          labelId="yAxis-label"
          id="yAxis"
          value={yAxis}
          onChange={handleYAxisChange}
          disabled={!xAxis || !yValueOptions.length}
        >
          <MenuItem value="">Select Y Axis</MenuItem>
          {/* Render options based on available y-axis values */}
          {yValueOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Render the line graph using the selected x and y axes */}
      {xAxis && yAxis && (
        <LineChart width={600} height={400} data={graphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={"date"} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={"weight"} stroke="#8884d8" />
        </LineChart>
      )}
    </div>
  );
}
