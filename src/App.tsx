import "./App.css";
import Predict from "./components/Predict";

function App() {
  return (
    <div className="main__container">
      <h1 className="main__header">Heart Attack Analysis & Prediction</h1>
      <p className="desc__text">
        Your health matters to us. By providing your information, you can
        receive personalized insights and predictions. Let's get started
      </p>
      <Predict />
    </div>
  );
}

export default App;
