import requests
import pandas as pd
import re
from bs4 import BeautifulSoup
from requests_html import HTMLSession, user_agent
from tqdm import tqdm
import subprocess
from datetime import datetime, timedelta
import csv
import os
import glob
import numpy as np
import pickle

# function to read html and gather the prices for each book in the htmlFolder
price_dict = []
count = 0
def read_html_find_price(html_file):
    with open(html_file, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, "html.parser")
    try:
        prices = soup.find('ul', {"class": "a-unordered-list a-nostyle a-button-list a-horizontal"})\
        .find_all("span", {"class": "a-button-inner"})
    except Exception as e:
        print('no soup for u', e, html_file) 
    results = {}
    strip_name = html_file.split('\\')[-1].strip()
    name = strip_name.split('.')[0].strip()
    for p in prices:
        if "Kindle" in p.get_text():
            try:
                result = re.findall('\$\d{1,}\.\d{1,}', p.get_text())
                results['Kindle'] = result[0].strip('[')
            except: ''
        elif "Hardcover" in p.get_text():
            try:
                result = re.findall('\$\d{1,}\.\d{1,}', p.get_text())
                results['Hardcover'] = result[0].strip('[')
            except: ''
        elif "Paperback" in p.get_text():
            try:
                result = re.findall('\$\d{1,}\.\d{1,}', p.get_text())
                results['Paperback'] = result[0].strip('[')
            except: ''
        elif "Audio" in p.get_text(): 
            try:
                result = re.findall('\$\d{1,}\.\d{1,}', p.get_text())
                results['Audio'] = result[0].strip('[')
            except: ''
        results['Title'] = name
    price_dict.append(results)
    
# only run the function on valid HTML files (some amazon links no longer exist (less than 5%))
existing_files = [x for x in glob.glob('htmlFolder/*.html')]
for files in existing_files:
    if os.path.getsize(files) > 2500:
        try:
            read_html_find_price(files)
        except: ""
    else:
        'ignore'
    

#pickle the results
with open('amazon_prices1.pkl', 'wb') as f:
    pickle.dump(price_dict, f, pickle.HIGHEST_PROTOCOL)

with open('amazon_prices1.pkl','rb') as handle:
    b = pickle.load(handle)
print(price_dict == b)

