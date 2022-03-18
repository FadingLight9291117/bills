from matplotlib.pyplot import table
import pandas as pd
from sqlalchemy import create_engine
import sqlalchemy
from easydict import EasyDict as edict


def clean_data(data):
    data = data[data['金额'].notnull()]
    data = data.fillna(value={'标签': '其他', '说明': ''})
    return data


def get_data(excel_files):
    data_list = []

    for file in excel_files:
        dd = pd.read_excel(file, sheet_name=None)
        if isinstance(dd, dict):
            data_list.extend(dd.values())
        if isinstance(dd, pd.DataFrame):
            data_list.append(dd)

    data_list = [clean_data(excel_data[['日期', '类型', '标签', '金额', '说明']])
                 for excel_data in data_list]
    data = pd.concat(data_list)

    return data


cfg = edict(
    host='aliyun',
    port=3306,
    user='root',
    password='123456',
    database='bill',
    table='bills'
)


conn = create_engine(
    f'mysql+pymysql://{cfg.user}:{cfg.password}@{cfg.host}:{cfg.port}/{cfg.database}?charset=utf8')

excel_paths = ['../bills.xlsx']

data = get_data(excel_paths)
data.columns = ['date', 'cls', 'label', 'money', 'options']

data.to_sql(cfg.table, conn, if_exists='append', index=False)
