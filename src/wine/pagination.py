from rest_framework import pagination

class StandardResultsSetPagination(pagination.PageNumberPagination):
    # modify the default pagination style
    page_size = 7 # set the page size to 7
    page_size_query_param = 'page_size'
    