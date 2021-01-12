*** Settings ***
Documentation     A test suite with tests for Admin Health Program.
...
...               This test has a workflow that is created using keywords
...               directly from SeleniumLibrary
Resource          resource.robot
Resource          health_program.robot

*** Test Cases ***
Admin Health Program Directory
    Successful Admin Login
    Click Link                          link=Health Programs
    Page Should Contain Element         css=#hp-table_filter > label
    # Name Sort
    Click Element                       css=.sorting:nth-child(1)
    Element Text Should Be              css=.odd:nth-child(1) > .sorting_1 > small                              AAA Latest Test Program
    Click Element                       css=.sorting_asc
    Element Text Should Be              css=.odd:nth-child(1) > .sorting_1 > small                              ZZZ Oldest Test Program
    # Start Date Sort
    Click Element                       css=.sorting:nth-child(3)
    Element Text Should Be              css=.odd:nth-child(1) > td:nth-child(1) > small                         ZZZ Oldest Test Program
    Click Element                       css=.sorting_asc
    Element Text Should Be              css=.odd:nth-child(1) > td:nth-child(1) > small                         AAA Latest Test Program
    # End Date Sort
    Click Element                       css=.sorting:nth-child(4)
    Element Text Should Be              css=.odd:nth-child(1) > td:nth-child(1) > small                         ZZZ Oldest Test Program
    Click Element                       css=.sorting_asc
    Element Text Should Be              css=.odd:nth-child(1) > td:nth-child(1) > small                         AAA Latest Test Program
    # Location Sort
    Click Element                       css=.sorting:nth-child(5)
    Element Text Should Be              css=.odd:nth-child(1) > td:nth-child(1) > small                         AAA Latest Test Program
    Click Element                       css=.sorting_asc
    Element Text Should Be              css=.odd:nth-child(1) > td:nth-child(1) > small                         ZZZ Oldest Test Program
    # Cap Sort
    Click Element                       css=.sorting:nth-child(6)
    Element Text Should Be              css=.odd:nth-child(1) > td:nth-child(1) > small                         ZZZ Oldest Test Program
    Click Element                       css=.sorting_asc
    Element Text Should Be              css=.odd:nth-child(1) > td:nth-child(1) > small                         Adolescent health and development program
    # Edit and Delete Button
    Page Should Contain Element         css=.odd:nth-child(1) .btn-success .fas
    Page Should Contain Element         css=.odd:nth-child(1) .btn-danger .fas
    # Search
    Click Element                       css=input:nth-child(1)
    Input Text                          css=input:nth-child(1)                                                  test
    Page Should Contain Element         css=.odd:nth-child(1) > td:nth-child(1) > small
    Element Text Should Be              css=.odd:nth-child(1) > td:nth-child(1) > small                         ZZZ Oldest Test Program
    # Next - Previous
    Click Link                          link=Health Programs                                            
    Click Element                       css=.sorting:nth-child(1)
    Element Text Should Be              css=.odd:nth-child(1) > td:nth-child(1) > small                         AAA Latest Test Program
    Click Element                       id=hp-table_next
    Element Text Should Be              css=.even:nth-child(8) > .sorting_1 > small                             ZZZ Oldest Test Program
    Click Element                       id=hp-table_previous
    Element Text Should Be              css=.odd:nth-child(1) > td:nth-child(1) > small                         AAA Latest Test Program
    [Teardown]  Close Browser

Admin Add Health Program
    Successful Admin Login
    Click Link                          link=Health Programs
    Page Should Contain Element         css=#hp-table_filter > label
    # Search Non-Existing program
    Click Element                       css=input:nth-child(1)
    Input Text                          css=input:nth-child(1)                                                  test delete
    Page Should Contain Element         css=.dataTables_empty
    # Open add program page
    Click Link                          link=Add a Program
    Wait Until Page Contains Element    id=submit_btn
    # Search Added program
    Click Element                       css=input:nth-child(1)
    Input Text                          css=input:nth-child(1)                                                  test delete
    Page Should Contain Element         css=td:nth-child(1) > small
    Element Text Should Be              css=td:nth-child(1) > small                                             test delete
    Page Should Contain Element         css=.btn-success
    Page Should Contain Element         css=.btn-danger:nth-child(1)
    [Teardown] Close Browser

Admin Add Health Program - User View
    Successful Login
    User Profile Page Should Be Open
    Click Link                                          link=Health Programs
    Page Should Contain Element                         css=#hp-table_filter > label
    # Search and Register
    Click Element                                       css=input:nth-child(1)
    Input Text                                          css=input:nth-child(1)                                                  test
    Page Should Contain Element                         css=.odd:nth-child(1) > td:nth-child(1) > small
    Click Element                                       css=.odd:nth-child(3) .btn
    Page Should Contain Element                         css=#a5fd721786161150d2281c55c #programsave
    # Close modal and reopen
    Click Element                                       css=#a5fd721786161150d2281c55c .btn-secondary
    Click Element                                       css=.odd:nth-child(3) .btn
    # Test Invalid Reason Field Input
    Invalid Register Field
    # Valid Reason Field Input
    Input Text                                          css=#a5fd721786161150d2281c55c #reason                                  test
    Click Element                                       css=#a5fd721786161150d2281c55c #programsave
    Element Text Should Be                              css=.alert                                                              You have successfully registered to Test Program. Please check your dashboard.
    # Check User Profile if successfully registered
    Click Link                                          link=My Dashboard
    Element Text Should Be                              css=#profilehp-table td:nth-child(1)                                    Test Program
    Close Browser
    # Health Program Cancel
    Health Program Cancel

Admin Delete Health Program
    Successful Admin Login
    Click Link                          link=Health Programs
    Page Should Contain Element         css=#hp-table_filter > label
    # Search Added program
    Click Element                       css=input:nth-child(1)
    Input Text                          css=input:nth-child(1)                                                  test delete
    Page Should Contain Element         css=td:nth-child(1) > small
    Element Text Should Be              css=td:nth-child(1) > small                                             test delete
    Page Should Contain Element         css=.btn-success
    Page Should Contain Element         css=.btn-danger:nth-child(1)
    # Delete program
    Click Element                       css=.btn-danger:nth-child(1)
    Wait Until Page Contains Element    xpath=(//button[@type='button'])[113]
    Click Element                       xpath=(//button[@type='button'])[113]
    Click Element                       css=.btn-danger:nth-child(1)
    Wait Until Page Contains Element    xpath=(//button[@id='programsave'])[56]
    Click Element                       xpath=(//button[@id='programsave'])[56]
    Wait Until Page Contains Element    css=.alert
    Element Text Should Be              css=.alert                                                              You have successfully deleted test delete.\nx
    Click Element                                       css=.alert > .close > span
    Wait Until Page Does Not Contain Element            css=.alert
    # Search Non-Existing program
    Click Element                       css=input:nth-child(1)
    Input Text                          css=input:nth-child(1)                                                  test delete
    Page Should Contain Element         css=.dataTables_empty
    [Teardown]  Close All Browsers