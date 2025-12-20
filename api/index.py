import sys
import os

# Add src to system path so we can resolve stratx package
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))

from stratx.api.main import app
