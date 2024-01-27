import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import "./App.scss";
import TogglingIconButton from "./components/TogglingIconButton";

function App() {

  return (
    <div className="App">
      <TogglingIconButton idleIcon={<TipsAndUpdatesIcon />} activeIcon={<TipsAndUpdatesOutlinedIcon />} />
      <TogglingIconButton idleIcon={<TipsAndUpdatesIcon />} activeIcon={<TipsAndUpdatesOutlinedIcon />} customColor="#ff0000" />
      <TogglingIconButton idleIcon={<TipsAndUpdatesIcon />} activeIcon={<TipsAndUpdatesOutlinedIcon />} color="primary" />
    </div>
  );
}

export default App;
