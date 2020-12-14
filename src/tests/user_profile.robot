*** Settings ***
Documentation     A test suite with tests for valid login of User Profile.
...
...               This test has a workflow that is created using keywords
...               directly from SeleniumLibrary
Resource          resource.robot

*** Test Cases ***
Valid User Profile
    Successful Login
    Element Text Should Be          css=p:nth-child(3)                                                      Address: 123, Home Address\nContact Number: 09171231234\nBirthday: 2001-04-18
    Element Text Should Be          css=.nav-item > h6                                                      LastName, FirstName MiddleName
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