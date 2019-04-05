# import pandas as pd 
# import requests 
# from requests_html import HTMLSession, user_agent

# from bs4 import BeautifulSoup

# url = 'https://www.amazon.com/Where-Crawdads-Sing-Delia-Owens/dp/0735219095?tag=NYTBS-20'

# def download_book_data_from_url(url):
#     session = HTMLSession()
#     r = session.get(url)
#     r.html.render()
#     soup = BeautifulSoup(r.html.html, "html.parser")
#     filename = url.split('/')[3] + ".html"
#     with open(filename, 'w', encoding="utf-8") as f:
#         f.write(str(soup))

# download_book_data_from_url(url)

# def read_book_html_from_file(html_filename):
#     # where we pull out the price for that book's HTML page
#     # and return it to some df or other data structure
#     pass 

from datetime import datetime, timedelta
starts_date = "02/13/11"
# date_1 = datetime.strptime(start_date, "%m/%d/%y")
# d = date_1 + timedelta(days=7)

# if date_1 > datetime.today():
#     print('true')
# else:
#     print('liar')

start_date = datetime.strptime(starts_date, "%m/%d/%y")
l=[]
while start_date <= datetime.today():
    l.append(start_date)
    start_date = start_date + timedelta(days=7)

print(l[-5:])