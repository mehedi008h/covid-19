import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let changeableUrl = url;

    if (country) {
        changeableUrl = `${url}/countries/${country}`;
      }

    try{
        const { data: { confirmed, recovered, deaths, lastUpdate}} = await axios.get(changeableUrl);

        return { confirmed,recovered,deaths,lastUpdate };
    } catch (error){
        console.log(error);
    }
}

export const fetchDailyDate = async () => {
    try{
        const { data } = await axios.get(`${url}/daily`);
        const modifieddata = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));

        return modifieddata;

    } catch (error) {
        console.log(error);
    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries }} = await axios.get('https://covid19.mathdro.id/api/countries');
        return countries.map((country) => country.name);
    } catch (error) {
        console.log(error);
    }
}