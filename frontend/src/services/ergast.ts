// Ergast API service for historical F1 data
// Documentation: http://ergast.com/mrd/

const ERGAST_BASE_URL = 'https://ergast.com/api/f1';

export interface ErgastDriver {
    driverId: string;
    givenName: string;
    familyName: string;
    nationality: string;
}

export interface ErgastConstructor {
    constructorId: string;
    name: string;
    nationality: string;
}

export interface ErgastRace {
    season: string;
    round: string;
    raceName: string;
    Circuit: {
        circuitId: string;
        circuitName: string;
        Location: {
            locality: string;
            country: string;
        };
    };
    date: string;
    Results?: Array<{
        position: string;
        Driver: ErgastDriver;
        Constructor: ErgastConstructor;
        Time?: { time: string };
        status: string;
        points: string;
    }>;
}

export interface ErgastStanding {
    position: string;
    points: string;
    wins: string;
    Driver?: ErgastDriver;
    Constructor?: ErgastConstructor;
    Constructors?: ErgastConstructor[];
}

export interface SeasonData {
    year: number;
    driverChampion: {
        name: string;
        team: string;
        points: number;
    };
    constructorChampion: {
        name: string;
        points: number;
    };
    races: Array<{
        round: number;
        name: string;
        circuit: string;
        country: string;
        date: string;
        winner: string;
        team: string;
    }>;
    driverStandings: Array<{
        position: number;
        driver: string;
        team: string;
        points: number;
        wins: number;
    }>;
    constructorStandings: Array<{
        position: number;
        constructor: string;
        points: number;
        wins: number;
    }>;
}

/**
 * Fetch complete season data from Ergast API
 */
export const fetchSeasonData = async (year: number): Promise<SeasonData> => {
    try {
        // Fetch races and results
        const racesResponse = await fetch(
            `${ERGAST_BASE_URL}/${year}/results.json?limit=100`
        );
        const racesData = await racesResponse.json();
        const races = racesData.MRData.RaceTable.Races || [];

        // Fetch driver standings
        const driverStandingsResponse = await fetch(
            `${ERGAST_BASE_URL}/${year}/driverStandings.json`
        );
        const driverStandingsData = await driverStandingsResponse.json();
        const driverStandings = driverStandingsData.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || [];

        // Fetch constructor standings
        const constructorStandingsResponse = await fetch(
            `${ERGAST_BASE_URL}/${year}/constructorStandings.json`
        );
        const constructorStandingsData = await constructorStandingsResponse.json();
        const constructorStandings = constructorStandingsData.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings || [];

        // Process data
        const champion = driverStandings[0];
        const constructorChamp = constructorStandings[0];

        return {
            year,
            driverChampion: {
                name: champion ? `${champion.Driver.givenName} ${champion.Driver.familyName}` : 'Unknown',
                team: champion?.Constructors[0]?.name || 'Unknown',
                points: parseInt(champion?.points || '0')
            },
            constructorChampion: {
                name: constructorChamp?.Constructor?.name || 'Unknown',
                points: parseInt(constructorChamp?.points || '0')
            },
            races: races.map((race: ErgastRace) => ({
                round: parseInt(race.round),
                name: race.raceName,
                circuit: race.Circuit.circuitName,
                country: race.Circuit.Location.country,
                date: race.date,
                winner: race.Results?.[0] ?
                    `${race.Results[0].Driver.givenName} ${race.Results[0].Driver.familyName}` :
                    'Unknown',
                team: race.Results?.[0]?.Constructor?.name || 'Unknown'
            })),
            driverStandings: driverStandings.map((standing: ErgastStanding) => ({
                position: parseInt(standing.position),
                driver: `${standing.Driver!.givenName} ${standing.Driver!.familyName}`,
                team: standing.Constructors?.[0]?.name || 'Unknown',
                points: parseInt(standing.points),
                wins: parseInt(standing.wins)
            })),
            constructorStandings: constructorStandings.map((standing: ErgastStanding) => ({
                position: parseInt(standing.position),
                constructor: standing.Constructor!.name,
                points: parseInt(standing.points),
                wins: parseInt(standing.wins)
            }))
        };
    } catch (error) {
        console.error(`Error fetching season data for ${year}:`, error);
        throw error;
    }
};

/**
 * Fetch race results for a specific race
 */
export const fetchRaceResults = async (year: number, round: number) => {
    try {
        const response = await fetch(
            `${ERGAST_BASE_URL}/${year}/${round}/results.json`
        );
        const data = await response.json();
        const race = data.MRData.RaceTable.Races[0];

        if (!race) return null;

        return {
            raceName: race.raceName,
            circuit: race.Circuit.circuitName,
            country: race.Circuit.Location.country,
            date: race.date,
            results: race.Results.map((result: any) => ({
                position: parseInt(result.position),
                driver: `${result.Driver.givenName} ${result.Driver.familyName}`,
                team: result.Constructor.name,
                time: result.Time?.time || result.status,
                points: parseInt(result.points),
                status: result.status
            }))
        };
    } catch (error) {
        console.error(`Error fetching race results for ${year} round ${round}:`, error);
        throw error;
    }
};
