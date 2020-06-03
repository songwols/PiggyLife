import json
import pandas as pd
import os
import shutil

import string
import random

# date time
from datetime import datetime

DATA_DIR = "./Backend/Python/data"
DATA_FILE = os.path.join(DATA_DIR, "data.json")
DUMP_FILE = os.path.join(DATA_DIR, "dump.pkl")

store_columns = (
    "id",  # 음식점 고유번호
    "region_tags",  # 구
    "r_id", # 지역 아이디
    "store_name",  # 음식점 이름
    "branch",  # 음식점 지점 여부
    "area",  # 음식점 위치
    "tel",  # 음식점 번호
    "address",  # 음식점 주소
    "latitude",  # 음식점 위도
    "longitude",  # 음식점 경도
    "category",  # 음식점 카테고리
)

# menu
menu_columns = (
    "store",  # 음식점 고유 번호
    "menu_name",  # 메뉴 이름
    "price",  # 가격
)


# region_tags
region_tags_cloumns = (
    "city", # 시도
    "area",  # 시군구
    "id",  # region_tag_id --> 사용되지 않음
)


def import_data(data_path=DATA_FILE):
    try:
        with open(data_path, encoding="utf-8") as f:
            data = json.loads(f.read())
    except FileNotFoundError as e:
        print(f"`{data_path}` 가 존재하지 않습니다.")
        exit(1)

    stores = []  # 음식점 테이블
    menus = []  # 메뉴 테이블
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
    kyunggi_area = {"가평군": 0, "고양시": 1, "과천시": 2, "광명시": 3, "광주시":4 ,"구리시": 5, "군포시": 6, "김포시": 7, "남양주시": 8,
                    "동두천시": 9, "부천시": 10, "성남시": 11, "수원시": 12, "시흥시": 13, "안산시": 14, "안성시": 15, "안양시": 16,
                    "양주시": 17, "양평군": 18, "여주시": 19, "연천군": 20, "오산시": 21, "용인시": 22, "의왕시": 23, "의정부시": 24,
                     "이천시": 25,"파주시":26,"평택시":27,"포천시":28,"하남시":29,"화성시":30}
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

    #r_id 값 넣기
    region_list = ["서울특별시|강남구","서울특별시|강동구","서울특별시|강북구","서울특별시|강서구","서울특별시|관악구","서울특별시|광진구","서울특별시|구로구",
        "서울특별시|금천구","서울특별시|노원구","서울특별시|도봉구","서울특별시|동대문구","서울특별시|동작구","서울특별시|마포구","서울특별시|서대문구","서울특별시|서초구",
        "서울특별시|성동구","서울특별시|성북구","서울특별시|송파구","서울특별시|양천구","서울특별시|영등포구","서울특별시|용산구","서울특별시|은평구",
        "서울특별시|종로구","서울특별시|중구","서울특별시|중랑구","서울특별시|강서구",
        "부산광역시|금정구","부산광역시|금정구","부산광역시|기장군","부산광역시|남구","부산광역시|동구","부산광역시|부산진구","부산광역시|북구","부산광역시|사상구",
        "부산광역시|사하구","부산광역시|서구","부산광역시|수영구","부산광역시|연제구","부산광역시|영도구","부산광역시|중구","부산광역시|해운대구",
        "대구광역시|남구","대구광역시|달서구","대구광역시|달성군","대구광역시|동구","대구광역시|북구","대구광역시|서구","대구광역시|수성구","대구광역시|중구",
        "인천광역시|강화군","인천광역시|계양구","인천광역시|남동구","인천광역시|동구","인천광역시|미추홀구","인천광역시|부평구","인천광역시|서구","인천광역시|연수구",
        "인천광역시|옹진군","인천광역시|중구",
        "광주광역시|광산구","광주광역시|남구","광주광역시|동구","광주광역시|북구","광주광역시|서구",
        "대전광역시|대덕구","대전광역시|동구","대전광역시|서구","대전광역시|유성구","대전광역시|중구",
        "울산광역시|남구","울산광역시|동구","울산광역시|북구","울산광역시|울주군","울산광역시|중구",
        "세종특별자치시|"
        "경기도|가평군","경기도|고양시","경기도|과천시","경기도|광명시","경기도|광주시","경기도|구리시","경기도|군포시","경기도|김포시","경기도|남양주시","경기도|동두천시","경기도|부천시",
        "경기도|성남시","경기도|수원시","경기도|시흥시","경기도|안산시","경기도|안성시","경기도|안양시","경기도|양주시","경기도|양평군","경기도|여주시","경기도|연천군",
        "경기도|오산시","경기도|용인시","경기도|의왕시","경기도|의정부시","경기도|이천시","경기도|파주시","경기도|평택시","경기도|포천시","경기도|하남시","경기도|화성시",
        "강원도|강릉시","강원도|고성군","강원도|동해시","강원도|삼척시","강원도|속초시","강원도|양구군","강원도|양양군","강원도|영월군","강원도|원주시","강원도|인제군",
        "강원도|정선군","강원도|철원군","강원도|춘천시","강원도|태백시","강원도|평창군","강원도|홍천군","강원도|화천군","강원도|횡성군",
        "충청북도|괴산군","충청북도|단양군","충청북도|보은군","충청북도|영동군","충청북도|옥천군","충청북도|음성군","충청북도|제천시","충청북도|증평군","충청북도|진천군",
        "충청북도|청주군","충청북도|충주군",
        "충청남도|계룡시","충청남도|공주시","충청남도|금산군","충청남도|논산시","충청남도|당진시","충청남도|보령시","충청남도|부여군","충청남도|서산시","충청남도|서천군",
        "충청남도|아산시","충청남도|예산군","충청남도|천안시","충청남도|청양군","충청남도|태안군","충청남도|홍성군",
        "전라북도|고창군","전라북도|군산시","전라북도|김제시","전라북도|남원시","전라북도|무주군","전라북도|부안군","전라북도|순창군","전라북도|완주군","전라북도|익산시",
        "전라북도|임실군","전라북도|장수군","전라북도|전주시","전라북도|정읍시","전라북도|진안군",
        "전라남도|강진군","전라남도|고흥군","전라남도|곡성군","전라남도|광양시","전라남도|구례군","전라남도|나주시","전라남도|담양군","전라남도|목포시","전라남도|무안군",
        "전라남도|보성군","전라남도|순천시","전라남도|신안군","전라남도|여수시","전라남도|영광군","전라남도|영암군","전라남도|완도군","전라남도|장성군","전라남도|장흥군",
        "전라남도|진도군","전라남도|함평군","전라남도|해남군","전라남도|화순군",
        "경상북도|경산시","경상북도|경주시","경상북도|고령군","경상북도|구미시","경상북도|군위군","경상북도|김천시","경상북도|문경시","경상북도|봉화군","경상북도|상주시",
        "경상북도|성주군","경상북도|안동시","경상북도|영덕군","경상북도|영양군","경상북도|영주시","경상북도|영천시","경상북도|예천군","경상북도|울릉군","경상북도|울진군",
        "경상북도|의성군","경상북도|청도군","경상북도|청송군","경상북도|칠곡군","경상북도|포항시",
        "경상남도|거제시","경상남도|거창군","경상남도|고성군","경상남도|김해시","경상남도|남해군","경상남도|밀양시","경상남도|사천시","경상남도|산청군","경상남도|양산시",
        "경상남도|의령군","경상남도|진주시","경상남도|창녕군","경상남도|창원시","경상남도|통영시","경상남도|하동군","경상남도|함안군","경상남도|함양군","경상남도|합천군",
        "제주특별자치도|서귀포시","제주특별자치도|제주시"
    ] 

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
        
        if type(region_dict.get(region[0]))== int and region_dict.get(region[0])>=0  :
            #구역 코드 넣기
            #세종특별자치시 예외처리
            if region[0] == '세종특별자치시':
                region_tag = region[0]+'|'
            else:
                region_tag = region[0]+'|'+region[1]

                
            #구역 id => r_id 넣기
            if region_tag in region_list:
                r_id = region_list.index(region_tag)+1
            else:
                continue

            stores.append(
                [
                    d["id"],
                    region_tag,
                    r_id,
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
            for menu in d["menu_list"]:
                if menu["price"] == None:
                    continue
                menus.append(
                    [d["id"], menu["menu"], menu["price"]]
                )

    store_frame = pd.DataFrame(data=stores, columns=store_columns)
    menu_frame = pd.DataFrame(data=menus, columns=menu_columns)
    region_tag_frame = pd.DataFrame(
        data=region_tags, columns=region_tags_cloumns)

    return {"stores": store_frame, "menus": menu_frame, "region_tags": region_tag_frame}


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

    print("[메뉴]")
    print(f"{separater}\n")
    print(data["menus"].head())
    print(f"\n{separater}\n\n")

    print("[구역 태그]")
    print(f"{separater}\n")
    print(data["region_tags"])
    print(f"\n{separater}\n\n")


if __name__ == "__main__":
    main()
