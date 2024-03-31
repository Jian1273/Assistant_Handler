import pandas as pd
import tushare as ts
import sqlite3
from tqdm import tqdm
import datetime

class DataDownloader:
    def __init__(self, db_name):
        self.pro = ts.pro_api("20231208200557-e7fdfafe-4c35-4c6e-8a85-c727847e3856")
        self.pro._DataApi__http_url = 'http://tsapi.majors.ltd:7000'
        self.connection = sqlite3.connect(db_name)
        self.cursor = self.connection.cursor()
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS stock_data (
                ts_code TEXT,
                trade_date TEXT,
                open FLOAT,
                high FLOAT,
                low FLOAT,
                close FLOAT,
                pre_close FLOAT,
                change FLOAT,
                pct_chg FLOAT,
                vol FLOAT,
                amount FLOAT
            )
        ''')

    def download_and_store(self, ts_code_file, start_date):
        df_ts_code = pd.read_csv(ts_code_file)
        for ts_code in tqdm(df_ts_code["ts_code"]):     
            df = self.pro.daily(ts_code=ts_code, start_date=start_date)
            df.to_sql("history_data", self.connection, if_exists='append', index=False)
        self.connection.commit()
        self.close()

    def insert_stock_data(self, date=None):
        if not date:
            date = datetime.date.today()
            date = date.strftime("%Y%m%d")

        # 获取数据
        df = self.pro.daily(trade_date=date)
        df.to_sql("history_data", self.connection, if_exists='append', index=False)
        self.connection.commit()

    def close(self):
        self.connection.close()


if __name__ == "__main__":
    
    down = DataDownloader(db_name="history_data/stock_data.db")
    # down.download_and_store(
    #     ts_code_file="history_data/code_ts.csv",
    #     start_date="2020-01-01"
    # )
    date = datetime.date.today() - datetime.timedelta(days=1)
    date = date.strftime("%Y%m%d")
    down.insert_stock_data(date=date)