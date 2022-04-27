import Spinner from "react-bootstrap/Spinner";
import Stack from "react-bootstrap/Stack";

const LoaderSpinner = () => {
  return (
    <Stack className="vh-100 vw-100 justify-content-center align-items-center">
      <Spinner animation="grow" size="lg" role={"status"}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Stack >
  );
}

const styles = {
  loader: {
    borderColor: "transparent",
    fontSize: "100px"
  }
}

export default LoaderSpinner;