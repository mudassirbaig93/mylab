from celery import Celery


app = Celery('tasks', broker='amqp://localhost//')

#if we need results for each task, we need to provide another argument to above function i.e. backend='uri of your db', e.g., can 
# app = Celery('tasks', broker='amqp://localhost//', backend='db+mysql://mytask:somename@ip/table')   can check documentaion for connection string


# provide tasks to celery
@app.task
def reverse_string(string):
	return string[::-1]



# Can start worker with following command
# celery -A tasks worker --loglevel=INFO

# To restart rabbitmq broker
#service rabbitmq-server restart
