import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
import { useChart } from '../../../components/chart';

// ----------------------------------------------------------------------

AppSavingsChart.propTypes = {
    title: PropTypes.string,
    subheader: PropTypes.string,
    chartData: PropTypes.array.isRequired,
    chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function AppSavingsChart({ title, subheader, chartLabels, chartData, ...other }) {
    const chartOptions = useChart({
        plotOptions: { bar: { columnWidth: '16%' } },
        fill: { type: chartData.map((i) => i.fill) },
        labels: chartLabels,
        xaxis: { type: 'datetime' },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: (y) => {
                    if (typeof y !== 'undefined') {
                        return `${y.toFixed(0)} Kw`;
                    }
                    return y;
                },
            },
        },
    });

    return (
        <Card {...other}>
            <CardHeader title={title} subheader={subheader} />

            <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />
            </Box>
        </Card>
    );
}