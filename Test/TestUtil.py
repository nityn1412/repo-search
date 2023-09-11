import time

from selenium.webdriver.common.by import By


class SearchUtil:
    # All required Xpath
    search_box_xp = "//input[@placeholder='Search']"
    search_button_xp = search_box_xp + "/../../button"
    loading_ani_xp = "svg[aria-label='bars-loading']"

    result_table_xp = "//table[@aria-label='customized table']/tbody/tr"
    repo_data_xp = result_table_xp + "[*-?-*]"
    repo_name_xp = "./td[1]"
    repo_owner_xp = "./td[2]"
    repo_star_xp = "./td[3]"
    repo_link_xp = "./td[4]/a"

    git_data_xp = "//*[@id='repository-container-header']"
    git_owner_xp = git_data_xp + "//*[@itemprop='author']"
    git_name_xp = git_data_xp + "//*[@itemprop='name']"
    git_star_xp = git_data_xp + "//*[@id='repo-stars-counter-star']"

    row_count_xp = "//div[@aria-haspopup='listbox']"
    rc_select_xp = "//ul[@role='listbox']/li[@data-value='*-?-*']"
    pagination_count_xp = "//p[starts-with(@class,'MuiTablePagination-displayedRows')]"
    next_button_xp = "//div[@class='MuiTablePagination-actions']/button[@aria-label='Go to next page']"
    prev_button_xp = "//div[@class='MuiTablePagination-actions']/button[@aria-label='Go to previous page']"

    def __init__(self, base):
        self.base_util = base

    # Reformatting star count to UI Format eg. 32OO to 3.2k
    @staticmethod
    def star_format(num):
        magnitude = 0
        while abs(num) >= 1000:
            magnitude += 1
            num /= 1000.0
        return f"{round(num, 1)}{['', 'k', 'm', 'g', 't', 'p'][magnitude]}"

    def pagination_counts(self, result_row_count, changed_row_num):
        pagination_count = self.base_util.driver.find_element(By.XPATH, SearchUtil.pagination_count_xp).text.split(
            " of ")
        pagination_count[0] = pagination_count[0].split("–")
        if int(pagination_count[1]) >= changed_row_num:
            assert int(pagination_count[0][1]) == changed_row_num, "Row count is not matching with updated count"
            assert self.base_util.element_not_clickable(By.XPATH, SearchUtil.prev_button_xp) is False
        else:
            assert int(pagination_count[0][1]) == result_row_count, "Row count is not matching with result count"
            assert self.base_util.element_not_clickable(By.XPATH, SearchUtil.next_button_xp) is False
        return int(pagination_count[1])

    def search_input(self, search_term):
        sb = self.base_util.find_presence_of_element(By.XPATH, SearchUtil.search_box_xp)
        sb.send_keys(search_term)
        self.base_util.driver.find_element(By.XPATH, SearchUtil.search_button_xp).click()
        self.base_util.find_invisibility_of_element(By.XPATH, SearchUtil.loading_ani_xp)

    def search_count(self):
        # Adding sleep as even after loading animation disappears table is loaded after few seconds
        time.sleep(2)
        return len(self.base_util.driver.find_elements(By.XPATH, SearchUtil.result_table_xp))

    def search_validation(self, row_num, search_term):
        repo_data = self.base_util.find_presence_of_element(By.XPATH,
                                                            SearchUtil.repo_data_xp.replace("*-?-*", str(row_num)))
        repo_name = repo_data.find_element(By.XPATH, SearchUtil.repo_name_xp.replace("*-?-*", str(row_num))).text
        search_words = search_term.split(" ")
        if not any(word in repo_name for word in search_words):
            pass
            # assert False, "No matching searched word in repo name"
        repo_owner = repo_data.find_element(By.XPATH, SearchUtil.repo_owner_xp).text
        repo_star = repo_data.find_element(By.XPATH, SearchUtil.repo_star_xp).text
        repo_star = SearchUtil.star_format(int(repo_star))
        repo_data.find_element(By.XPATH, SearchUtil.repo_link_xp).click()

        gitlab_tab = self.base_util.driver.window_handles[1]
        self.base_util.driver.switch_to.window(gitlab_tab)
        git_name = self.base_util.find_presence_of_element(By.XPATH, SearchUtil.git_name_xp).text
        git_owner = self.base_util.driver.find_element(By.XPATH, SearchUtil.git_owner_xp).text
        git_star = self.base_util.driver.find_element(By.XPATH, SearchUtil.git_star_xp).text

        self.base_util.driver.close()
        parent = self.base_util.driver.window_handles[0]
        self.base_util.driver.switch_to.window(parent)

        assert repo_name == git_name, "Repository name is not matching"
        assert repo_owner == git_owner, "Repository owner name is not matching"
        assert repo_star == git_star, "Repository start count is not matching"

    def update_rows_per_page_to(self, changed_row_num):
        self.base_util.click_of_element(By.XPATH, SearchUtil.row_count_xp)
        self.base_util.find_presence_of_element(By.XPATH,
                                                SearchUtil.rc_select_xp.replace("*-?-*", str(changed_row_num))).click()
        self.base_util.find_invisibility_of_element(By.XPATH, SearchUtil.loading_ani_xp)

    def row_count_n_next_page_validation(self, result_row_count, changed_row_num):
        total_result = SearchUtil.pagination_counts(self, result_row_count, changed_row_num)
        if result_row_count != total_result:
            self.base_util.click_of_element(By.XPATH, SearchUtil.next_button_xp)
            SearchUtil.pagination_counts(self, total_result, changed_row_num * 2)
            self.base_util.click_of_element(By.XPATH, SearchUtil.prev_button_xp)
            SearchUtil.pagination_counts(self, result_row_count, changed_row_num)
