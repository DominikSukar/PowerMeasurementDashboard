from flask import Flask, jsonify
import random
from datetime import datetime
from typing import List, Dict, Union

import argparse

app = Flask(__name__)
app.json.sort_keys = False

def emulate_data() -> List[Dict[str, Union[int, str, List[Union[str, int]]]]]:
    data = []
    number_of_power_stations = 1

    for index in range(number_of_power_stations):
        number_of_circuits = 5 + (20*(index + 1)//(number_of_power_stations + 1))
        summarized_measurements = 0
        insertion = {
            "name": f"Power Station {args.port}",
            "summarizedMeasurements": summarized_measurements,
            "numberofCircuits": number_of_circuits,
            "measurements": [],
        }
        for index2 in range(number_of_circuits):
            value = random.randint(0, 5000)
            summarized_measurements += value
            insertion["measurements"].append({
                "name": f"Circuit {index2+1}",
                "date": datetime.now(),
                "value": value,
            })
        
        insertion["summarizedMeasurements"] = summarized_measurements
        data.append(insertion)

    return data

@app.route("/")
def main():
    data = emulate_data()
    return jsonify(data)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-p', '--port', type=int, help='Port number')

    args = parser.parse_args()
    app.run(host='0.0.0.0', port=args.port)