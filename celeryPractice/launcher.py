from tasks import *

# we have a task registered as `reverse`

# to execute reverse_string as a celery task, we will call delay method of celery task, so function call would become
reverse_string.delay('Hello')