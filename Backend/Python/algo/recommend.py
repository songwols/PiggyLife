import pandas as pd
import datetime
import data

def convert_recommend(svd_preds, ori_posts, ori_stores):
    df = pd.DataFrame(columns=['u_id','stores', 'update_time_at'])
    for user in svd_preds.index:
        sort_user_pred = svd_preds.loc[user].sort_values(ascending=False)
        print(sort_user_pred)
        user_data = ori_posts[ori_posts.u_id == user]
        user_history = user_data.merge(ori_stores, on='s_id').sort_values(['is_like'], ascending=False)
        recommendations = ori_stores[~ori_stores['s_id'].isin(user_history['s_id'])]
        recommendations = recommendations.merge(pd.DataFrame(sort_user_pred).reset_index(), on='s_id')
        recommendations = recommendations.rename(columns = {user: 'Predictions'}).sort_values(['Predictions'], ascending=False)

        result = ""
        for id in recommendations['s_id'].head(30):
            result = result + str(id) + ","

        now = datetime.datetime.now()
        df = df.append(pd.DataFrame([[user, result, now.strftime('%Y-%m-%d %H:%M:%S')]], columns=['u_id', 'stores', 'update_time_at']), ignore_index=True)

    return df

def convert_matching(user, target):

    svd_preds = data.getPredict()
    # stores = data.getStore()
    posts = data.getPost()

    svd_preds.columns.name = "s_id"
    sort_user_pred = (svd_preds.loc[user] + svd_preds.loc[target]).sort_values(ascending=False)
    pred_store = [int(idx) for idx in sort_user_pred[sort_user_pred > 0].index]
    user_data = posts[posts.u_id == user]
    target_data = posts[posts.u_id == target]
    merge_data = pd.concat([user_data, target_data])

    for id in merge_data['s_id']:
        if id in pred_store:
            pred_store.remove(id)

    return pred_store[0:30]

    # df = pd.DataFrame(columns=['self', 'friend', 'stores', 'update_time_at'])
    # result = ""
    # for id in pred_store:
    #     result = result + str(id) + ","
    # now = datetime.datetime.now()
    # df = df.append(pd.DataFrame([[user, target, result, now.strftime('%Y-%m-%d %H:%M:%S')]], columns=['self', 'friend', 'stores', 'update_time_at']), ignore_index=True)
    # print(df)
