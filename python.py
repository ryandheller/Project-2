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
date_list=[]
while start_date <= datetime.today():
    date_list.append(start_date)
    start_date = start_date + timedelta(days=7)
print(date_list[-5:])
def make_url(date):
    url = f"https://api.nytimes.com/svc/books/v3/lists/{date}/combined-print-and-e-book-fiction.json?api-key={api_key}"
    

urld = 'https://api.nytimes.com/svc/books/v3/lists/2019-03-03/combined-print-and-e-book-fiction.json?api-key=REVeQu6ErJR69xuO8n21kyuUA0Xt4lV1'

resps = requests.get(urld)
data = resps.json()
books = data.get('results').get('books')
dicts=[]
amazon_urls = []
for book in books:
    rank = book.get('rank')
    title = book.get('title')
    author = book.get('author')
    amazon_url = book.get('amazon_product_url')
    book_dict={"rank":rank,"title":title,"author":author,"amazon_url":amazon_url}
    dicts.append(book_dict)
    amazon_urls.append(amazon_url)
dicts

df = pd.DataFrame.from_records(dicts)
url = 'https://www.amazon.com/Where-Crawdads-Sing-Delia-Owens/dp/0735219095?tag=NYTBS-20'
htmls = []
def download_book_data_from_url(url):
    session = HTMLSession()
    r = session.get(url)
    r.html.render()
    soup = BeautifulSoup(r.html.html, "html.parser")
    filename = url.split('/')[3] + ".html"
    htmls.append(filename)
    with open(filename, 'w', encoding="utf-8") as f:
        f.write(str(soup))


for url in amazon_urls:
    try:
        download_book_data_from_url(url)
        print('ok i got {}'.format(url))
    except Exception as e:
        print(url, e)
print(htmls[:5])

def read_html_find_price(html_file):
    with open(html_file, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, "html.parser")
    prices = soup.find('ul', {"class": "a-unordered-list a-nostyle a-button-list a-horizontal"})\
    .find_all("span", {"class": "a-button-inner"})
    results = {}
    for p in prices:
        if "Kindle" in p.get_text():
            results['Kindle'] = re.findall('\$\d{1,}\.\d{1,}', p.get_text())
        elif "Hardcover" in p.get_text():
            results['Hardcover'] = re.findall('\$\d{1,}\.\d{1,}', p.get_text())
        elif "Paperback" in p.get_text():
            results['Paperback'] = re.findall('\$\d{1,}\.\d{1,}', p.get_text())
        elif "Audio" in p.get_text():
            results['Audio'] = re.findall('\$\d{1,}\.\d{1,}', p.get_text())
    return results

# for html in htmls:
#    print(read_html_find_price(html))
d = datetime.today() - timedelta(days=7)
# soup = read_html_find_price('Where-Crawdads-Sing-Delia-Owens.html')
# price_block = soup.find('ul', {"class": "a-unordered-list a-nostyle a-button-list a-horizontal"}).get_text()
# first_price = re.findall('\$\d{1,}\.\d{1,}', price_block)[0]

# prices = soup.find('ul', {"class": "a-unordered-list a-nostyle a-button-list a-horizontal"})\
#     .find_all("span", {"class": "a-button-inner"})

# results = {}

# for p in prices:
#     if "Kindle" in p.get_text():
#         results['Kindle'] = re.findall('\$\d{1,}\.\d{1,}', p.get_text())
#     elif "Hardcover" in p.get_text():
#         results['Hardcover'] = re.findall('\$\d{1,}\.\d{1,}', p.get_text())
#     elif "Paperback" in p.get_text():
#         results['Paperback'] = re.findall('\$\d{1,}\.\d{1,}', p.get_text())
#     elif "Audio" in p.get_text():
#         results['Audio'] = re.findall('\$\d{1,}\.\d{1,}', p.get_text())

# from bs4 import BeautifulSoup
# _url = 'https://www.amazon.com/Where-Crawdads-Sing-Delia-Owens/dp/0735219095?tag=NYTBS-20'
# headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
# responsed = requests.get(_url, headers=headers)
# soups = BeautifulSoup(responsed.content, 'html.parser')
# soups



# session = HTMLSession()

# TODAY = datetime.today().strftime('%Y_%m_%d')

# terms = ["baby+carrier", "baby+carriers", "lillebaby", 
#          "ergobaby", "tula+baby", "infantino", "toddler+carrier"]

# url_template = "https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords={}"
# urls = [url_template.format(x) for x in terms]

# records = [(x, x.split("=")[-1].replace("+", "_") +"_____" + TODAY) for x in urls]



# url = 'https://www.amazon.com/Where-Crawdads-Sing-Delia-Owens/dp/0735219095?tag=NYTBS-20

# def download_book_data_from_url(url):
#     r = session.get(url)
#     r.html.render()
#     soup = BeautifulSoup(r.html.html, "html.parser")
#     filename = url.split('/')[3] + ".html"
#     with open(filename, 'w') as f:
#         f.write(str(soup))

# def read_book_html_from_file(html_filename):
#     # where we pull out the price for that book's HTML page
#     # and return it to some df or other data structure
#     pass 



# all these URLS in a df, 

# mop = soup.find('span',{'id','a-autoid-6'})
# print(mop)
# prices = []
# new_amazon = []
# for url in amazon_urls:
#     urld = f"'{url}'"
#     new_amazon.append(url)
# new_amazons = [new_amazon[0],new_amazon[1],new_amazon[2]]
# for url in new_amazons:
#     r = session.get(url)
#     r.html.render()
#     soup = BeautifulSoup(r.html.html, "html.parser")
#     #top = soup.findAll('span',{'class','a-button-inner'})
#     #pop = soup.findAll('span',{'class','a-size-base a-color-secondary'})
#     rop = soup.findAll('span')
#     price = pop[1]
#     prices.append(price)
    

# print(prices)