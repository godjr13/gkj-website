"use client";
import './page.css'

export default function page() {
    return (
        <div className="services">
            <div className="services_item">
                <div className="services_header">
                    <img src="data:image/png;base64,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" alt="speaker"></img>
                    <h1>Custom Audio Systems Design and Manufacturing</h1>
                </div>
                <div className="content">
                    <p className="para">At GKJ Productions, we design and manufacture custom audio systems built to your exact requirements.</p>
                    <ul className="services_list">
                        <li className="list_item">Custom Speaker Cabinets</li>
                        <li className="list_item">Professional Speaker Systems</li>
                        <li className="list_item">PA Sound Systems</li>
                        <li className="list_item">Home Audio Systems</li>
                        <li className="list_item">Car Subwoofer Enclosures</li>
                    </ul>
                    <p className="para">Whether you're a musician, sound engineer, car audio enthusiast, or simply want the best sound for your home, we've got you covered with high-quality craftsmanship and competitive pricing.</p>
                    <p className="para">Reach out to us today to discuss your custom audio project!</p>
                </div>
            </div>
            <div className="services_item">
                <div className="services_header">
                    <img width="96" height="96" src="https://img.icons8.com/ink/96/rock-music.png" alt="rock-music"/>
                    <h1>Custom Electric Guitars Design and Manufacturing</h1>
                </div>
                <div className="content">
                    <p className="para">We can make your guitar fantasy a reality with our custom electric guitar design and manufacturing services.</p>
                    <ul className="services_list">
                        <li className="list_item">Custom Electric Guitars</li>
                        <li className="list_item">Guitar Amplifiers</li>
                        <li className="list_item">Custom Guitar Pedals</li>
                    </ul>
                    <p className="para">Try out our custom electric guitars and experience the difference!</p>
                    <p className="para">Tell us what your dream guitar looks like.</p>
                </div>
            </div>
        </div>
    );
}

