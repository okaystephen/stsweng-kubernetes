*** Settings ***
Documentation     A test suite with tests for Admin Health Program.
...
...               This test has a workflow that is created using keywords
...               directly from SeleniumLibrary
Resource          resource.robot

*** Keywords ***
Health Program Cancel
    Successful Login
    User Profile Page Should Be Open
    Element Text Should Be                              css=#profilehp-table td:nth-child(1)                                    test delete
    Click Link                                          link=Cancel
    Wait Until Page Contains Element                    css=.btn-secondary
    Click Element                                       css=.btn-secondary
    Click Link                                          link=Cancel
    Click Element                                       id=programsave
    Wait Until Page Contains Element                    css=#profilehp-table .dataTables_empty
    Page Should Contain Element                         css=.alert                                                              #You have successfully cancelled your registration to Test Program.\n×
    Click Element                                       css=.alert > .close > span
    #Wait Until Page Does Not Contain Element            css=.alert
    [Teardown]  Close All Browsers

Invalid Register Field
    Click Element                                       xpath=//div[73]/div/div/div[2]/div[2]/button[2]
    Page Should Contain Element                         css=.alert                                                              #Registration failed: You tried submitting an empty field. Please try again.\nx
    Input Text                                          css=input:nth-child(1)                                                  test delete
    Page Should Contain Element                         css=.odd:nth-child(1) > td:nth-child(1) > small
    Click Element                                       css=.odd:nth-child(1) .btn


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
    Click Element                       id=submit_btn
    Page Should Contain Element         css=.col-md-5 > p
    Input Text                          id=hp_startdate                                                         01012020
    Click Element                       id=submit_btn
    Element Text Should Be              css=.form-row:nth-child(2) > .form-group:nth-child(1) > p               Please enter a start date that comes after the date today.
    Input Text                          id=hp_enddate                                                           01012020
    Click Element                       id=submit_btn
    Element Text Should Be              css=.form-row:nth-child(2) > .form-group:nth-child(3) > p               Invalid end date. Please enter a date that is after or equal the start date.
    Input Text                          id=hp_startdate                                                         02032021
    Input Text                          id=hp_enddate                                                           01032021
    Click Element                       id=submit_btn
    Element Text Should Be              css=.form-row:nth-child(2) > .form-group:nth-child(3) > p               Invalid end date. Please enter a date that is after or equal the start date.
    Input Text                          id=hp_name                                                              test delete
    Input Text                          id=hp_cap                                                               1
    Input Text                          id=hp_cap                                                               1
    Input Text                          id=hp_startdate                                                         03012021
    Input Text                          id=hp_enddate                                                           03022021
    Input Text                          id=hp_starttime                                                         0900am
    Input Text                          id=hp_endtime                                                           0900pm
    Input Text                          id=hp_location                                                          Test location
    Input Text                          id=hp_description                                                       Test description
    Click Element                       id=submit_btn
    Wait Until Page Contains Element    css=.alert
    # Search Added program
    Click Element                       css=input:nth-child(1)
    Input Text                          css=input:nth-child(1)                                                  test delete
    Page Should Contain Element         css=td:nth-child(1) > small
    Element Text Should Be              css=td:nth-child(1) > small                                             test delete
    Page Should Contain Element         css=.btn-success
    Page Should Contain Element         css=.btn-danger:nth-child(1)
    [Teardown]  Close Browser

Admin Add Health Program - User View
    Successful Login
    User Profile Page Should Be Open
    Click Link                                          link=Health Programs
    Page Should Contain Element                         css=#hp-table_filter > label
    # Search and Register
    Click Element                                       css=input:nth-child(1)
    Input Text                                          css=input:nth-child(1)                                                  test delete
    Page Should Contain Element                         css=.odd:nth-child(1) > td:nth-child(1) > small
    Click Element                                       css=.odd:nth-child(1) .btn
    Page Should Contain Element                         xpath=//div[73]/div/div/div[2]/div[2]/button[2]
    # Close modal and reopen
    Click Element                                       xpath=//div[73]/div/div/div[2]/div[2]/button
    Click Element                                       css=.odd:nth-child(1) .btn
    # Test Invalid Reason Field Input
    Invalid Register Field
    # Valid Reason Field Input
    Input Text                                          xpath=//div[73]/div/div/div[2]/div/div/textarea                         test
    Click Element                                       xpath=//div[73]/div/div/div[2]/div[2]/button[2]
    Page Should Contain Element                         css=.alert                                                              #You have successfully registered to Test Program. Please check your dashboard.
    # Check User Profile if successfully registered
    Click Link                                          link=My Dashboard
    Element Text Should Be                              css=#profilehp-table td:nth-child(1)                                    test delete
    Close Browser
    # Health Program Cancel
    Health Program Cancel

Admin Delete Health Program
    Successful Admin Login
    Click Link                                          link=Health Programs
    Page Should Contain Element                         css=#hp-table_filter > label
    # Search Added program
    Click Element                                       css=input:nth-child(1)
    Input Text                                          css=input:nth-child(1)                                                  test delete
    Page Should Contain Element                         css=td:nth-child(1) > small
    Element Text Should Be                              css=td:nth-child(1) > small                                             test delete
    Page Should Contain Element                         css=.btn-success
    Page Should Contain Element                         css=.btn-danger:nth-child(1)
    # Delete program
    Click Element                                       css=.btn-danger:nth-child(1)
    Wait Until Page Contains Element                    xpath=//div[74]/div/div/div[2]/div/button
    Click Element                                       xpath=//div[74]/div/div/div[2]/div/button
    Click Element                                       css=.btn-danger:nth-child(1)
    Wait Until Page Contains Element                    xpath=//div[74]/div/div/div[2]/div/button[2]
    Click Element                                       xpath=//div[74]/div/div/div[2]/div/button[2]
    Wait Until Page Contains Element                    css=.alert
    Page Should Contain Element                         css=.alert                                                              #You have successfully deleted test delete.\nx
    Click Element                                       css=.alert > .close > span
    # Wait Until Page Does Not Contain Element            css=.alert
    # Search Non-Existing program
    #Click Element                                       css=input:nth-child(1)
    #Input Text                                          css=input:nth-child(1)                                                  test delete
    #Page Should Contain Element                         css=.dataTables_empty
    [Teardown]  Close All Browsers