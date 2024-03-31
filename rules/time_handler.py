import datetime  
from dateutil.relativedelta import relativedelta  
from dateutil.rrule import rrule, DAILY, MO, TU, WE, TH, FR  
  
# 获取当前日期  
today = datetime.date.today()  
  
# 定义一个函数，检查给定日期是否是工作日（排除周末）  
def is_weekday(date):  
    return date.weekday() < 5  # 周一到周五的weekday()值为0到4  
  
# 定义一个函数，计算往前推指定数量的工作日  
def previous_weekdays(start_date, weekdays_count):  
    current_date = start_date  
    count = 0  
    while count < weekdays_count:  
        current_date -= relativedelta(days=1)  
        if is_weekday(current_date):  
            count += 1  
    return current_date  
