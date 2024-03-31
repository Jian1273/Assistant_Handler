import sqlite3
import pandas as pd


class DataLoader:
    def __init__(self, db_name):
        self.connection = sqlite3.connect(db_name, check_same_thread=False)

    def load_data(self, query):
        df = pd.read_sql_query(query, self.connection)
        return df

    def close(self):
        self.connection.close()


if __name__ == "__main__":
    data_loader = DataLoader("history_data/stock_data.db")
    query = "SELECT * FROM history_data WHERE ts_code='000001.SZ'"
    df = data_loader.load_data(query)
    print(df)
    data_loader.close()