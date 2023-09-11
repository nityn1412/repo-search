import time

from selenium import webdriver
from selenium.common import ElementClickInterceptedException
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class BaseUtil:

    def __init__(self):
        self.driver = webdriver.Chrome()
        self.driver.get('http://localhost:3000/')
        self.driver.maximize_window()
        # driver.implicitly_wait(10)
        self.wait = WebDriverWait(self.driver, 10)

    def find_presence_of_element(self,path_type, path):
        return self.wait.until(EC.presence_of_element_located((path_type, path)))

    def find_invisibility_of_element(self,path_type, path):
        return self.wait.until(EC.invisibility_of_element_located((path_type, path)))

    def click_of_element(self, path_type, path, limit=1):
        try:
            self.wait.until(EC.element_to_be_clickable((path_type, path))).click()
        except ElementClickInterceptedException:
            self.wait.until(EC.element_to_be_clickable((path_type, path))).click()

    def element_not_clickable(self, path_type, path):
        try:
            EC.element_to_be_clickable((path_type, path))
            return False
        except ElementClickInterceptedException:
            return True
