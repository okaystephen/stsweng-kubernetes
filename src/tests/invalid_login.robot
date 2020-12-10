*** Settings ***
Documentation     A test suite with tests for invalid login.
...
...               This test has a workflow that is created using keywords
...               directly from SeleniumLibrary
Resource          resource.robot

*** Test Cases ***
Invalid User Login Chrome
    Open Browser to Login Page Chrome
    Click Element                   id=navbarDropdownMenuLink
    Input Username                  sample@gmail.com
    Input Password                  wrong_password
    Click Button                    css=.btn
    Element Text Should Be          css=.pb-2 > small               Invalid credentials!

    Input Username                  wrong_email@gmail.com
    Input Password                  sample12
    Click Button                    css=.btn
    Element Text Should Be          css=.pb-2 > small               Invalid credentials!
    [Teardown]  Close Browser