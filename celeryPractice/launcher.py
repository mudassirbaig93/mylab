from tasks import *

# we have a task registered as `reverse`

# to execute reverse_string as a celery task, we will call delay method of celery task, so function call would become

#reverse_string.delay('Hello')

Another method
reverse_string.apply_async(kwargs={'string': "Hello"},
        retry_policy=dict(
        max_retries=3,
        interval_start=3,
        interval_step=1,
        interval_max=6
        ))
