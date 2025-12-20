import requests
import pandas as pd
import logging
from typing import List, Dict, Any, Optional

class OpenF1Client:
    """
    Client for interacting with the OpenF1 API to fetch live and historical Formula 1 data.
    """
    BASE_URL = "https://api.openf1.org/v1"

    def __init__(self):
        self.logger = logging.getLogger(__name__)

    def _fetch(self, endpoint: str, params: Optional[Dict[str, Any]] = None) -> List[Dict[str, Any]]:
        """
        Internal method to handle API requests.
        """
        try:
            url = f"{self.BASE_URL}{endpoint}"
            response = requests.get(url, params=params)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            self.logger.error(f"Error fetching {endpoint}: {e}")
            return []

    def get_session(self, session_key: int) -> List[Dict[str, Any]]:
        """Get detailed information about a specific session."""
        return self._fetch("/sessions", {"session_key": session_key})

    def get_car_data(self, session_key: int, driver_number: Optional[int] = None) -> List[Dict[str, Any]]:
        """
        Get car telemetry data (speed, rpm, gear, etc). 
        Use mostly for historical/replay since live data volume is high.
        """
        params = {"session_key": session_key}
        if driver_number:
            params["driver_number"] = driver_number
        return self._fetch("/car_data", params)

    def get_laps(self, session_key: int, driver_number: Optional[int] = None) -> List[Dict[str, Any]]:
        """Get lap timing data."""
        params = {"session_key": session_key}
        if driver_number:
            params["driver_number"] = driver_number
        return self._fetch("/laps", params)

    def get_position(self, session_key: int, driver_number: Optional[int] = None) -> List[Dict[str, Any]]:
        """Get car position on track (X, Y, Z, Date)."""
        params = {"session_key": session_key}
        if driver_number:
            params["driver_number"] = driver_number
        return self._fetch("/position", params)
    
    def get_intervals(self, session_key: int) -> List[Dict[str, Any]]:
        """Get live intervals (gaps) between drivers."""
        return self._fetch("/intervals", {"session_key": session_key})
    
    def get_pit_stops(self, session_key: int) -> List[Dict[str, Any]]:
        """Get pit stop information."""
        return self._fetch("/pit", {"session_key": session_key})

    def get_weather(self, session_key: int) -> List[Dict[str, Any]]:
        """Get weather data for the session."""
        return self._fetch("/weather", {"session_key": session_key})
    
    def get_race_control(self, session_key: int) -> List[Dict[str, Any]]:
        """Get race control messages (Flags, Safety Car, etc.)."""
        return self._fetch("/race_control", {"session_key": session_key})

    def get_active_session_key(self) -> Optional[int]:
        """
        Attempt to find the currently active session.
        If no session is live, returns the most recent one.
        """
        meetings = self._fetch("/meetings")
        if not meetings:
            return None
        
        # Sort by date descending
        meetings.sort(key=lambda x: x['date_start'], reverse=True)
        latest_meeting_key = meetings[0]['meeting_key']
        
        sessions = self._fetch("/sessions", {"meeting_key": latest_meeting_key})
        if not sessions:
            return None
            
        sessions.sort(key=lambda x: x['date_start'], reverse=True)
        return sessions[0]['session_key']
