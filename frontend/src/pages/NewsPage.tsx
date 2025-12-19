import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './NewsPage.css';
import boostOvertakeImg from '../assets/news/boost-overtake.jpg';
import reducedDownforceImg from '../assets/news/reduced-downforce.jpg';
import powerUnitImg from '../assets/news/power-unit.jpg';
import carDimensionsImg from '../assets/news/car-dimensions.jpg';

interface Section {
    id: string;
    title: string;
    icon: string;
    content: string[];
    images?: string[];
}

const sections: Section[] = [
    {
        id: 'aero',
        title: 'Aerodynamics Revolution',
        icon: '✈️',
        content: [
            'The cars will be shorter, narrower, lighter and nimbler. The wheelbase has been shortened, which in theory means they should be more responsive through corners.',
            'The cars will still be fitted with 18-inch Pirelli tyres – but they are narrower. That\'ll cut drag – and trim off yet more weight.',
            'It\'s goodbye long ground-effect tunnels and hello flatter floors with extended diffusers with bigger openings. This will mean less downforce and a higher ride height requirement.',
            'Both front and rear wings will be simpler, which roughly translates to fewer elements. The rear beam wings will be no more, while the front wing will feature narrower elements.',
            'The most significant change is the introduction of Active Aero. The cars can adjust the angle of both their front and rear wing elements depending on where they are on track.',
            'In the corners, the flaps stay shut in their default position to maintain grip. On designated straights, drivers can activate low-drag mode, which opens the flaps and flattens the wings, reducing drag and boosting top speed.',
            'Active Aero means essentially saying goodbye to DRS in its current form, as the rear wing flaps can be opened on every designated straight without the need to be within one second of the car in front.'
        ],
        images: [carDimensionsImg, reducedDownforceImg]
    },
    {
        id: 'power',
        title: 'Power Unit Overhaul',
        icon: '⚙️',
        content: [
            'While the core is still a 1.6-litre V6 turbo hybrid, the power balance has shifted significantly. From 2026, the internal combustion engine output has been cut while the electric motor has tripled.',
            'We\'ve got roughly a 50-50 power split between petrol and electric. This makes the power units more road relevant – and thus more attractive to existing manufacturers Ferrari and Mercedes, newcomers Red Bull Power Trains in partnership with Ford, General Motors (from 2029) and Audi, plus returning suppliers Honda.',
            'The car\'s Energy Recovery System (ERS) can now recharge the battery with twice as much energy per lap, through things like recovery under braking or lifting off the throttle at the end of straights.',
            'The revamp of the power unit does mean it\'s the end of the expensive and complex MGU-H (a heat recovery system), which lacked road relevance and added weight.',
            'For the first time ever, Formula 1 power units will be running Advanced Sustainable Fuels. The fuel is made from cutting-edge sources like carbon capture, municipal waste and non-food biomass – and it is independently certified to meet strict sustainability standards.'
        ],
        images: [powerUnitImg]
    },
    {
        id: 'driver-tools',
        title: 'Driver Control Systems',
        icon: '🎮',
        content: [
            'Overtake Mode is just for attack and is triggered when they\'re within one second of the car in front. That gives them access to extra electrical energy which they can use to deploy to overtake or pressure the driver ahead at a single detection point.',
            'Drivers still have a Boost button and can continue to use it in defence as well as overtaking at any point around the lap, providing they have enough charge in their battery. Drivers may use it all at once or spread across the lap.',
            'Drivers will oversee their battery recharge. Working with their race engineer, the duo can select from a range of different modes to recharge their battery, from braking and engine energy.',
            'That means they have three tools they can use tactically when in the heat of battle: Overtake Mode, Boost Button, and Battery Management.'
        ],
        images: [boostOvertakeImg]
    },
    {
        id: 'safety',
        title: 'Enhanced Safety',
        icon: '🛡️',
        content: [
            'The drivers\' survival cell will be subjected to more rigorous tests, while the roll hoop will be strengthened to take 23% more load – that\'s roughly the weight of nine family cars.',
            'The front impact structure design has been tweaked so it now separates in two stages to give drivers greater protection in big crashes where there are secondary impacts after the initial contact.',
            'These safety enhancements ensure that Formula 1 continues to be at the forefront of motorsport safety while pushing the boundaries of performance.'
        ]
    },
    {
        id: 'manufacturers',
        title: 'New Manufacturers',
        icon: '🏭',
        content: [
            'Ferrari and Mercedes continue with their hybrid expertise, leading the way in sustainable power development.',
            'Red Bull Powertrains has partnered with Ford to create their own power unit, marking a significant milestone for both companies.',
            'Honda is returning to Formula 1, bringing their engineering excellence back to the grid.',
            'Audi is joining as a new manufacturer, attracted by the road-relevant technology and sustainability focus.',
            'General Motors will be entering in 2029, further expanding the manufacturer presence in Formula 1.',
            'The ruleset has already attracted four manufacturers – which means more competition and more innovation.'
        ]
    },
    {
        id: 'racing',
        title: 'Racing Impact',
        icon: '🏁',
        content: [
            'With less downforce and tighter control over turbulent air, following a car through a corner should be easier – while getting the best out of the car should be a greater challenge for the drivers.',
            'There will be less downforce and a higher ride height requirement that should lead to a greater variety of set-ups that suit a greater range of driving styles – thus levelling the playing field.',
            'Formula 1 cars will continue to be fast, to be cool, to be awe-inspiring to watch. But from 2026, they will be more challenging for the teams and the drivers.',
            'They\'ll have to deal with new tech and tighter rules – while managing a greater set of tools to attack or defend that can make or break their ultimate performance and finishing position.',
            'This is the future of Formula 1, powered by advanced sustainable fuel and smarter energy use.'
        ]
    }
];

export default function NewsPage() {
    const [expandedSections, setExpandedSections] = useState<string[]>([]);

    const toggleSection = (id: string) => {
        setExpandedSections(prev =>
            prev.includes(id)
                ? prev.filter(sectionId => sectionId !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="news-page">
            <div className="page-header">
                <h1>EVERYTHING YOU NEED TO KNOW ABOUT 2026</h1>
                <p className="page-subtitle">
                    Formula 1's biggest shake-up in over a decade brings revolutionary changes to cars, power units, and racing
                </p>
            </div>

            <div className="news-intro">
                <p>
                    Formula 1 prides itself on being at the forefront of innovation – and the relentless pursuit of breaking new ground continues next year when the championship's rules will be revamped in the biggest shake up the sport has seen for more than a decade.
                </p>
                <p>
                    From 2026, Formula 1 will feature a revised aerodynamic package that will deliver new-look cars alongside an overhauled set of power unit rules that are engaging for existing manufacturers Ferrari and Mercedes, attractive to newcomers Red Bull Powertrains – who have teamed up with Ford – Audi and General Motors (the latter launching their power unit in 2029) and attractive enough to bring Honda back to the party…
                </p>
            </div>

            <div className="sections-container">
                {sections.map((section) => {
                    const isExpanded = expandedSections.includes(section.id);

                    return (
                        <div key={section.id} className="section-block">
                            <button
                                className="section-header"
                                onClick={() => toggleSection(section.id)}
                            >
                                <div className="section-title-group">
                                    <span className="section-icon">{section.icon}</span>
                                    <h2 className="section-title">{section.title}</h2>
                                </div>
                                <span className="section-toggle">
                                    {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                                </span>
                            </button>

                            {isExpanded && (
                                <div className="section-content">
                                    {section.images && section.images.length > 0 && (
                                        <div className="section-images">
                                            {section.images.map((image, idx) => (
                                                <div key={idx} className="section-image">
                                                    <img src={image} alt={`${section.title} - Image ${idx + 1}`} />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {section.content.map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="news-conclusion">
                <h2>The Bottom Line</h2>
                <p>
                    Formula 1 cars will continue to be fast, to be cool, to be awe-inspiring to watch. But from 2026, they will be more challenging for the teams and the drivers. They'll have to deal with new tech and tighter rules – while managing a greater set of tools to attack or defend that can make or break their ultimate performance and finishing position.
                </p>
                <p>
                    With less downforce and tighter control over turbulent air, following a car through a corner should be easier – while getting the best out of the car should be a greater challenger for the drivers. This is the future of Formula 1, powered by advanced sustainable fuel and smarter energy use.
                </p>
                <p className="conclusion-tagline">
                    <strong>Bring. It. On.</strong>
                </p>
            </div>
        </div>
    );
}
