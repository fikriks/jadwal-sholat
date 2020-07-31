function main() {
    const getData = (kota) => {
        fetch(`https://api.pray.zone/v2/times/this_month.json?city=${kota}`)
            .then((response) => {
                document.querySelector('#loader').style.display = 'block';
                return response.json();
            })
            .then(responseJson => {
                document.querySelector('#loader').style.display = 'none';
                document.querySelector('.table-responsive').style.display = 'block';
                document.querySelector('.card').style.display = 'block';
                renderData(responseJson.results.datetime);
            })
            .catch(error => {
                document.querySelector('#loader').style.display = 'block';
                showErrorMessage(error);
            })
    };

    const showErrorMessage = (message) => {
        alert("Error " + message);
    };

    const renderData = (jadwals) => {
        const list = document.querySelector('#listData');
        list.innerHTML = '';

        jadwals.forEach((jadwal) => {
            list.innerHTML += `
            <tr>
            <td>${jadwal.date.gregorian}</td>
            <td>${jadwal.times.Imsak}</td>
            <td>${jadwal.times.Fajr}</td>
            <td>${jadwal.times.Dhuhr}</td>
            <td>${jadwal.times.Asr}</td>
            <td>${jadwal.times.Maghrib}</td>
            <td>${jadwal.times.Isha}</td>
            </tr>
            `;
        });

        document.getElementById('Imsak').innerHTML = jadwals[0].times.Imsak;
        document.getElementById('Fajr').innerHTML = jadwals[0].times.Fajr;
        document.getElementById('Dhuhr').innerHTML = jadwals[0].times.Dhuhr;
        document.getElementById('Asr').innerHTML = jadwals[0].times.Asr;
        document.getElementById('Maghrib').innerHTML = jadwals[0].times.Maghrib;
        document.getElementById('Isha').innerHTML = jadwals[0].times.Isha;
    };

    document.addEventListener('DOMContentLoaded', () => {
        const moment = require('moment');
        moment.locale('id');
        let date = null;
        let update = function () {
            date = moment(new Date());
            document.getElementById('prayer_date').innerHTML = `${date}`;
        };

        document.querySelector('#loader').style.display = 'none';
        document.querySelector('.table-responsive').style.display = 'none';
        document.querySelector('.card').style.display = 'none';

        document.querySelector('.btn').addEventListener('click', function (e) {
            let val = document.querySelector('#search').value;
            getData(val);
            update();
            setInterval(update, 1000);
        });
    });
}

export default main;