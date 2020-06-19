from google.cloud import storage
import os
import datetime as dt


def upload_to_bucket(file, imgname):

    storage_client = storage.Client.from_service_account_json(
        "piggy-credential.json")

    source_file_name = os.path.join("./img", imgname)
    dtime = dt.datetime.now()
    dtString = dtime.strftime("%Y-%m-%d-%H%M%S")

    filename = "%s/%s-%s" % ("store2", dtString, imgname)

    bucket = storage_client.bucket("piggy02301")
    blob = bucket.blob(filename)
    blob.upload_from_filename(source_file_name)

    # image 컬럼에 넣어줘야하는 값 https://storage.googleapis.com/download/storage/v1/b/piggy02301/o/store%2F2020-06-08-011916-Madeleine.jpg?generation=1591546759397141&alt=media
    return blob.media_link
