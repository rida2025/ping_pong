import React from 'react'
import styl from './Tmp1.module.css'
import { FaRankingStar } from "react-icons/fa6";
import { FaChartArea } from "react-icons/fa";
import CurveChart from '../CurveChart/CurveChart';
import CurveLevel from '../CurveLevel/CurveLevel';
import userImage from '../../assets/nouahidi.jpeg'
import CardRank from '../CardRank/CardRank';

const Tmp1 = () => {
    const total = 15 + 10;
    const winPercentage = (15 / total) * 100;
    const lossPercentage = (10 / total) * 100;
    const data = [
        { time: 'Jan', wins: 5, losses: 3 },
        { time: 'Feb', wins: 8, losses: 2 },
        { time: 'Mar', wins: 4, losses: 5 },
    ]

    const levelData = [
        { level: 1, time: 5 },
        { level: 2, time: 12 },
        { level: 3, time: 20 },
        { level: 4, time: 25 },
    ];
  return (
    <div className={styl.tmp1}>
        <div className={styl.Head}>
            <div className={styl.But} style={{width: '35%'}}>
                <h2 >Leaderboard</h2>
                <FaRankingStar className={styl.Icon}/>
            </div>
            <div className={styl.But} style={{width: '65%',paddingLeft: '0'}}>
                <h2 >Statistic</h2>
                <FaChartArea className={styl.Icon}/>
            </div>
        </div>
        <div className={styl.content}>
            <div className={styl.leaderboard}>
                <div className={styl.bar}>
                    <p style={{width: '20%', height: '100%'}}>RANK</p>
                    <p style={{width: '40%', height: '100%'}}>PLAYER</p>
                    <p style={{width: '20%', height: '100%'}}>WINS</p>
                    <p style={{width: '20%', height: '100%'}}>LVL</p>
                </div>
                <div className={styl.cards}>
                    <CardRank />
                </div>
            </div>
            <div className={styl.statistic}>
                <div className={styl.chart1}>
                    <div className={styl.circ}>
                        <div className={styl.chartCir} style={{
                            background: `conic-gradient(
                            #25233C ${winPercentage}%,  
                            #7667D9 0 ${lossPercentage + winPercentage}%
                            )`,
                        }}>
                        </div>
                        <div className={styl.chartText}>
                            <p>Wins: 15</p>
                            <p>Losses: 10</p>
                        </div>
                    </div>
                    <div className={styl.CurveChart}>
                        <CurveChart data={data} />
                    </div>
                </div>
                <div className={styl.chart2}>
                    <CurveLevel data={levelData}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Tmp1
