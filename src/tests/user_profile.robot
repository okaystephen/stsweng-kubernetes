*** Settings ***
Documentation     A test suite with tests for valid login of User Profile.
...
...               This test has a workflow that is created using keywords
...               directly from SeleniumLibrary
Resource          resource.robot

*** Test Cases ***
Valid User Profile
    Successful Login
    Element Text Should Be          css=p:nth-child(3)                                                      Address: 123 Blk 00, sample's address\nContact Number: 09177112470\nBirthday: 1998-12-17
    Element Text Should Be          css=.nav-item > h6                                                      Last, First 
    Click Element                   css=.shrink
    Page Should Contain Element     css=.ml-auto > .nav-item:nth-child(1) > .nav-link
    Click Link                      link=My Dashboard
    User Profile Page Should Be Open
    Click Link                      link=Dashboard
    User Profile Page Should Be Open
    Click Link                      link=Health Programs
    Page Should Contain Element     css=#hp-table_filter > label
    Click Link                      link=My Dashboard
    User Profile Page Should Be Open
    Click Link                      link=Doctors
    Page Should Contain Element     id=filter
    Click Link                      link=My Dashboard
    User Profile Page Should Be Open
    Click Element                   link=Appointments
    Page Should Contain Element     id=submit_btn
    [Teardown]  Close Browser