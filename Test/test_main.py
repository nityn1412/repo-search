import time
import pytest
import Base, TestUtil


# Initializing Driver & setting yield
@pytest.fixture()
def test_setup():
    global base
    base = Base.BaseUtil()
    yield
    base.driver.quit()


# Test 1 - Validating Search result content
# **Repo name is not validated as result might not contain searched string**
# **Eg. When Databricks is searched Apache Spark repo name also shows-up which is correct as it's related**
# **But such logic can't be validated in UI Testing**
@pytest.mark.parametrize("search_word", ["Daily-Trend-ETL-Databricks", "ETL Databricks"])
def test_search(test_setup, search_word):
    repo_search = TestUtil.SearchUtil(base)  # Initializing TestUtil By passing driver & generic func through base
    repo_search.search_input(search_word)  # Passing Search String got from pytest parametrize
    result_count = repo_search.search_count()  # Checking result count on page
    for i in range(1, result_count + 1):  # Validating result content
        repo_search.search_validation(i, search_word)


# Test2 - Validating Row count update & Pagination
@pytest.mark.parametrize("search_word", ["Daily-Trend-E", "Daily-Trend-ETL-Databricks", "ETL Databricks"])
def test_row_count_update(test_setup, search_word):
    repo_search = TestUtil.SearchUtil(base)
    repo_search.search_input(search_word)
    for i in [25, 50, 10]:
        repo_search.update_rows_per_page_to(i)  # Changing row count of page to i
        result_count = repo_search.search_count()  # Checking result count on page
        repo_search.row_count_n_next_page_validation(result_count, i)
        # Validating row count & pagination if enough result is available for next page
