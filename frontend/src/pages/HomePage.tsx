import './HomePage.css';

export default function HomePage() {
    return (
        <div className="homepage-2026">
            <div className="coming-soon-container">
                <div className="year-display">2026</div>
                <h1 className="coming-soon-title">COMING SOON</h1>
                <p className="coming-soon-subtitle">
                    The future of Formula 1 is on its way
                </p>
                <div className="feature-grid">
                    <div className="feature-item">
                        <div className="feature-icon">🏎️</div>
                        <h3>New Regulations</h3>
                        <p>Revolutionary technical changes</p>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">⚡</div>
                        <h3>Sustainable Power</h3>
                        <p>100% sustainable fuels</p>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">🔧</div>
                        <h3>Advanced Aerodynamics</h3>
                        <p>Next-generation car design</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
