import React, {useEffect, useState} from 'react';
import axios from 'axios';
import clsx from "clsx";
import styles from './Home.module.css';

function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const response = await axios.get('http://api.weatherapi.com/v1/forecast.json?key=698dc13c77094cf187695058201212&q=London&days=1');
      setData(response.data);
    })()
  }, []);

  return data && (
    <div className={styles.home}>
      <div className={styles.weatherPanel}>
        <div className={styles.weatherPanelHeader}>
          <div className={styles.weatherPanelHeaderLeft}>
            <h3 className={styles.weatherPanelHeaderTitle}>{data.location.country}</h3>
            <strong>{data.location.name}</strong>
            <div>{data.location.localtime}</div>
          </div>
          <div>
            <img alt='condition' src={data.current.condition.icon} />
            <div>{data.current.condition.text}</div>
          </div>
        </div>
        <div className={styles.weatherPanelContent}>
          {data.forecast.forecastday[0].hour.map((item, index) => (
              <div key={index} className={clsx(styles.weatherPanelItem, {
                [styles.weatherPanelItemActive]: parseInt(item.time.split(' ')[1].substring(0, 2)) === new Date().getHours()
              })}>
                <img alt='condition' src={item.condition.icon} />
                <div>{item.condition.text}</div>
                <div>{item.time.split(' ')[1]}</div>
                <strong>{item.temp_f}</strong>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
