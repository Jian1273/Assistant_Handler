import os
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir)))

import tushare as ts
import datetime
import pandas as pd
import json
import jsonlines
from tqdm import tqdm

from rules.rules import buy_123, sell_123
from rules.time_handler import previous_weekdays
from get_data.data_loader import DataLoader

data_loader = DataLoader("history_data/stock_data.db")

class TradeRule:
    def __init__(self) -> None:
        self.data_path = "history_data/code_ts.csv"
        self.pro = ts.pro_api('20231208200557-e7fdfafe-4c35-4c6e-8a85-c727847e3856')
        self.pro._DataApi__http_url = 'http://tsapi.majors.ltd:7000'
        self.all_symbols = self.get_all_symbols()

    def load(self):
        self.get_symbols()
        
    def get_symbols(self):
        # 获取股票代码数据
        code_df = self.pro.stock_basic(
            exchange='', 
            list_status='L', 
            fields='ts_code,symbol,name,area,industry,list_date'
        )
        code_df.to_csv(self.data_path, index=False)

    def get_all_symbols(self):
        # 从data_path中获取所有股票代码
        return pd.read_csv(self.data_path).to_dict(orient="records")
        

    def count_consecutive_up_days(self, prices):  
        """  
        计算从最后一天开始向前计算的连续上涨天数  
        :param prices: 包含股票价格的列表  
        :return: 从最后一天开始向前计算的连续上涨天数  
        """  
        prices = prices[::-1]
        if not prices or len(prices) < 2:  
            return 0  
    
        # 从后往前遍历，计算从最后一天开始的连续上涨天数  
        consecutive_up_days = 0  
        for i in range(len(prices) - 2, -1, -1):  
            if prices[i] < prices[i + 1]:  
                consecutive_up_days += 1  
            else:  
                break  
  
        return consecutive_up_days 
            

    # 判断123法则
    def judge_123_rule(self, start_day, end_day):
        buy_f = jsonlines.open(f"data/buy-{start_day}-{end_day}.jsonl", "w")
        sql_query = f"SELECT * FROM history_data where trade_date between '{start_day}' and '{end_day}'"
        all_data = data_loader.load_data(sql_query)

        # 获取流通股本 dict类型
        share = []
        while not share:
            share = self.pro.daily_basic(
                ts_code='', 
                trade_date=end_day, 
                fields='ts_code,float_share,total_share'
                ).to_dict(orient="records")
            end_day = previous_weekdays(datetime.datetime.strptime(end_day, "%Y%m%d"), 1).strftime("%Y%m%d") 
        # 转化成 share = {"ts_code": {"float_share": "float_share", "total_share": "total_share"}}
        share = {item["ts_code"]: {"float_share": item["float_share"], "total_share": item["total_share"]} for item in share}
        # print(share)
        print(share["000001.SZ"]["float_share"])

        stocks = []
        for item in tqdm(self.all_symbols):
            # 从history_data/stock_data.db中获取股票历史数据
            history_df = all_data[all_data["ts_code"] == item["ts_code"]]
            
            # 判断123法则
            if history_df.shape[0] > 0:
                flag_123 = buy_123(history_df)

            # 计算连续上涨天数
            days = self.count_consecutive_up_days(history_df["close"].tolist())
            
            # 判断股本是否满足要求
            # if circulating_capital:
            #     passDW
            float_share = share.get(item["ts_code"], 0).get("float_share") if share.get(item["ts_code"], 0) else 0
            total_share = share.get(item["ts_code"], 0).get("total_share") if share.get(item["ts_code"], 0) else 0

            stock_data = {
                "ts_code": item["ts_code"], 
                "name": item["name"],
                "industry": item["industry"],
                "increasing_days": days,
                "float_share": float_share,
                "total_share": total_share,
                "flag": flag_123,
            }
            stocks.append(stock_data)
            buy_f.write(stock_data)

        return stocks
            

if __name__ == "__main__":
    today = datetime.date.today()
    start_day = previous_weekdays(today, 60).strftime("%Y%m%d")
    end_day = today.strftime("%Y%m%d")
    print("开始日期：", start_day, "结束日期：", end_day)
    trade = TradeRule()
    trade.judge_123_rule(
        start_day=start_day,
        end_day=end_day
    )
   