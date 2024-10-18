import styl from './Home.module.css'
import { useNavigate } from 'react-router-dom';
import { FaSearchengin } from "react-icons/fa6";
import 'react-circular-progressbar/dist/styles.css';
import Tmp1 from './components/Tmp1/Tmp1'
import { useState, useEffect } from 'react';
import Tmp2 from './components/Tmp2/Tmp2';
import SearchCard from './components/SearchCard/Searchcard';
import Cookies from 'js-cookie';

const Home = () => {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const handleClick = () => {
        navigate('/game');
    }

    const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [selectedTab, setSelectedTab] = useState('leaderBoard');

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        const fetchSearchResults = async () => {
          if (searchQuery.trim()) {
            const response = await fetch(
              `http://10.11.10.15:8000/api/users/search/?q=${searchQuery}`
            );
            const data = await response.json();
            console.log(data);
            setSearchResults(data);
          } else {
            setSearchResults([]);
          }
        };
    
        fetchSearchResults();
      }, [searchQuery]);

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
    <div className={styl.Home}>
        <div className={styl.cont}>
            <div className={styl.head}>
                <h1 >HOME</h1>
            </div>
            <div className={styl.search}>
                <div className={styl.extFrame}>
                    <div className={styl.innerFrame}>
                        <input type="text"
                            placeholder="search..."
                            name='search'
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className={styl.searchBut}>
                        <FaSearchengin style={{width: '70%', height: '70%'}}/>
                    </button>
                </div>
                <div className={styl.searchResult}>
                    {searchResults.length > 0 && (
                        <div className={styl.searchResult} >
                        {searchResults.map((user) => (
                        <SearchCard key={user.id} user={user} />
                    ))}
                </div>
                )}
                </div>
            </div>
            <div className={styl.first}>
                <div className={styl.intro}>
                    <p className={styl.str}>
                        Challenge your friends to a match in
                        Ping Pong Legends and see who 
                        truly dominates the table
                    </p>
                </div>
                <div className={styl.play}>
                    <button onClick={handleClick}>
                        <p >Play Now</p>
                    </button>
                </div>
            </div>
            <div className={styl.last}>
                {isMobile ? <Tmp2 /> : <Tmp1 />}
            </div>
        </div>
    </div>
  )
}

export default Home
