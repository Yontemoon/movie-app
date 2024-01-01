import { ClipLoader } from "react-spinners";
import "../styles/spinner.css"

type SpinnerProps = {
    isLoading?: boolean;
}

const Spinner = ({isLoading = true}: SpinnerProps) => {
    return (
        <div id="loading-spinner">
            <ClipLoader
                color="#C6878F"
                loading={isLoading}
                size={35}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default Spinner;