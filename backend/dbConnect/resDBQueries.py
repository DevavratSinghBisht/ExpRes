from utils.cryptographyUtils import get_encoding
from utils.cryptographyUtils import generate_keys
from model.resDBReq.assetData import AssetData

from dbConnect.resDBConnect import ResDBConnect
from dbConnect.mongoConnect import MongoConnect

class ResDBQueries:
    def __init__(self):
        self.resDBConnect = ResDBConnect()
        self.mongoConnect = MongoConnect()

    def saveMessageinResDB(self, message : str):
        signer_private_key, signer_public_key = generate_keys()
        recipient_public_key = get_encoding(signer_public_key)

        if message.isForwarded:
           asset_data = AssetData()
           AssetData.transaction_id = self.mongoConnect.getPostFromMongo(message)


        query = self.resDBConnect.build_post_query_payload("SaveMessageInResDB",
                      50, signer_public_key,signer_private_key,
                      recipient_public_key, asset_data)
        data = self.resDBConnect.execute(query)

        return data

    def getMessageFromResDB(self, transaction_id: str):
        query = (self.resDBConnect.
                 build_get_query_payload("GetMessageFromResDB",transaction_id))
        data = self.resDBConnect.execute(query)
        return data








