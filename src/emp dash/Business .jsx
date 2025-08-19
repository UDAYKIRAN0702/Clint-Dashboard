import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer
} from "recharts";

function Business() {
  const lineData = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 9900 },
    { month: "Mar", sales: 5000 },
    { month: "Apr", sales: 4000 },
    { month: "May", sales: 6000 },
    { month: "Jun", sales: 8000 },
    { month: "Jul", sales: 7000 },
    { month: "Aug", sales: 2000 },
    { month: "Sep", sales: 1000 },
    { month: "Oct", sales: 4000 },
    { month: "Nov", sales: 7000 },
    { month: "Dec", sales: 9000 },

  ];

  const pieData = [
    { name: "CRM", value: 400 },
    { name: "HMS", value: 300 },
    { name: "Billing", value: 700 },
    { name: "EMS", value: 200 },
    {name:"Other",value:50}
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28","rgba(251, 17, 255, 1)","#f70202ff"];

  const barData = [
    { name: "CRM", revenue: 2400, profit: 1400 },
    { name: "HMS", revenue: 4567, profit: 2000 },
    { name: "Billing", revenue: 11398, profit: 11980 },
    { name: "EMS", revenue: 9800, profit: 3908 },
    { name:"Other",revenue:1200,profit:1300 }
  ];

  return (
    <div className="business-dashboard">
      <h2 className="dashboard-title">📊 Business Dashboard</h2>

      <div className="chart-grid">
        {/* Line Chart */}
        <div className="chart-card">
          <h1 className="chart-title">Sales Over Time</h1>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="chart-card">
          <h1 className="chart-title">Product Share</h1>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="chart-card">
          <h1 className="chart-title">Quarterly Performance</h1>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#82ca9d" />
              <Bar dataKey="profit" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Business;
