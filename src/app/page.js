
import GuitarScene from "@components/GuitarScene";
import BriefDescription from "./components/BriefDescription";
import Gallery from "./components/Gallery";

export default function Home() {
  return (
    <div className="home">
      <div className="model">
        {/* Guitar 3D Scene */}
          <GuitarScene />
      </div>

      <BriefDescription />

    </div>
  );
}
