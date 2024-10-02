import csspage404 from './NoPageFound.module.css';

const NoPageFound = () => {
    return (
        <div className={csspage404.h1}>
          <h1>404 - Not Found</h1>
          <p>The page you are looking for does not exist.</p>
        </div>
    )
}

export default NoPageFound
