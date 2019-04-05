import requests
import pandas as pd
import re
from bs4 import BeautifulSoup
from requests_html import HTMLSession, user_agent
from tqdm import tqdm
import subprocess
from datetime import datetime, timedelta

api_key = "REVeQu6ErJR69xuO8n21kyuUA0Xt4lV1"
starts_date = "02/13/11"
start_date = datetime.strptime(starts_date, "%m/%d/%y")
# yo = star_date.strftime('%Y-%m-%d')
date_list=[]
while start_date <= datetime.today():
    date_list.append(start_date.strftime('%Y-%m-%d'))
    start_date = (start_date + timedelta(days=7))
def make_url(date):
    url = f"https://api.nytimes.com/svc/books/v3/lists/{date}/combined-print-and-e-book-fiction.json?api-key={api_key}"
    return url
api_urls = []
for date in date_list:
    api_url = make_url(date)
    api_urls.append(api_url)

book_list = []
for api in api_urls[:5]:
    resps = requests.get(api)
    data = resps.json()
    books = data.get('results').get('books')
    book_list.append(books)
print(book_list[0])
# dicts=[]
# amazon_urls = []
# for book in books:
#         rank = book.get('rank')
#         title = book.get('title')
#         author = book.get('author')
#         amazon_url = book.get('amazon_product_url')
#         book_dict={"rank":rank,"title":title,"author":author,"amazon_url":amazon_url}
#         dicts.append(book_dict)
#         amazon_urls.append(amazon_url)
print(dicts[0])
# https://api.nytimes.com/svc/books/v3/lists.json?list=combined-print-and-e-book-fiction&published-date=2019-03-30&api-key=[YOUR_API_KEY]
# https://api.nytimes.com/svc/books/v3/lists/2011-02-13 00:00:00/combined-print-and-e-book-fiction.json?api-key=REVeQu6ErJR69xuO8n21kyuUA0Xt4lV1
# https://api.nytimes.com/svc/books/v3/lists/2019-03-03/combined-print-and-e-book-fiction.json?api-key=REVeQu6ErJR69xuO8n21kyuUA0Xt4lV1