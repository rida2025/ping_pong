import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',  
        position: 'absolute',
        top: 0,
        left: 0,
        margin: 0,
    };

    return (
        <div style={containerStyle}>
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.5s"
              width="100"
              visible={true}
            />
        </div>
    );
};

export default Loader;