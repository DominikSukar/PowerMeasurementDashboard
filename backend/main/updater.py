from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from .utils import get_measurements

def start():
	scheduler = BackgroundScheduler()
	scheduler.add_job(get_measurements, 'interval', seconds=60)
	scheduler.start()