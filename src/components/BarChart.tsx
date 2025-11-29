"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function BarChartBlock({
  title,
  data,
  keys,
  colors,
}: {
  title: string;
  data: Array<{
    date: string;
    scheduled: number;
    completed: number;
    cancelled: number;
  }>;
  keys: string[];
  colors: string[];
}) {
  return (
    <div className="bg-white shadow rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          {keys.map((k, i) => (
            <Bar key={k} dataKey={k} fill={colors[i]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
