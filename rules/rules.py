import pandas as pd

def buy_123(df, col_name="close"):
    # 确保DataFrame按日期升序排列
    df = df.sort_values(by='trade_date')

    # 找到A、B、C点的索引
    a_idx = df[col_name].idxmax()
    b_idx = df.loc[a_idx:, col_name].idxmin()
    c_idx = df.loc[b_idx:, col_name].idxmax()
    
    # 计算AB和BC的价格差
    ab_diff = df.loc[b_idx, col_name] - df.loc[a_idx, col_name]
    bc_diff = df.loc[c_idx, col_name] - df.loc[b_idx, col_name]

    # 判断趋势
    return 1 if bc_diff > ab_diff else 0

def sell_123(df, col_name="close"):
    # 确保DataFrame按日期升序排列
    df = df.sort_values(by='trade_date')

    # 找到A、B、C点的索引
    a_idx = df[col_name].idxmin()
    b_idx = df.loc[a_idx:, col_name].idxmax()
    c_idx = df.loc[b_idx:, col_name].idxmin()
    
    # 计算AB和BC的价格差
    ab_diff = df.loc[b_idx, col_name] - df.loc[a_idx, col_name]
    bc_diff = df.loc[c_idx, col_name] - df.loc[b_idx, col_name]

    # 判断趋势
    return 1 if bc_diff > ab_diff else 0