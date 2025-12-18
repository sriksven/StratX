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

                {/* New 2026 Rules Information */}
                <div className="rules-section">
                    <h2 className="rules-title">Everything You Need to Know About 2026</h2>
                    <p className="rules-intro">
                        Formula 1's biggest shake-up in over a decade brings revolutionary changes to cars, power units, and racing.
                    </p>

                    <div className="rules-grid">
                        {/* Aerodynamics */}
                        <div className="rule-card">
                            <div className="rule-header">
                                <span className="rule-icon">✈️</span>
                                <h3>Aerodynamics Revolution</h3>
                            </div>
                            <ul className="rule-list">
                                <li><strong>Smaller, Lighter Cars:</strong> Shorter wheelbase, narrower body, reduced weight</li>
                                <li><strong>New Wing Design:</strong> Simpler front and rear wings with fewer elements</li>
                                <li><strong>Active Aero:</strong> Wings adjust angle for corners (high downforce) and straights (low drag)</li>
                                <li><strong>Flatter Floors:</strong> Extended diffusers replace ground-effect tunnels</li>
                                <li><strong>No DRS:</strong> Replaced by Active Aero system available to all drivers</li>
                            </ul>
                        </div>

                        {/* Power Units */}
                        <div className="rule-card">
                            <div className="rule-header">
                                <span className="rule-icon">⚙️</span>
                                <h3>Power Unit Overhaul</h3>
                            </div>
                            <ul className="rule-list">
                                <li><strong>50-50 Power Split:</strong> Equal power from combustion engine and electric motor</li>
                                <li><strong>1.6L V6 Turbo Hybrid:</strong> Core engine with tripled electric motor output</li>
                                <li><strong>Advanced Sustainable Fuels:</strong> Made from carbon capture and non-food biomass</li>
                                <li><strong>Enhanced ERS:</strong> Double energy recovery per lap from braking and throttle lift</li>
                                <li><strong>No MGU-H:</strong> Heat recovery system removed for simplicity and weight reduction</li>
                            </ul>
                        </div>

                        {/* Driver Tools */}
                        <div className="rule-card">
                            <div className="rule-header">
                                <span className="rule-icon">🎮</span>
                                <h3>Driver Control Systems</h3>
                            </div>
                            <ul className="rule-list">
                                <li><strong>Overtake Mode:</strong> Extra electrical energy when within 1 second of car ahead</li>
                                <li><strong>Boost Button:</strong> Deploy maximum power for attack or defense at any point</li>
                                <li><strong>Battery Management:</strong> Drivers control recharge modes with race engineer</li>
                                <li><strong>Strategic Deployment:</strong> Choose when to use power bursts for maximum effect</li>
                                <li><strong>Active Aero Control:</strong> Adjust wing angles on designated straights</li>
                            </ul>
                        </div>

                        {/* Safety */}
                        <div className="rule-card">
                            <div className="rule-header">
                                <span className="rule-icon">🛡️</span>
                                <h3>Enhanced Safety</h3>
                            </div>
                            <ul className="rule-list">
                                <li><strong>Stronger Survival Cell:</strong> More rigorous crash tests for driver protection</li>
                                <li><strong>Reinforced Roll Hoop:</strong> 23% more load capacity (weight of 9 cars)</li>
                                <li><strong>Improved Impact Structure:</strong> Two-stage separation for secondary impacts</li>
                                <li><strong>Higher Ride Height:</strong> Better crash energy absorption</li>
                                <li><strong>Narrower Tyres:</strong> Reduced drag and improved handling</li>
                            </ul>
                        </div>

                        {/* Manufacturers */}
                        <div className="rule-card">
                            <div className="rule-header">
                                <span className="rule-icon">🏭</span>
                                <h3>New Manufacturers</h3>
                            </div>
                            <ul className="rule-list">
                                <li><strong>Ferrari:</strong> Continuing with hybrid expertise</li>
                                <li><strong>Mercedes:</strong> Leading sustainable power development</li>
                                <li><strong>Red Bull Powertrains:</strong> Partnership with Ford</li>
                                <li><strong>Honda:</strong> Returning to Formula 1</li>
                                <li><strong>Audi:</strong> Joining as new manufacturer</li>
                                <li><strong>General Motors:</strong> Entering in 2029</li>
                            </ul>
                        </div>

                        {/* Racing Impact */}
                        <div className="rule-card">
                            <div className="rule-header">
                                <span className="rule-icon">🏁</span>
                                <h3>Racing Impact</h3>
                            </div>
                            <ul className="rule-list">
                                <li><strong>Easier Following:</strong> Less turbulent air makes overtaking more feasible</li>
                                <li><strong>Greater Variety:</strong> More set-up options suit different driving styles</li>
                                <li><strong>Level Playing Field:</strong> New tech gives all teams fresh opportunities</li>
                                <li><strong>Strategic Depth:</strong> More tools for drivers and teams to manage</li>
                                <li><strong>Sustainable Future:</strong> Road-relevant technology for manufacturers</li>
                            </ul>
                        </div>
                    </div>

                    <div className="rules-summary">
                        <h3>The Bottom Line</h3>
                        <p>
                            Formula 1 cars will continue to be fast, cool, and awe-inspiring to watch. But from 2026,
                            they will be more challenging for teams and drivers. With less downforce, tighter control
                            over turbulent air, and greater strategic tools, this is the future of Formula 1 – powered
                            by advanced sustainable fuel and smarter energy use.
                        </p>
                        <p className="rules-tagline">
                            <strong>Bring. It. On.</strong>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
