import {
Chart as ChartJS,
ArcElement,
Tooltip,
Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function StatsChart({ stats }) {

const pendientes = stats.turnos_pendientes || 0;
const confirmados = stats.turnos_confirmados || 0;

if (pendientes === 0 && confirmados === 0) {
return (
<div className="card">
<p style={{ textAlign: "center" }}>
📊 Aún no hay suficientes datos para el gráfico
</p>
</div>
);

}

const data = {
labels: ["Pendientes", "Confirmados"],
datasets: [
{
label: "Turnos",
data: [pendientes, confirmados],
backgroundColor: [
"rgb(255, 205, 86)",
"rgb(75, 192, 192)"
],
borderWidth: 1
}
]
};

return (

  <div className="chart-container">

  <Pie
    data={data}
    options={{
      maintainAspectRatio: false
    }}
  />

  </div>

);

}

export default StatsChart;
