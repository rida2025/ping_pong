import "./Twofa.css";

const TwoFA = () => {
    return (
        <div className="container">
            <div className="center">
                {[...Array(6)].map((_, i) => (
                    <input key={i} type="text" maxLength="1" className="input" />
                ))}
            </div>
            <div className="center">
                <img src="https://via.placeholder.com/150" alt="qr code" />
            </div>
        </div>
    );
};

export default TwoFA;
