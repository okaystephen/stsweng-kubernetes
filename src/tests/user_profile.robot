*** Settings ***
Documentation     A test suite with tests for valid login of User Profile.
...
...               This test has a workflow that is created using keywords
...               directly from SeleniumLibrary
Resource          resource.robot

*** Test Cases ***
Valid User Profile
    Open Browser to Login Page
    Click Element                   id=navbarDropdownMenuLink
    Input Username                  sample@gmail.com
    Input Password                  sample12
    Click Button                    css=.btn
    Page Should Contain Element     id=profileapp-table_wrapper
    Element Text Should Be          css=p:nth-child(3)                                                      Address: sample's address\nContact Number: 09177112470\nBirthday: 2018-12-11
    Element Text Should Be          css=.nav-item > h6                                                      Last, First Middle
    Click Link                      xpath=//a[contains(@href, '/profile')]
    Element Text Should Be          css=.profile-content > .h1                                              Hello, Patient!
    Click Link                      xpath=//a[contains(@href, '/healthprograms')]
    Page Should Contain Element     css=#hp-table_filter > label
    Click Link                      xpath=//a[contains(@href, '/profile')]
    Element Text Should Be          css=.profile-content > .h1                                              Hello, Patient!
    Click Link                      xpath=//a[contains(@href, '/doctors')]
    Page Should Contain Element     id=filter
    Click Link                      xpath=//a[contains(@href, '/profile')]
    Element Text Should Be          css=.profile-content > .h1                                              Hello, Patient!
    Click Element                   xpath=//a[contains(@href, '/appointments')]
    Page Should Contain Element     id=submit_btn
    [Teardown]  Close Browser