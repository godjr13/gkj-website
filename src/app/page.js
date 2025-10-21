import GuitarScene from "@components/GuitarScene";
import BriefDescription from "./components/BriefDescription";


export default function Home() {
  return (
    <div className="home">
      <div className="nav" style={{ position: "relative", width: "100%", height: "60px" }}>
        {/* Navigation */}
        <nav style={{ position: "absolute", top: "20px", right: "20px" }}>
          <ul style={{ display: "flex", gap: "20px", listStyle: "none" }}>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
        </nav>
      </div>

      <div className="model">
        {/* Guitar 3D Scene */}
          <GuitarScene />
      </div>

      <BriefDescription />

    </div>
  );
}
