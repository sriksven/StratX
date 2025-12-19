import { Link } from 'react-router-dom';
import './ArchivePage.css';

export default function ArchivePage() {
    // Generate years from 2024 down to 1950
    const years = Array.from({ length: 75 }, (_, i) => 2024 - i);

    return (
        <div className="archive-page">
            <div className="page-header">
                <h1>F1 ARCHIVE</h1>
                <p className="page-subtitle">Explore 75 years of Formula 1 history (1950-2024)</p>
            </div>

            <div className="years-grid">
                {years.map((year) => (
                    <Link
                        key={year}
                        to={`/results/${year}`}
                        className="year-card"
                    >
                        <div className="year-number">{year}</div>
                        <div className="year-label">Season</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
