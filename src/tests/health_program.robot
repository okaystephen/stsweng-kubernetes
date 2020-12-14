*** Settings ***
Documentation     A test suite with tests for Health Program.
...
...               This test has a workflow that is created using keywords
...               directly from SeleniumLibrary
Resource          resource.robot

*** Test Cases ***
With Login Health Program
    Successful Login
    User Profile Page Should Be Open
    Element Text Should Be          css=p:nth-child(3)                                                      Address: 123 Blk 00, sample's address\nContact Number: 09177112470\nBirthday: 1998-12-17
    Element Text Should Be          css=.nav-item > h6                                                      Last, First 
    Click Link                      link=Health Programs
    Page Should Contain Element     css=#hp-table_filter > label
    # Name Sort
    Click Element                   css=.sorting:nth-child(1)
    Element Text Should Be          css=.odd:nth-child(1) > .sorting_1 > small                              AAA Latest Test Program
    Click Element                   css=.sorting_asc
    Element Text Should Be          css=.odd:nth-child(1) > .sorting_1 > small                              ZZZ Oldest Test Program
    # Start Date Sort
    Click Element                   css=.sorting:nth-child(3)
    Element Text Should Be          css=.odd:nth-child(1) > td:nth-child(1) > small                         ZZZ Oldest Test Program
    Click Element                   css=.sorting_asc
    Element Text Should Be          css=.odd:nth-child(1) > td:nth-child(1) > small                         AAA Latest Test Program
    # End Date Sort
    Click Element                   css=.sorting:nth-child(4)
    Element Text Should Be          css=.odd:nth-child(1) > td:nth-child(1) > small                         ZZZ Oldest Test Program
    Click Element                   css=.sorting_asc
    Element Text Should Be          css=.odd:nth-child(1) > td:nth-child(1) > small                         AAA Latest Test Program
    # Location Sort
    Click Element                   css=.sorting:nth-child(5)
    Element Text Should Be          css=.odd:nth-child(1) > td:nth-child(1) > small                         AAA Latest Test Program
    Click Element                   css=.sorting_asc
    Element Text Should Be          css=.odd:nth-child(1) > td:nth-child(1) > small                         ZZZ Oldest Test Program
    # Cap Sort
    Click Element                   css=.sorting:nth-child(6)
    Element Text Should Be          css=.odd:nth-child(1) > td:nth-child(1) > small                         ZZZ Oldest Test Program
    Click Element                   css=.sorting_asc
    Element Text Should Be          css=.odd:nth-child(1) > td:nth-child(1) > small                         Adolescent health and development program
    # Register
    Click Element                   css=.odd:nth-child(1) .btn
    Page Should Contain Element     css=#a5fd721786161150d2281c550 #programsave
    Click Element                   css=#a5fd721786161150d2281c550 .btn-secondary
    # Search
    Click Element                   css=input:nth-child(1)
    Input Text                      css=input:nth-child(1)                                                  test
    Page Should Contain Element     css=.odd:nth-child(1) > td:nth-child(1) > small
    Element Text Should Be          css=.odd:nth-child(1) > td:nth-child(1) > small                         ZZZ Oldest Test Program
    # Next - Previous
    Click Link                      link=Health Programs                                            
    Click Element                   css=.sorting:nth-child(1)
    Element Text Should Be          css=.odd:nth-child(1) > td:nth-child(1) > small                         AAA Latest Test Program
    Click Element                   id=hp-table_next
    Element Text Should Be          css=.even:nth-child(8) > .sorting_1 > small                             ZZZ Oldest Test Program
    Click Element                   id=hp-table_previous
    Element Text Should Be          css=.odd:nth-child(1) > td:nth-child(1) > small                         AAA Latest Test Program
    [Teardown]  Close Browser