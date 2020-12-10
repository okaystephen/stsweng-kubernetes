*** Settings ***
Documentation     A test suite with tests for valid login.
...
...               This test has a workflow that is created using keywords
...               directly from SeleniumLibrary
Resource          resource.robot

*** Test Cases ***
Valid Login
    Open Browser to Login Page
    Click Element                   id=navbarDropdownMenuLink
    Input Username                  sample@gmail.com
    Input Password                  sample12
    Click Button                    css=.btn
    Page Should Contain Element     id=navbarDropdownMenuLink
    [Teardown]  Close Browser

SignUp
    Open Browser to Login Page
    Click Element                   id=navbarDropdownMenuLink
    Click Link                      xpath=//a[contains(@href, '/register')]
    Page Should Contain Element     xpath=(//button[@type='submit'])[2]
    [Teardown]  Close Browser