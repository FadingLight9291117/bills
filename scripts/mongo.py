from urllib.parse import quote_plus

from pymongo import MongoClient
from easydict import EasyDict as edict


config = edict(
    host='47.99.156.88',
    post='27017',
    username='clz',
    password='123456',
    database='bill',
)


uri = "mongo://%s:%s@%s:%s" % (
    quote_plus(config.username),
    quote_plus(config.password),
    quote_plus(config.host),
    quote_plus(config.port)
)

with MongoClient(uri) as client:
    with client[config.database] as db:
        with db['2022寒假医院期间'] as col:
            print(col.find())
