from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from .views import get_measurements

def start():
	scheduler = BackgroundScheduler()
	scheduler.add_job(get_measurements, 'interval', seconds=10)
	scheduler.start()