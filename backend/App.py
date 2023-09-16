import logging
logger = logging.getLogger(__name__)
import sys
sys.setrecursionlimit(99999999)

from urlshortener import create_app

logger = logging.getLogger()
handler = logging.StreamHandler()
logger.addHandler(handler)
logger.setLevel(logging.INFO)
