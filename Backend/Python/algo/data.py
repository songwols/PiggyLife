import pandas as pd
import pymysql

from sqlalchemy import create_engine


def getStore():
    print('select Store')

    conn = pymysql.connect(host='52.78.169.231', user='piggy', password='piggy', db='piggy')
    sql = "select * from store"
    stores = pd.read_sql_query(sql, conn)
    conn.close()

    return stores

def getUser():
    print('select User')

    conn = pymysql.connect(host='52.78.169.231', user='piggy', password='piggy', db='piggy')
    sql = "select * from user"
    users = pd.read_sql_query(sql, conn)
    conn.close()

    return users

def getPost():
    print('select Post')
    
    conn = pymysql.connect(host='52.78.169.231', user='piggy', password='piggy', db='piggy')
    sql = "select u_id, s_id, is_like from post where visited != 0"
    users = pd.read_sql_query(sql, conn)
    conn.close()

    return users

def save_recommendation(df):
    print("insert recommendation")

    engine = create_engine("mysql+pymysql://piggy:" + "piggy" + "@52.78.169.231:3306/piggy?charset=utf8", encoding='utf-8')
    conn = engine.connect()

    df.to_sql(name="recommend", con=engine, if_exists='replace')
    
    print("insert recommendation complete")
    conn.close()