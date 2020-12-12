*** Settings ***
Documentation     A resource file with reusable keywords and variables.
...
...               The system specific keywords created here form our own
...               domain specific language. They utilize keywords provided
...               by the imported SeleniumLibrary.
Library           SeleniumLibrary

*** Variables ***
${SERVER}       localhost:3001
${BROWSER}      Chrome
${LOGIN URL}    https://${SERVER}/
${DELAY}        0.2

*** Keywords ***
Open Browser To Login Page
    Open Browser                    ${SERVER}        ${BROWSER}
    Login Page Should Be Open
    Set Selenium Speed              ${DELAY}

Login Page Should Be Open
    Page Should Contain Element     css=.btn

Input Username
    [Arguments]                     ${username}
    Input Text                      id=loginemail_modal       ${username}

Input Password
    [Arguments]                     ${password}
    Input Text                      id=loginpass_modal        ${password}