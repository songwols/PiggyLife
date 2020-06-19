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
    df = pd.DataFrame(columns=['u_id', 'region_r_id', 'stores', 'update_time_at'])
    for user in svd_preds.index:
        sort_user_pred = svd_preds.loc[user].sort_values(ascending=False)
        user_data = ori_posts[ori_posts.u_id == user].sort_values(['is_like'], ascending=False)

        user_stores = ori_stores[ori_stores['s_id'].isin(user_data['s_id'])]
        user_area = user_stores['r_id'].value_counts().index

        user_history = user_data.merge(ori_stores, on='s_id').sort_values(['is_like'], ascending=False)
        user_recommend = ori_stores[~ori_stores['s_id'].isin(user_history['s_id'])]

        area_recommend = user_recommend[user_recommend.r_id == user_area[0]]
        recommendation = area_recommend.merge(pd.DataFrame(sort_user_pred).reset_index(), on='s_id')
        recommendation = recommendation.rename(columns = {user: 'Predictions'}).sort_values(['Predictions'], ascending=False)
        if len(recommendation) < 10:
            add_stores = ori_stores[ori_stores.r_id == user_area[0]]
            recommendation = pd.concat([recommendation, add_stores.sample(n=10)])

        result = ""
        for id in recommendation['s_id'].head(30):
            result = result + str(id) + ","

        now = datetime.datetime.now()
        df = df.append(pd.DataFrame([[user, user_area[0], result, now.strftime('%Y-%m-%d %H:%M:%S')]], columns=['u_id', 'region_r_id', 'stores', 'update_time_at']), ignore_index=True)

    return df

def convert_matching(svd_preds, ori_posts, ori_stores):

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

            user_stores = ori_stores[ori_stores['s_id'].isin(user_data['s_id'])]
            target_stores = ori_stores[ori_stores['s_id'].isin(target_data['s_id'])]

            idx = 0
            user_rate = 0
            for udx in user_stores.index:
                rate = len(target_stores)
                for tdx in target_stores.index:
                    ustore = user_stores.loc[udx]
                    tstore = target_stores.loc[tdx]

                    if ustore.s_id == tstore.s_id:
                        rate = len(target_stores)
                        break
                    if not any(store in ustore.category_group for store in tstore.category_group.split('|')[:-1]):
                        rate = rate - 0.5
                    if ustore.r_id != tstore.r_id:
                        rate = rate - 0.5

                user_rate = user_rate + (rate / len(target_stores))
                idx = idx + 1

            user_rate = 50 * user_rate / len(user_stores)

            idx = 0
            target_rate = 0
            for tdx in target_stores.index:
                rate = len(user_stores)
                for udx in user_stores.index:
                    tstore = target_stores.loc[tdx]
                    ustore = user_stores.loc[udx]

                    if tstore.s_id == ustore.s_id:
                        rate = len(user_stores)
                        break

                    if not any(store in tstore.category_group for store in ustore.category_group.split('|')[:-1]):
                        rate = rate - 0.5
                    if tstore.r_id != ustore.r_id:
                        rate = rate - 0.5

                target_rate = target_rate + (rate / len(user_stores))
                idx = idx + 1
            target_rate = 50 * target_rate / len(target_stores)

            similarity = round(user_rate + target_rate, 2)
            
            now = datetime.datetime.now()
            df = df.append(pd.DataFrame([[user, target, similarity, recommendStore, newStores, now.strftime('%Y-%m-%d %H:%M:%S')]], 
            columns=['self', 'friend', 'similarity', 'recommend_stores', 'new_stores', 'update_time_at']), ignore_index=True)

    return df
