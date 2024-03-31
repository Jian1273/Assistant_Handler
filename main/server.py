import os
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir)))

from flask import Flask, jsonify, request, render_template
from flask import stream_with_context, Response
import json
from flask_cors import CORS

from rules.apply_rules import TradeRule


app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config.from_object(__name__)
app.config['JSON_AS_ASCII'] = False
app.config['JSON_SORT_KEYS'] = False

trade_rule = TradeRule()

@app.route('/get_stocks/', methods=['GET', 'POST'])
def get_stocks():
    params = request.args.get("jsondata")
    params = json.loads(params)
    increasing_days = params.get("increasing_days")
    float_share = params.get("float_share")


    start_day = params.get("start_day")
    end_day = params.get("end_day")
    stocks = trade_rule.judge_123_rule(start_day, end_day)

    # 筛选stocks
    """
        stock_data = {
                "ts_code": item["ts_code"], 
                "symbol": item["symbol"], 
                "name": item["name"],
                "industry": item["industry"],
                "increasing_days": days,
                "float_share": float_share,
                "total_share": total_share,
                "flag": flag_123,
            }
    """

    def gen():
        cols = ["ts_code", "name", "industry", "increasing_days", "float_share", "total_share", "flag"]
        values = []
        for stock in stocks:
            if stock["increasing_days"] >= increasing_days and stock["float_share"] >= float_share and stock["flag"] == 0:
                values.append([stock[col] for col in cols])

        yield 'data: {}\n\n'.format(json.dumps({'resp':{"columns": cols, "values":values}}, ensure_ascii=False))
        yield "data: %s\n\n" % '[DONE]'

    response = Response(gen(), mimetype='text/event-stream')
    response.headers['Cache-Control'] = 'no-cache'
    response.headers['X-Accel-Buffering'] = 'no'
    response.headers['Accept'] = '*/*'
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)