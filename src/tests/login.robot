*** Settings ***
Documentation     A test suite with tests for login.
...
...               This test has a workflow that is created using keywords
...               directly from SeleniumLibrary
Resource          resource.robot

*** Test Cases ***
Valid Login
    Open Browser to Login Page
    Click Element                   css=.ml-auto > .nav-item:nth-child(1) > .nav-link
    Input Username                  sample@gmail.com
    Input Password                  sample12
    Click Button                    css=.btn
    Page Should Contain Element     id=profileapp-table_wrapper
    [Teardown]  Close Browser

SignUp
    Open Browser to Login Page
    Click Element                   css=.ml-auto > .nav-item:nth-child(1) > .nav-link
    Click Element                   css=small:nth-child(3) > a
    Page Should Contain Element     id=signupbtn
    [Teardown]  Close Browser

Invalid User Login
    Open Browser to Login Page
    Click Element                   css=.ml-auto > .nav-item:nth-child(1) > .nav-link
    Input Username                  sample@gmail.com
    Input Password                  wrong_password
    Click Button                    css=.btn
    Page Should Contain Element     css=.loginModalErrorText               

    Input Username                  wrong_email@gmail.com
    Input Password                  sample12
    Click Button                    css=.btn
    Page Should Contain Element     css=.loginModalErrorText               
    [Teardown]  Close Browser