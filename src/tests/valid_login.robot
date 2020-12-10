*** Settings ***
Documentation     A test suite with tests for valid login.
...
...               This test has a workflow that is created using keywords
...               directly from SeleniumLibrary
Resource          resource.robot

*** Test Cases ***
Valid Login Chrome
    Open Browser to Login Page Chrome
    Click Element                   id=navbarDropdownMenuLink
    Input Username                  sample@gmail.com
    Input Password                  sample12
    Click Button                    css=.btn
    Page Should Contain Element     id=navbarDropdownMenuLink
    [Teardown]  Close Browser

Valid Login Firefox
    Open Browser to Login Page Firefox
    Click Element                   id=navbarDropdownMenuLink
    Input Username                  sample@gmail.com
    Input Password                  sample12
    Click Button                    css=.btn
    Page Should Contain Element     id=navbarDropdownMenuLink
    [Teardown]  Close Browser