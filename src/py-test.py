from datetime import time
import AmazonProductScrapper as aps
df = aps.load_Amazon_product_data("hoodies")

print(df)
#time.sleep(232322)