from pathlib import Path
from typing import Dict
import datetime
import calendar

import pandas as pd

excel_paths = [
    '../excels/2022寒假开学2022-02-21.xlsx',
    '../excels/2022寒假账单2022-02-18.xlsx',
    '../excels/2022年2月2022-02-23.xlsx',
    '../excels/2022年3月2022-03-01.xlsx'
]

save_path = '../bills.xlsx'

excel_data = {}

for path in excel_paths:
    data = pd.read_excel(path, index_col=0)
    excel_data[Path(path).stem] = data

with  pd.ExcelWriter(save_path) as writer:
    for i, v in excel_data.items():
        v.to_excel(writer, sheet_name=i)