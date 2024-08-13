
function TopBar() {
    return (
        <div className="top-section">
            <div className="player-info">
                <img src="player1.jpg" alt="Player 1" className="player-img" />
                <p>Player 1: Use 'W' and 'S' to move</p>
            </div>
            <div className="player-info">
                <img src="player2.jpg" alt="Player 2" className="player-img" />
                <p>Player 2: Use 'Up' and 'Down' arrows to move</p>
            </div>
        </div>
    );
}

export default TopBar