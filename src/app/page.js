import GuitarScene from "@components/GuitarScene";
import BriefDescription from "./components/BriefDescription";


export default function Home() {
  return (
    <div className="nav" style={{ position: "relative", width: "100%", height: "100vh" }}>
      {/* Navigation */}
      <nav style={{ position: "absolute", top: "20px", right: "20px" }}>
        <ul style={{ display: "flex", gap: "20px", listStyle: "none" }}>
          <li><a href="/shop">Shop</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/about">About Us</a></li>
        </ul>
      </nav>
      <div className="3dmodel">
        {/* Guitar 3D Scene */}
        <GuitarScene />
      </div>

      <BriefDescription/>

    </div>
  );
}
