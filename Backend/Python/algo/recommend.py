import pandas as pd
import datetime
import data

def convert_recommend(svd_preds, ori_posts):
    print("########## user_recommend_start ##########")

    df = pd.DataFrame(columns=['u_id','stores', 'update_time_at'])
    for user in svd_preds.index:

        sort_user_pred = svd_preds.loc[user].sort_values(ascending=False)
        user_data = ori_posts[ori_posts.u_id == user]

        pred_store = [int(idx) for idx in sort_user_pred[sort_user_pred > -0.05].index]
        for id in user_data['s_id']:
            if id in pred_store:
                pred_store.remove(id)

        result = ""
        for id in pred_store[0:30]:
            result = result + str(id) + ","

        now = datetime.datetime.now()
        df = df.append(pd.DataFrame([[user, result, now.strftime('%Y-%m-%d %H:%M:%S')]], columns=['u_id', 'stores', 'update_time_at']), ignore_index=True)

    return df

def convert_area(svd_preds, ori_posts, ori_stores):

    print("########## area_recommend_start ##########")
    stores = ori_stores[ori_stores['s_id'].isin(ori_posts['s_id'])]
    area = stores['r_id'].value_counts().index
    print(stores)

    df = pd.DataFrame(columns=['u_id', 'region_r_id', 'stores', 'update_time_at'])
    for user in svd_preds.index:
        sort_user_pred = svd_preds.loc[user].sort_values(ascending=False)
        user_data = ori_posts[ori_posts.u_id == user].sort_values(['is_like'], ascending=False)

        user_stores = ori_stores[ori_stores['s_id'].isin(user_data['s_id'])]
        user_area = user_stores['r_id'].value_counts().index

        user_history = user_data.merge(ori_stores, on='s_id').sort_values(['is_like'], ascending=False)
        user_recommend = ori_stores[~ori_stores['s_id'].isin(user_history['s_id'])]

        for area in user_area:
            area_recommend = user_recommend[user_recommend.r_id == area]
            recommendation = area_recommend.merge(pd.DataFrame(sort_user_pred).reset_index(), on='s_id')
            recommendation = recommendation.rename(columns = {user: 'Predictions'}).sort_values(['Predictions'], ascending=False)
            if not recommendation.empty:
                break

        result = ""
        for id in recommendation['s_id'].head(30):
            result = result + str(id) + ","

        now = datetime.datetime.now()
        df = df.append(pd.DataFrame([[user, user_area[0], result, now.strftime('%Y-%m-%d %H:%M:%S')]], columns=['u_id', 'region_r_id', 'stores', 'update_time_at']), ignore_index=True)

    return df

def convert_matching(svd_preds, ori_posts):

    print("########## user_matching_start ##########")
    df = pd.DataFrame(columns=['self', 'friend', 'similarity', 'recommend_stores', 'new_stores', 'update_time_at'])
    for user in svd_preds.index:
        for target in svd_preds.index:
            if user == target:
                continue

            sort_user_pred = (svd_preds.loc[user] + svd_preds.loc[target]).sort_values(ascending=False)
            user_pred_store = [int(idx) for idx in sort_user_pred[sort_user_pred > -0.05].index]
            all_pred_store = [int(idx) for idx in svd_preds.columns]
            user_data = ori_posts[ori_posts.u_id == user]
            target_data = ori_posts[ori_posts.u_id == target]
            merge_data = pd.concat([user_data, target_data])
            merge_data = merge_data.drop_duplicates(["s_id"])
            
            for id in merge_data['s_id']:
                if id in user_pred_store:
                    user_pred_store.remove(id)
                    all_pred_store.remove(id)

            recommendStore = ""
            for id in user_pred_store[0:30]:
                recommendStore = recommendStore + str(id) + ","

            newStores = ""
            for id in all_pred_store[0:30]:
                newStores = newStores + str(id) + ","

            usimilar = 50 + user
            tsimilar = 0.03 * target
            similarity = usimilar + tsimilar
            
            now = datetime.datetime.now()
            df = df.append(pd.DataFrame([[user, target, similarity, recommendStore, newStores, now.strftime('%Y-%m-%d %H:%M:%S')]], 
            columns=['self', 'friend', 'similarity', 'recommend_stores', 'new_stores', 'update_time_at']), ignore_index=True)

    return df
