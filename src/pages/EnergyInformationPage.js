import { Helmet } from 'react-helmet-async';
import React, {useEffect, useState} from "react";
// @mui
import { useTheme } from '@mui/material/styles';
import {Grid, Container, Typography} from '@mui/material';
// components
// sections
import InformationCurrentConsumeBarChart from "../sections/@dashboard/information/InformationCurrentConsumeBarChart";
import InformationCompareChart from "../sections/@dashboard/information/InformationCompareChart";
import AnalysisConsumeMeasurementsChart from "../sections/@dashboard/analysis/AnalysisConsumeMeasurementsChart";
// services
import {getAllConsumeEnergyGermany} from "../services/ConsumeEnergyGermanyServices";
import {getAllEnergyConsumeCityHome} from "../services/EnergyConsumeCityHomeServices";
import {getAllEnergyConsumeCityCO2} from "../services/EnergyConsumeCityCO2Services";
import {getAllEnergyConsumeCityTotal} from "../services/EnergyConsumeCityTotalServices";
import InformationCurrentPricesChart from "../sections/@dashboard/information/InformationCurrentPricesChart";
import {getAllEnergyPriceGermany} from "../services/EnergyPriceGermanyServices";
import InformationCurrentPriceGermanyCard from "../sections/@dashboard/information/InformationCurrentPriceGermanyCard";
// ----------------------------------------------------------------------

export default function EnergyInformationPage() {

    const [consumeGermanyStates, setConsumeGermanyStates] = useState([])
    const [consumeGermanyStatesData, setConsumeGermanyStatesData] = useState([]);

    const [consumeCityCO2, setConsumeCityCO2] = useState([])
    const [consumeCityCO2Data, setConsumeCityCO2Data] = useState([]);
    const [consumeCityCO2TimeData, setConsumeCityCO2TimeData] = useState([]);

    const [consumeCity, setConsumeCityHome] = useState([])
    const [consumeCityHomeData, setConsumeCityHomeData] = useState([]);
    const [consumeCityHomeTimeData, setConsumeCityHomeTimeData] = useState([]);

    const [consumeCityTotal, setConsumeCityTotal] = useState([])
    const [consumeCityTotalData, setConsumeCityTotalData] = useState([]);
    const [consumeCityTotalTimeData, setConsumeCityTotalTimeData] = useState([]);


    const [priceEnergyGermany, setPriceEnergyGermany] = useState([])
    const [priceEnergyGermanyData, setPriceEnergyGermanyData] = useState([]);
    const [priceEnergyGermanyTimeData, setPriceEnergyGermanyTimeData] = useState([]);

    const theme = useTheme();
    const dayOfYear = new Date().toString();

    useEffect(() => {

        getAllConsumeEnergyGermany()
            .then(consumeGermanyStates => {
                setConsumeGermanyStates(consumeGermanyStates);
                const consumeGermanyStatesSelected = consumeGermanyStates.map(consume => ({
                        label: consume.state_ceg,
                        value: consume.consume_kw_ceg
                    })
                );
                setConsumeGermanyStatesData(consumeGermanyStatesSelected);
            });

        getAllEnergyConsumeCityCO2()
            .then(energyConsumeCityCO2 => {
                setConsumeCityCO2(energyConsumeCityCO2);
                const consumeCityCO2DataValue = energyConsumeCityCO2.map(consume => consume.consume_energy_consume_city_co2);
                const consumeCityCO2Time = energyConsumeCityCO2.map(consume => consume.year_energy_consume_city_co2);
                setConsumeCityCO2Data(consumeCityCO2DataValue);
                setConsumeCityCO2TimeData(consumeCityCO2Time);
            });

        getAllEnergyConsumeCityHome()
            .then(energyConsumeCityHome => {
                setConsumeCityHome(energyConsumeCityHome);
                const consumeCityHomeDataValue = energyConsumeCityHome.map(consume => consume.consume_energy_consume_city_home);
                const consumeCityHomeTime = energyConsumeCityHome.map(consume => consume.year_energy_consume_city_home);
                setConsumeCityHomeData(consumeCityHomeDataValue);
                setConsumeCityHomeTimeData(consumeCityHomeTime);
            });

        getAllEnergyConsumeCityTotal()
            .then(energyConsumeTotalCity => {
                setConsumeCityTotal(energyConsumeTotalCity);
                const consumeCityTotalDataValue = energyConsumeTotalCity.map(consume => consume.consume_energy_consume_city_total);
                const consumeCityTotalTime = energyConsumeTotalCity.map(consume => consume.year_energy_consume_city_total);
                setConsumeCityTotalData(consumeCityTotalDataValue);
                setConsumeCityTotalTimeData(consumeCityTotalTime);
            });

        getAllEnergyPriceGermany()
            .then(priceEnergyGermany => {
                setPriceEnergyGermany(priceEnergyGermany);
                const priceEnergyGermanyDataValue = priceEnergyGermany.map(price=> price.price_energy_price_germany);
                const priceEnergyGermanyTime = priceEnergyGermany.map(price=> price.date_energy_price_germany);
                setPriceEnergyGermanyData(priceEnergyGermanyDataValue);
                setPriceEnergyGermanyTimeData(priceEnergyGermanyTime);
            });

        },[]
    )
    return (
        <>
            <Helmet>
                <title> Information </title>
            </Helmet>

            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Informationen zu energiewirtschaftlichen Themen in Deutschland
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={12}>
                        <InformationCurrentPriceGermanyCard/>
                    </Grid>


                    <Grid item xs={12} md={12} lg={12}>
                        <InformationCurrentPricesChart
                            title="Strompreisentwicklung 2010 bis 2023"
                            subheader="Der Strompreis in den letzten 10 Jahren (zwischen 2010 und 2020) ist – bis auf kleine Ausreißer 2013, 2015 und 2016 – kontinuierlich gestiegen. Lag er 2010 noch bei durchschnittlich 23,69 ct/kWh (Haushalt mit einem Jahresverbrauch von 3.500 kWh), liegt er zu Beginn des Jahres 2020 bereits bei 31,37 ct/kWh. Das ist eine Preissteigerung von mehr als 30 % innerhalb von 10 Jahren. (Quelle: BDEW, Stand 07/2022)"
                            chartLabels={priceEnergyGermanyTimeData}
                            chartData={[
                                {
                                    name: '',
                                    type: 'area',
                                    fill: 'gradient',
                                    data: priceEnergyGermanyData,

                                },
                            ]}
                        />
                    </Grid>


                    <Grid item xs={12} md={12} lg={12}>
                        <InformationCurrentConsumeBarChart
                            title="Stromverbrauch pro Kopf in Kilowattstunden in den Bundesländern"
                            subheader="Die Daten zum Stromverbrauch basieren auf dem aktuellen Stromspiegel für Deutschland.
                            Dafür wurden die Verbrauchsdaten von 360.000 Haushalten ausgewertet.
                            Der Stromspiegel wird vom Bundesministerium für Wirtschaft und Klimaschutz gefördert.
                            Im bundesweiten Vergleich von Stromverbrauch und Preisen gibt es erhebliche Unterschiede von bis zu 27 Prozent.
                            Entsprechend unterschiedlich ist auch das Sparpotenzial. Fest steht: Haushalte sollten Verbrauch und Tarifwechsel prüfen."
                            chartData={consumeGermanyStatesData}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <AnalysisConsumeMeasurementsChart
                            title="Energieverbauch in Osnabrück pro Haushalt im Durchschnitt"
                            subheader="Der Gesamtenergieverbrauch ist in Osnabrück zwischen 1990 und 2012 um fast 20 % zurückgegangen."
                            chartLabels={consumeCityHomeTimeData}
                            chartData={[
                                {
                                    name: '',
                                    type: 'area',
                                    fill: 'gradient',
                                    data: consumeCityHomeData,

                                },
                            ]}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <AnalysisConsumeMeasurementsChart
                            title="Entwicklung der CO2-Emissionen in Osnabrück"
                            subheader="Im Jahr 2012 rund 400.000 t CO2 pro Jahr weniger als  im Jahr 1990. Dies entspricht einem Rückgang von 19,4 %"
                            chartLabels={consumeCityCO2TimeData}
                            chartData={[
                                {
                                    name: '',
                                    type: 'area',
                                    fill: 'gradient',
                                    data: consumeCityCO2Data,

                                },
                            ]}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <AnalysisConsumeMeasurementsChart
                            title="Entwicklung des Energieverbrauches in Osnabrück"
                            subheader="Der Gesamtenergieverbrauch ist in Osnabrück zwischen 1990 und 2012 um fast 13 % zurückgegangen."
                            chartLabels={consumeCityTotalTimeData}
                            chartData={[
                                {
                                    name: '',
                                    type: 'area',
                                    fill: 'gradient',
                                    data: consumeCityTotalData,

                                },
                            ]}
                        />
                    </Grid>

                </Grid>
            </Container>
        </>
    );
}
