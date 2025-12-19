import './DriversPage.css';
import norrisImg from '../assets/drivers/norris.png';
import piastriImg from '../assets/drivers/piastri.png';
import leclercImg from '../assets/drivers/leclerc.png';
import hamiltonImg from '../assets/drivers/hamilton.png';
import verstappenImg from '../assets/drivers/verstappen.png';
import hadjarImg from '../assets/drivers/hadjar.png';
import alonsoImg from '../assets/drivers/alonso.png';
import strollImg from '../assets/drivers/stroll.png';
import oconImg from '../assets/drivers/ocon.png';
import bearmanImg from '../assets/drivers/bearman.png';
import albonImg from '../assets/drivers/albon.png';
import sainzImg from '../assets/drivers/sainz.png';
import bottasImg from '../assets/drivers/bottas.png';
import perezImg from '../assets/drivers/perez.png';
import russellImg from '../assets/drivers/russell.png';
import antonelliImg from '../assets/drivers/antonelli.png';
import gaslyImg from '../assets/drivers/gasly.png';
import colapintoImg from '../assets/drivers/colapinto.png';
import lawsonImg from '../assets/drivers/lawson.png';
import lindbladImg from '../assets/drivers/lindblad.png';
import hulkenbergImg from '../assets/drivers/hulkenberg.png';
import bortoletoImg from '../assets/drivers/bortoleto.png';

interface Driver {
    number: number;
    firstName: string;
    lastName: string;
    team: string;
    teamColor: string;
    country: string;
    image?: string;
}

const drivers2026: Driver[] = [
    { number: 4, firstName: 'LANDO', lastName: 'NORRIS', team: 'MCLAREN', teamColor: 'FF8000', country: 'GBR', image: norrisImg },
    { number: 81, firstName: 'OSCAR', lastName: 'PIASTRI', team: 'MCLAREN', teamColor: 'FF8000', country: 'AUS', image: piastriImg },
    { number: 16, firstName: 'CHARLES', lastName: 'LECLERC', team: 'FERRARI', teamColor: 'E8002D', country: 'MON', image: leclercImg },
    { number: 44, firstName: 'LEWIS', lastName: 'HAMILTON', team: 'FERRARI', teamColor: 'E8002D', country: 'GBR', image: hamiltonImg },
    { number: 1, firstName: 'MAX', lastName: 'VERSTAPPEN', team: 'RED BULL RACING', teamColor: '3671C6', country: 'NED', image: verstappenImg },
    { number: 6, firstName: 'ISACK', lastName: 'HADJAR', team: 'RED BULL RACING', teamColor: '6692FF', country: 'FRA', image: hadjarImg },
    { number: 63, firstName: 'GEORGE', lastName: 'RUSSELL', team: 'MERCEDES', teamColor: '27F4D2', country: 'GBR', image: russellImg },
    { number: 12, firstName: 'KIMI', lastName: 'ANTONELLI', team: 'MERCEDES', teamColor: '27F4D2', country: 'ITA', image: antonelliImg },
    { number: 43, firstName: 'FRANCO', lastName: 'COLAPINTO', team: 'ALPINE', teamColor: 'FF87BC', country: 'ARG', image: colapintoImg },
    { number: 10, firstName: 'PIERRE', lastName: 'GASLY', team: 'ALPINE', teamColor: 'FF87BC', country: 'FRA', image: gaslyImg },
    { number: 14, firstName: 'FERNANDO', lastName: 'ALONSO', team: 'ASTON MARTIN', teamColor: '229971', country: 'ESP', image: alonsoImg },
    { number: 18, firstName: 'LANCE', lastName: 'STROLL', team: 'ASTON MARTIN', teamColor: '229971', country: 'CAN', image: strollImg },
    { number: 87, firstName: 'OLLIE', lastName: 'BEARMAN', team: 'HAAS F1 TEAM', teamColor: 'B6BABD', country: 'GBR', image: bearmanImg },
    { number: 31, firstName: 'ESTEBAN', lastName: 'OCON', team: 'HAAS F1 TEAM', teamColor: 'B6BABD', country: 'FRA', image: oconImg },
    { number: 23, firstName: 'ALEX', lastName: 'ALBON', team: 'WILLIAMS', teamColor: '64C4FF', country: 'THA', image: albonImg },
    { number: 55, firstName: 'CARLOS', lastName: 'SAINZ', team: 'WILLIAMS', teamColor: '64C4FF', country: 'ESP', image: sainzImg },
    { number: 30, firstName: 'LIAM', lastName: 'LAWSON', team: 'RACING BULLS', teamColor: '6692FF', country: 'NZL', image: lawsonImg },
    { number: 40, firstName: 'ARVID', lastName: 'LINDBLAD', team: 'RACING BULLS', teamColor: '6692FF', country: 'GBR', image: lindbladImg },
    { number: 27, firstName: 'NICO', lastName: 'HULKENBERG', team: 'AUDI', teamColor: '000000', country: 'GER', image: hulkenbergImg },
    { number: 5, firstName: 'GABRIEL', lastName: 'BORTOLETO', team: 'AUDI', teamColor: '000000', country: 'BRA', image: bortoletoImg },
    { number: 77, firstName: 'VALTTERI', lastName: 'BOTTAS', team: 'CADILLAC', teamColor: '000000', country: 'FIN', image: bottasImg },
    { number: 11, firstName: 'SERGIO', lastName: 'PEREZ', team: 'CADILLAC', teamColor: '000000', country: 'MEX', image: perezImg },
];

export default function DriversPage() {
    return (
        <div className="drivers-page">
            <div className="page-header">
                <h1>2026 F1 DRIVERS</h1>
                <p className="page-subtitle">Find the current Formula 1 drivers for the 2026 season</p>
            </div>

            <div className="drivers-grid">
                {drivers2026.map((driver) => (
                    <div
                        key={driver.number}
                        className="driver-card"
                        style={{ borderTopColor: `#${driver.teamColor}` }}
                    >
                        <div className="driver-number" style={{ backgroundColor: `#${driver.teamColor}` }}>
                            {driver.number}
                        </div>

                        {driver.image && (
                            <div className="driver-photo">
                                <img src={driver.image} alt={`${driver.firstName} ${driver.lastName}`} />
                            </div>
                        )}

                        <div className="driver-info">
                            <div className="driver-name">
                                <span className="first-name">{driver.firstName}</span>
                                <span className="last-name">{driver.lastName}</span>
                            </div>
                            <div className="driver-team">{driver.team}</div>
                            <div className="driver-country">{driver.country}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
