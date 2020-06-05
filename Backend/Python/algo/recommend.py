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

            similarity = 50.05;
            
            now = datetime.datetime.now()
            df = df.append(pd.DataFrame([[user, target, similarity, recommendStore, newStores, now.strftime('%Y-%m-%d %H:%M:%S')]], 
            columns=['self', 'friend', 'similarity', 'recommend_stores', 'new_stores', 'update_time_at']), ignore_index=True)

    return df
