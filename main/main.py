import os
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir)))

import datetime
import jsonlines

from rules.time_handler import previous_weekdays
from rules.apply_rules import TradeRule

today = datetime.date.today()
start_day = previous_weekdays(today, 60).strftime("%Y%m%d")
end_day = today.strftime("%Y%m%d")
# print("开始日期：", start_day, "结束日期：", end_day)
# trade = TradeRule()
# trade.judge_123_rule(
#     start_day=start_day,
#     end_day=end_day
# )

# 设置条件
flag = 0
increasing_days = 0
float_share = 0

file_name = f"data/buy-{start_day}-{end_day}.jsonl"
f = jsonlines.open(file_name, "r")
s = open("result.txt", "w", encoding="utf-8")
for item in f.iter():
    if item["flag"] == flag and item["increasing_days"] >= increasing_days:
        s.write(str(item["name"])+ "\n",)

