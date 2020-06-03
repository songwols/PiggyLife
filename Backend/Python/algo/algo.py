from sklearn.metrics.pairwise import cosine_similarity
from sklearn.decomposition import TruncatedSVD
from scipy.sparse.linalg import svds

import pandas as pd
import numpy as np
import data
import datetime

stores = data.getStore()
print(stores.head())

posts = data.getPost()
print(type(posts))
print(posts.head())

user_store_rating = posts.pivot(index='u_id', columns='s_id', values='is_like').fillna(0)
print(user_store_rating.head())

# pivot table 값을 numpy matrix로
matrix = user_store_rating.as_matrix()
# 사용자 평균 평점
user_ratings_mean = np.mean(matrix, axis=1)
# 사용자-가게에 대해 평균 평점 뺀것
matrix_user_mean = matrix - user_ratings_mean.reshape(-1, 1)


U, sigma, Vt = svds(matrix_user_mean, k=5)
sigma = np.diag(sigma)

svd_user_predicted_ratings = np.dot(np.dot(U, sigma), Vt) + user_ratings_mean.reshape(-1, 1)
svd_preds = pd.DataFrame(svd_user_predicted_ratings, columns=user_store_rating.columns, index=user_store_rating.index)
print(svd_preds.head())

df = pd.DataFrame(columns=['u_id','stores', 'update_time_at'])
for user in svd_preds.index:
    # 해당 유저의 영화 평점이 높은 순으로 정렬
    sort_user_pred = svd_preds.loc[user].sort_values(ascending=False)
    # 원본 평점 데이터에서 user에 해당하는 데이터 뽑아냄
    user_data = posts[posts.u_id == user]
    # 위에서 뽑은 데이터를 원본데이터와 합침
    user_history = user_data.merge(stores, on='s_id').sort_values(['is_like'], ascending=False)
    # 원본 영화에서 사용자가 본 영화 데이터를 제외한 데이터를 추출
    recommendations = stores[~stores['s_id'].isin(user_history['s_id'])]
    # 사용자의 영화 평점이 높은 순으로 정렬된 데이터와 위의 데이터를 합침
    recommendations = recommendations.merge(pd.DataFrame(sort_user_pred).reset_index(), on='s_id')
    # 컬럼 이름을 바꾸고 정렬해서 return
    recommendations = recommendations.rename(columns = {user: 'Predictions'}).sort_values(['Predictions'], ascending=False)

    # print(user_history)
    # print(recommendations[recommendations['Predictions']>0])
    # print(recommendations[recommendations['Predictions']>0]['s_id'])

    result = ""
    for id in recommendations['s_id'].head(30):
        result = result + str(id) + ","
    print(result)

    now = datetime.datetime.now()
    df = df.append(pd.DataFrame([[user, result, now.strftime('%Y-%m-%d %H:%M:%S')]], columns=['u_id', 'stores', 'update_time_at']), ignore_index=True)

df.set_index('u_id', drop=True, inplace=True)
print(df)

data.save_recommendation(df)

