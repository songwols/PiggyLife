from urllib.request import urlopen
from bs4 import BeautifulSoup as bs
import pymysql
from urllib.parse import quote_plus
import upload

# db접속
db = pymysql.connect(host='52.78.169.231', port=3306,
                     user='piggy', passwd='piggy', db='piggy')
cursor = db.cursor()

# 1. adfirst + sname 으로 검색 없으면 2
# 2. adSecond + sname 으로 검색 없으면 3
# 3. sname 으로 검색 없으면 ""


def save(img, sname, sid):
    if('/' in sname):
        sname = sname.replace('/', '&')
    imgUrl = img['data-source']
    saveimg = ""
    imageColumn = ""
    try:
        with urlopen(imgUrl) as f:
            with open('./img/' + sname + '.jpg', 'wb') as h:  # w - write b - binary
                saveimg = f.read()
                h.write(saveimg)
                imageColumn = upload.upload_to_bucket(saveimg, sname+".jpg")
        # print(imageColumn)
        cursor.execute(
            "UPDATE store set image = %s where s_id = %s ",
            (imageColumn, sid)
        )

        print("다운로드 & 저장 완료 : ", sname)
        db.commit()
    except:
        print("에러 : ", sname)
        pass


def image_search(sname, adFirst, adSecond, sid):
    baseUrl = "https://search.naver.com/search.naver?where=image&sm=tab_jum&query="
    url = baseUrl + quote_plus(adFirst+" "+sname)
    # print(adFirst+" "+sname)
    html = urlopen(url)
    soup = bs(html, "html.parser")
    img = soup.find(class_='_img')

    if img is None:
        url = baseUrl + quote_plus(adSecond+" "+sname)
        # print(adSecond+" "+sname)
        html = urlopen(url)
        soup = bs(html, "html.parser")
        img = soup.find(class_='_img')

        if img is None:
            url = baseUrl + quote_plus(sname)
            # print(sname)
            html = urlopen(url)
            soup = bs(html, "html.parser")
            img = soup.find(class_='_img')

            if img is None:
                print("return")
                return
            else:
                save(img, sname, sid)

        else:
            save(img, sname, sid)
    else:
        save(img, sname, sid)


def sql():
    sql = "select * from store limit 72280, 30000;"
    cursor.execute(sql)
    result = cursor.fetchall()
    sid = []
    sname = []
    address = []
    for store in result:
        sid += store[:1]
        sname += store[8:9]
        address += store[1:2]

    for i in range(len(sname)):
        try:
            image_search(sname[i], address[i].split(" ")[-2],
                         address[i].split(" ")[-3], sid[i])
        except Exception as e:
            print("에러 : ", e)
            pass

    db.close()


sql()
