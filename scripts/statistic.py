from pathlib import Path
from typing import Dict
import datetime
import calendar

import pandas as pd
from pyecharts import options as opts
from pyecharts.charts import Pie, Bar


def clean_data(data):
    data = data[data['金额'].notnull()]
    data = data.fillna(value={'标签': '其他', '说明': ''})
    return data


def statistic_cls(data: pd.DataFrame):
    data_map = {}
    for row in data.iterrows():
        row = row[1]
        data_map.setdefault(row['类型'], 0)
        data_map[row['类型']] += row['金额']

    data_list = [[k, format_float(v)] for k, v in data_map.items()]
    return data_list


def statistic_label(data: pd.DataFrame):
    data_map = {}
    for row in data.iterrows():
        row = row[1]
        data_map.setdefault(row['标签'], 0)
        data_map[row['标签']] += row['金额']

    data_list = [[k, format_float(v)] for k, v in data_map.items()]
    return data_list


def format_float(d):
    return float(f'{d:.2f}')


# 填充没有支出的日期
def fill_money(data: Dict[datetime.date, float]):
    dates = list(data.keys())
    max_date = max(dates)
    min_date = min(dates)
    year = max_date.year
    month = max_date.month

    for day in range(min_date.day, max_date.day):
        this_date = datetime.datetime(year, month, day)
        data.setdefault(this_date, .0)

    # 按日期排序
    items = sorted(data.items(), key=lambda x: x[0])

    data = {i: v for i, v in items}

    return data


def pie_month(year, month, data, save_path):

    data = data[data['日期'] >= datetime.datetime(year, month, 1)]
    data = data[data['日期'] <= datetime.datetime(
        year, month, calendar.monthrange(year, month)[1])]

    data_cls = statistic_cls(data)
    pie = (
        Pie()
        .add("", data_cls, rosetype='radius')
        .set_global_opts(title_opts=opts.TitleOpts(
            title=f"{year}.{month}",
        ))
        .set_series_opts(label_opts=opts.LabelOpts(formatter="{b}: {c}"))
    )
    pie.render(str(save_path / "pie.html"))


def bar_month(year, month, data, save_path):
    data = data[data['日期'] >= datetime.datetime(year, month, 1)]
    data = data[data['日期'] <= datetime.datetime(
        year, month, calendar.monthrange(year, month)[1])]

    data_money = data.groupby(['日期'])['金额'].sum()
    data_money = data_money.to_dict()
    data_money = fill_money(data_money)
    data_money = {f'{k.month}-{k.day}': v for k, v in data_money.items()}

    bar = (
        Bar()
        .add_xaxis(list(data_money.keys()))
        .add_yaxis('金额', list(data_money.values()))
        .set_global_opts(
            title_opts=opts.TitleOpts(
                title=f"{year}.{month}每日支出",
            ),
            # x轴标签倾斜
            # xaxis_opts=opts.AxisOpts(axislabel_opts=opts.LabelOpts(rotate=-15)),
            # datazoom_opts=opts.DataZoomOpts(),
            # datazoom_opts=opts.DataZoomOpts(type_="inside"),
            # toolbox_opts=opts.ToolboxOpts(),
            # legend_opts=opts.LegendOpts(is_show=False),
        )
    )
    bar.render(str(save_path / 'bar.html'))


def day_pie(year, month, day, data, save_path):
    data = data[data['日期'] == datetime.datetime(year, month, day)]
    data_cls = statistic_cls(data)
    pie = (
        Pie()
        .add("", data_cls, rosetype='radius')
        .set_global_opts(title_opts=opts.TitleOpts(
            title=f"{year}.{month}.{day} 消费统计",
        ))
        .set_series_opts(label_opts=opts.LabelOpts(formatter="{b}: {c}"))
    )
    pie.render(str(save_path / f'bar-{year}.{month}.{day}消费统计.html'))


def day_cls_pie(year, month, day, cla, data, save_path):
    data = data[data['日期'] == datetime.datetime(year, month, day)]
    data = data[data['类型'] == cla]
    data_cls = statistic_label(data)
    pie = (
        Pie()
        .add("", data_cls, rosetype='radius')
        .set_global_opts(title_opts=opts.TitleOpts(
            title=f"{year}.{month}.{day} {cla} 消费统计",
        ))
        .set_series_opts(label_opts=opts.LabelOpts(formatter="{b}: {c}"))
    )
    pie.render(str(save_path / f'bar-{year}.{month}.{day}{cla}消费统计.html'))


def month_clz_pie(year, month, cla, data, save_path):

    data = data[data['日期'] >= datetime.datetime(year, month, 1)]
    data = data[data['日期'] <= datetime.datetime(
        year, month, calendar.monthrange(year, month)[1])]

    data = data[data['类型'] == cla]
    data_cls = statistic_label(data)
    pie = (
        Pie()
        .add("", data_cls, rosetype='radius')
        .set_global_opts(title_opts=opts.TitleOpts(
            title=f"{year}.{month} {cla} 消费统计",
        ))
        .set_series_opts(label_opts=opts.LabelOpts(formatter="{b}: {c}"))
    )
    pie.render(str(save_path / f'bar-{year}.{month}{cla}消费统计.html'))


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


if __name__ == '__main__':
    year = 2022
    month = 3
    save_path = '../imgs'
    excel_files = ['../bills.xlsx']

    save_path = Path(save_path)
    save_path.mkdir(exist_ok=True)

    data = get_data(excel_files)

    pie_month(year, month, data, save_path)
    bar_month(year, month, data, save_path)
    day_pie(2022, 3, 8, data, save_path)
    day_cls_pie(2022, 3, 8,  "穿搭", data, save_path)
    month_clz_pie(2022, 3, "穿搭", data, save_path)
