import Sidebar from "./Sidebar";
import Main from "./Main";

function Home({ onLogout }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar onLogout={onLogout} />
      <Main />
    </div>
  );
}

export default Home;
