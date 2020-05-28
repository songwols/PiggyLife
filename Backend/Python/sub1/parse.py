import json
import pandas as pd
import os
import shutil

import string
import random

# date time
from datetime import datetime

DATA_DIR = "./data"
DATA_FILE = os.path.join(DATA_DIR, "data.json")
DUMP_FILE = os.path.join(DATA_DIR, "dump.pkl")

store_columns = (
    "id",  # 음식점 고유번호
    "region_tags",  # 구
    "store_name",  # 음식점 이름
    "branch",  # 음식점 지점 여부
    "area",  # 음식점 위치
    "tel",  # 음식점 번호
    "address",  # 음식점 주소
    "latitude",  # 음식점 위도
    "longitude",  # 음식점 경도
    "category",  # 음식점 카테고리
)

review_columns = (
    "id",  # 리뷰 고유번호
    "store",  # 음식점 고유번호
    "user",  # 유저 고유번호
    "score",  # 평점
    "content",  # 리뷰 내용
    "reg_time",  # 리뷰 등록 시간
)

# menu
menu_columns = (
    "store",  # 음식점 고유 번호
    "menu_name",  # 메뉴 이름
    "price",  # 가격
)

# user
user_columns = (
    "id",  # user id
    "gender",  # 성별
    "age",  # 나이
    "email",  # 이메일
    "pwd",  # 패스워드
    "create_account",  # 계정 개설일
    "update_account",  # 계정 수정일
    "tag",  # 관심사
    "nick_name",  # 닉네임
)

# region_tags
region_tags_cloumns = (
    "city", # 시도
    "area",  # 시군구
    "id",  # region_tag_id
)


def import_data(data_path=DATA_FILE):
    """
    Req. 1-1-1 음식점 데이터 파일을 읽어서 Pandas DataFrame 형태로 저장합니다
    """

    try:
        with open(data_path, encoding="utf-8") as f:
            data = json.loads(f.read())
    except FileNotFoundError as e:
        print(f"`{data_path}` 가 존재하지 않습니다.")
        exit(1)

    stores = []  # 음식점 테이블
    reviews = []  # 리뷰 테이블
    menus = []  # 메뉴 테이블
    users = []  # user 테이블
    user_set = set()
    year = datetime.today().year  # 올해 년도
    idx = 0
    region_tags = []  # 지역구 테이블
    region_dict = {"서울특별시": 0, "부산광역시": 1, "대구광역시": 2, "인천광역시": 3, "광주광역시": 4,
                   "대전광역시": 5, "울산광역시": 6, "세종특별자치시": 7, "경기도": 8, "강원도": 9, "충청북도": 10,
                   "충청남도": 11, "전라북도": 12, "전라남도": 13, "경상북도": 14, "경상남도": 15, "제주특별자치도": 16}
    soeul_area = {"강남구": 0, "강동구": 1, "강북구": 2, "감서구": 3, "관악구": 4, "광진구": 5, "구로구": 6, "금천구": 7,
                "노원구": 8, "도봉구": 9, "동대문구": 10, "동작구": 11, "마포구": 12, "서대문구": 13, "서초구": 14, "성동구": 15,
                "성북구": 16,"송파구": 17, "양천구": 18, "영등포구": 19, "용산구": 20, "은평구": 21, "종로구": 22,"중구": 23, "중랑구": 24}
    busan_area = {"강서구": 0, "금정구": 1, "기장군": 2, "남구": 3, "동구": 4, "부산진구": 5, "북구": 6, "사상구": 7, "사하구": 8, "서구": 9,
                "수영구": 10, "연제구":11, "영도구":12, "중구":13, "해운대구":14}
    daegu_area = {"남구":0, "달서구":1, "달성군":2, "동구":3, "북구":4, "서구":5, "수성구":6, "중구":7}
    incheon_area = {"강화군":0, "계양구":1, "남동구":2, "동구":3, "미추홀구":4, "부평구":5,"서구":6,"연수구":7,"옹진군":8,"중구":9}
    gwangju_area = {"광산구":0,"남구":1,"동구":2,"북구":3,"서구":4}
    daejeon_area = {"대덕구":0,"동구":1,"서구":2,"유성구":3,"중구":4}
    ulsan_area = {"남구":0,"동구":1,"북구":2,"울주군":3,"중구":4}
    #세종특별자치시 시군구 X
    kyunggi_area = {"가평군": 0, "고양시": 1, "과천시": 2, "광명시": 3, "구리시": 4, "군포시": 5, "김포시": 6, "남양주시": 7,
                    "동두천시": 8, "부천시": 9, "성남시": 10, "수원시": 11, "시흥시": 12, "안산시": 13, "안성시": 14, "안양시": 15,
                    "양주시": 16, "양평군": 17, "여주시": 18, "연천군": 19, "오산시": 20, "용인시": 21, "의왕시": 22, "의정부시": 23,
                     "이천시": 24,"파주시":25,"평택시":26,"포천시":27,"하남시":28,"화성시":29}
    gangwon_area = {"강릉시": 0, "고성군": 1, "동해시": 2, "삼척시": 3, "속초시": 4, "양구군": 5, "양양군": 6, "영월군": 7, "원주시": 8,
                    "인제군": 9, "정선군":10,"철원군":11,"춘천시":12,"태백시":13,"평창군":14,"홍천군":15,"화천군":16,"횡성군":17}
    choongN_area = {"괴산군": 0, "단양군": 1, "보은군": 2, "영동군": 3, "옥천군": 4, "음성군": 5, "제천시": 6, "증평군": 7, "진천군": 8,
                    "청주군": 9,"충주군": 10}
    choongS_area = {"계룡시": 0, "공주시": 1, "금산군": 2, "논산시": 3, "당진시": 4, "보령시": 5, "부여군": 6, "서산시": 7, "서천군": 8,
                    "아산시": 9, "예산군": 10, "천안시": 11, "청양군": 12, "태안군": 13, "홍성군": 14}
    jeonN_area = {"고창군": 0, "군산시": 1, "김제시": 2, "남원시": 3, "무주군": 4, "부안군": 5, "순창군": 6, "완주군": 7,  "익산시": 8,
                  "임실군": 9, "장수군": 10, "전주시": 11, "정읍시": 12, "진안군": 13}
    jeonS_area = {"강진군": 0, "고흥군": 1, "곡성군": 2, "광양시": 3, "구례군": 4, "나주시": 5, "담양군": 6, "목포시": 7,
                  "무안군": 8, "보성군": 9, "순천시": 10, "신안군": 11, "여수시": 12, "영광군": 13, "영암군": 14, "완도군": 15,
                  "장성군": 16, "장흥군": 17, "진도군": 18, "함평군": 19, "해남군": 20, "화순군": 21}
    kyoungN_area = {"경산시": 0, "경주시": 1, "고령군": 2, "구미시": 3, "군위군": 4, "김천시": 5, "문경시": 6, "봉화군": 7,
                    "상주시": 8, "성주군": 9, "안동시": 10, "영덕군": 11, "영양군": 12, "영주시": 13, "영천시": 14, "예천군": 15,
                    "울릉군": 16, "울진군": 17, "의성군": 18, "청도군": 19, "청송군": 20, "칠곡군": 21, "포항시": 22}
    kyoungS_area = {"거제시": 0, "거창군": 1, "고성군": 2, "김해시": 3, "남해군": 4, "밀양시": 5, "사천시": 6, "산청군": 7,
                    "양산시": 8, "의령군": 9, "진주시": 10, "창녕군": 11, "창원시": 12, "통영시": 13, "하동군": 14, "함안군": 15,
                    "함양군": 16, "합천군": 17}
    jeju_area = {"서귀포시":0,"제주시":1}

    # region 데이터
    for key, value in region_dict.items():
        if key == '서울특별시':
            for area in soeul_area:
                new_value = str(value) + str(soeul_area[area])
                temp = [key, area, new_value]
                region_tags.append(temp)
        elif key == '부산광역시':
            for area in busan_area:
                new_value = str(value) + str(busan_area[area])
                temp = [key, area, new_value]
                region_tags.append(temp)
        elif key == '대구광역시':
            for area in daegu_area:
                new_value = str(value) + str(daegu_area[area])
                temp = [key, area, new_value]
                region_tags.append(temp)
        elif key == '인천광역시':
            for area in incheon_area:
                new_value = str(value) + str(incheon_area[area])
                temp = [key, area, new_value]
                region_tags.append(temp)
        elif key == '광주광역시':
            for area in gwangju_area:
                new_value = str(value) + str(gwangju_area[area])
                temp = [key, area, new_value]
                region_tags.append(temp)
        elif key == '대전광역시':
            for area in daejeon_area:
                new_value = str(value) + str(daejeon_area[area])
                temp = [key, area, new_value]
                region_tags.append(temp)
        elif key == '울산광역시':
            for area in ulsan_area:
                new_value = str(value) + str(ulsan_area[area])
                temp = [key, area, new_value]
                region_tags.append(temp)
        elif key == '세종특별자치시':
            area = None
            temp = [key, area, value]
            region_tags.append(temp)
        elif key == '경기도':
            for area in kyunggi_area:
                new_value = str(value) + str(kyunggi_area[area])
                temp = [key, area, new_value]
                region_tags.append(temp)
        elif key == '강원도':
            for area in gangwon_area:
                new_value = str(value) + str(gangwon_area[area])
                temp = [key, area, new_value]
                region_tags.append(temp)
        elif key == '충청북도':
            for area in choongN_area:
                new_value = str(value) + str(choongN_area[area])
                temp = [key, area, new_value]
                region_tags.append(temp)
        elif key == '충청남도':
            for area in choongS_area:
                new_value = str(value) + str(choongS_area[area])
                temp = [key, area, new_value]
                region_tags.append(temp)
        elif key == '전라북도':
            for area in jeonN_area:
                new_value = str(value) + str(jeonN_area[area])
                temp = [key, area, new_value]
                region_tags.append(temp)
        elif key == '전라남도':
            for area in jeonS_area:
                new_value = str(value) + str(jeonS_area[area])
                temp = [key, area, new_value]
                region_tags.append(temp)
        elif key == '경상북도':
            for area in kyoungN_area:
                new_value = str(value) + str(kyoungN_area[area])
                temp = [key, area, new_value]
                region_tags.append(temp)
        elif key == '경상남도':
            for area in kyoungS_area:
                new_value = str(value) + str(kyoungS_area[area])
                temp = [key, area, new_value]
                region_tags.append(temp)
        elif key == '제주특별자치도':
            for area in jeju_area:
                new_value = str(value) + str(jeju_area[area])
                temp = [key, area, new_value]
                region_tags.append(temp)

    #data 가공
    for d in data:
        categories = [c["category"] for c in d["category_list"]]
        # data에 주소가 없을때
        if d["address"] == None:
            continue

        region = d["address"].split(' ')
        region = [x for x in region if x]  # '' 삭제
        
        #region[0] : 구역
        #region[1] : 시군구
        # if str(d["address"]).find('서울특별시') > -1:
        
        if len(region) == 1:
            # print("too short")
            continue        
        
        if region_dict.get(region[0]):
            #구역 코드 넣기
            region_tag = region[0]+'|'+region[1]

            stores.append(
                [
                    d["id"],
                    region_tag,
                    d["name"],
                    d["branch"],
                    d["area"],
                    d["tel"],
                    d["address"],
                    d["latitude"],
                    d["longitude"],
                    "|".join(categories),
                ]
            )
            for review in d["review_list"]:
                r = review["review_info"]
                u = review["writer_info"]  # user
                reviews.append(
                    [r["id"], d["id"], u["id"], r["score"],
                     r["content"], r["reg_time"]]
                )
                # users내에 user가 존재하면 넣지않는다 --> 중복 데이터제거필요 && age 나이 계산
                if u["id"] not in user_set:
                    # 이메일 생성
                    email = "guest" + str(idx) +"@example.com"  # 임의 이메일 생성
                    nick_name = "User" + str(idx)  # 임의 닉네임 생성
                    idx = idx + 1
                    pwd = create_pwd()  # 임의 패스워드 생성
                    default_year = int(r["reg_time"][0:4])
                    if default_year >= 1970 and default_year <= 2015:
                        create_account = "2015" + r["reg_time"][4:]  # 리뷰일 기준으로 임의 생성
                        update_account = "2015" + r["reg_time"][4:]  # 리뷰일 기준으로 임의 생성
                    else:
                        create_account = r["reg_time"]  # 리뷰일 기준으로 임의 생성
                        update_account = r["reg_time"]  # 리뷰일 기준으로 임의 생성

                    age = (year-int(u["born_year"])) if int(u["born_year"]) > 0 and int(u["born_year"]) < year else 0
                    users.append(
                        [u["id"], u["gender"], age, email, pwd,create_account, update_account, None, nick_name],
                    )
                    user_set.add(u["id"])             

                for menu in d["menu_list"]:
                    menus.append(
                        [d["id"], menu["menu"], menu["price"]]
                    )

    store_frame = pd.DataFrame(data=stores, columns=store_columns)
    review_frame = pd.DataFrame(data=reviews, columns=review_columns)
    menu_frame = pd.DataFrame(data=menus, columns=menu_columns)
    user_frame = pd.DataFrame(data=users, columns=user_columns)
    region_tag_frame = pd.DataFrame(
        data=region_tags, columns=region_tags_cloumns)

    return {"stores": store_frame, "reviews": review_frame, "menus": menu_frame, "users": user_frame, "region_tags": region_tag_frame}


def create_pwd():
    _LENGTH = 10  # 10자리
    string_pool = string.ascii_letters + string.digits + string.punctuation  # 소문자
    result = ""  # 결과값
    for i in range(_LENGTH):
        result += random.choice(string_pool)  # 랜덤한 문자열 하나 선택
    return result


def dump_dataframes(dataframes):
    pd.to_pickle(dataframes, DUMP_FILE)


def load_dataframes():
    return pd.read_pickle(DUMP_FILE)


def main():

    print("[*] Parsing data...")
    data = import_data()
    print("[+] Done")

    print("[*] Dumping data...")
    dump_dataframes(data)
    print("[+] Done\n")

    data = load_dataframes()

    term_w = shutil.get_terminal_size()[0] - 1
    separater = "-" * term_w

    print("[음식점]")
    print(f"{separater}\n")
    print(data["stores"].head())
    print(data["stores"].size)
    print(f"\n{separater}\n\n")

    print("[리뷰]")
    print(f"{separater}\n")
    print(data["reviews"].head())
    print(f"\n{separater}\n\n")

    print("[메뉴]")
    print(f"{separater}\n")
    print(data["menus"].head())
    print(f"\n{separater}\n\n")

    print("[사용자]")
    print(f"{separater}\n")
    print(data["users"].head())
    print(f"\n{separater}\n\n")

    print("[구역 태그]")
    print(f"{separater}\n")
    print(data["region_tags"])
    print(f"\n{separater}\n\n")


if __name__ == "__main__":
    main()
