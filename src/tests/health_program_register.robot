*** Settings ***
Documentation     A test suite with tests for Health Program.
...
...               This test has a workflow that is created using keywords
...               directly from SeleniumLibrary
Resource          resource.robot

*** Keywords ***
Health Program Cancel
    Successful Login
    User Profile Page Should Be Open
    Element Text Should Be                              css=#profilehp-table td:nth-child(1)                                    Test Program
    Click Link                                          link=Cancel
    Wait Until Page Contains Element                    css=.btn-secondary
    Click Element                                       css=.btn-secondary
    Click Link                                          link=Cancel
    Click Element                                       id=programsave
    Wait Until Page Contains Element                    css=#profilehp-table .dataTables_empty
    Element Text Should Be                              css=.alert                                                              You have successfully cancelled your registration to Test Program.\n×
    Click Element                                       css=.alert > .close > span
    Wait Until Page Does Not Contain Element            css=.alert
    [Teardown]  Close All Browsers

Invalid Register Field
    Click Element                                       css=#a5fd721786161150d2281c55c #programsave
    Element Text Should Be                              css=.alert                                                              Registration failed: You tried submitting an empty field. Please try again.
    Input Text                                          css=input:nth-child(1)                                                  test
    Page Should Contain Element                         css=.odd:nth-child(1) > td:nth-child(1) > small
    Click Element                                       css=.odd:nth-child(3) .btn

*** Test Cases ***
Without Login Health Program Register
    Open Browser                                        ${SERVER}        ${BROWSER}
    Click Link                                          link=Health Programs
    Page Should Contain Element                         css=#hp-table_filter > label
    Set Selenium Speed                                  1
    # Register
    Click Element                                       css=.odd:nth-child(1) .btn
    Login Page Should Be Open
    # Login
    Input Username                                      test_sample@gmail.com
    Set Selenium Speed                                  0.2
    Input Password                                      sample12
    Click Button                                        id=loginbtn
    # Successful login
    Page Should Contain Element                         css=.ml-auto > .nav-item:nth-child(1) > .nav-link
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

With Login Health Program Register
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
