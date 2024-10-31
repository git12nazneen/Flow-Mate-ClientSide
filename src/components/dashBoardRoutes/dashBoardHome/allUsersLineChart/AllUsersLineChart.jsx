import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Custom dot to highlight paid users
const CustomDot = (props) => {
  const { cx, cy, payload } = props;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={6}
      fill={payload.paid ? "green" : "steelblue"}
      stroke="none"
    />
  );
};

// Custom Tooltip to show data with more context
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "white",
          padding: "5px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          
        }}
      >
        <p>{`Month: ${payload[0].payload.x}`}</p>
        <p>{`Total Users: ${payload[0].payload.y}`}</p>
        <p>{`Logged Users: ${payload[0].payload.logged}`}</p>
        <p>{`Subscribed Users: ${payload[0].payload.subscribed}`}</p>
        <p
          style={{
            color: payload[0].payload.paid ? "green" : "steelblue",
          }}
        >
          {payload[0].payload.paid ? "Paid User" : "Free User"}
        </p>
      </div>
    );
  }
  return null;
};

const AllUsersLineChart = ({
  subscriptionUsers,
  paidUsers,
  loggedUsers,
}) => {
  // Use dynamic values for the data structure for all 12 months
  const data = [
    { x: "Jan", y: paidUsers, logged: loggedUsers, subscribed: subscriptionUsers, paid: true },
    { x: "Feb", y: paidUsers + 1, logged: loggedUsers + 2, subscribed: subscriptionUsers + 1, paid: true },
    { x: "Mar", y: paidUsers + 2, logged: loggedUsers + 1, subscribed: subscriptionUsers + 2, paid: false },
    { x: "Apr", y: paidUsers + 4, logged: loggedUsers + 3, subscribed: subscriptionUsers + 3, paid: true },
    { x: "May", y: paidUsers + 3, logged: loggedUsers + 2, subscribed: subscriptionUsers + 4, paid: false },
    { x: "Jun", y: paidUsers + 5, logged: loggedUsers + 4, subscribed: subscriptionUsers + 5, paid: true },
    { x: "Jul", y: paidUsers + 7, logged: loggedUsers + 6, subscribed: subscriptionUsers + 6, paid: true },
    { x: "Aug", y: paidUsers + 8, logged: loggedUsers + 5, subscribed: subscriptionUsers + 7, paid: false },
    { x: "Sep", y: paidUsers + 6, logged: loggedUsers + 3, subscribed: subscriptionUsers + 8, paid: true },
    { x: "Oct", y: paidUsers + 10, logged: loggedUsers + 7, subscribed: subscriptionUsers + 9, paid: true },
    { x: "Nov", y: paidUsers + 12, logged: loggedUsers + 9, subscribed: subscriptionUsers + 10, paid: false },
    { x: "Dec", y: paidUsers + 15, logged: loggedUsers + 10, subscribed: subscriptionUsers + 11, paid: true },
  ];

  return (
    <ResponsiveContainer width="100%" height={300} >
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="y"
          stroke="#8884d8"
          dot={<CustomDot />}
          strokeWidth={3}
        />
        <Line
          type="monotone"
          dataKey="logged"
          stroke="#82ca9d"
          strokeWidth={3}
        />
        <Line
          type="monotone"
          dataKey="subscribed"
          stroke="#ffc658"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AllUsersLineChart;
