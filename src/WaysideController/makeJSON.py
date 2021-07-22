
# import excel2json

# excel2json.convert_from_file('./TrackLayout.xlsx')

import pandas as pd
import json
import numpy as np

excel_data_df = pd.read_excel(
    './TrackBlockData.xlsx', sheet_name='Green Line')
excel_data_df = excel_data_df.fillna('')

temp = []
for i in range(0, 150):
    data = excel_data_df.iloc[i]

    temp.append(
        {(int)(data['Block Number']): {
            'Line': data['Line'],
            'BlockNumber': (int)(data['Block Number']),
            'Section': data['Section'],
            'BlockLength': data['Block Length (m)'],
            'BlockGrade': data['Block Grade (%)'],
            'SpeedLimit': data['Speed Limit (Km/Hr)'],
            'Infrastructure': data['Infrastructure'],
            'Elevation': data['ELEVATION (M)'],
            'CumulativeElevation': data['CUMALTIVE ELEVATION (M)'],
            'SecondsToTraverseBlock': data['seconds to traverse block'],
            'Authority': 0,
            'Occupancy': 0,
            'BlockStatus': 0,
            'isLevelCrossingBlock': 0,
            'LevelCrossingState': 0,
            'isSwitchBlock': 0,
            'SwitchState': 0,
            'CrossingLights': 0,
            'Beacon-1': {
                'CurrentStation': 0,
                'NextStation': 0,
                'StationSide': data['Station Side'],
            },
            'Beacon+1': {
                'CurrentStation': 0,
                'NextStation': 0,
                'StationSide': data['Station Side'],
            },
            'BeaconFailure': 0,
            'DesiredTrackTemperature': 0,
            'DirectionOfTravel': 0,
            'FailureBrokenRail': 0,
            'FailureTrackCircuit': 0,
            'MaintenanceStatus': 0,
            'MaxCapacity': 0,
            'Section': 0,
            'Station': {
                'PassengersBoarding': 0,
                'PassengersDeparting': 0,
                'PassengersWaiting': 0,
                'Tickets': 0,
            },
            'Temperature': 0,
            'TrackHeater': 0,
        }
        })

print(json.dumps(temp, indent=2))

with open('output.json', 'w') as file:
    file.write(json.dumps(temp, indent=4))
    file.close()
# json_str = excel_data_df.to_json(indent=2)

# print('Excel Sheet to JSON:\n' + json_str)

# with open("ouput.json", 'w') as file:
#     file.write(json_str)
#     file.close()

# loc = ("./TrackLayout.xls")

# wb = xlrd.open_workbook(loc)
# sheet = wb.sheet_by_index(1)

# # For row 0 and column 0
# sheet.cell_value(0, 0)

# for i in range(sheet.ncols):
#     print(sheet.cell_value(0, i))
