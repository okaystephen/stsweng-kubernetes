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
    Open Browser                                ${SERVER}        ${BROWSER}
    Click Link                                  link=Login
    Login Page Should Be Open
    Set Selenium Speed                          ${DELAY}

Login Page Should Be Open
    Wait Until Page Contains Element            id=loginbtn

User Profile Page Should Be Open
    Wait Until Page Contains Element            id=profileapp-table_wrapper
    Element Text Should Be                      css=p:nth-child(3)                                                      Address: 123 Blk 00, sample's address\nContact Number: 09177112470\nBirthday: 1998-12-17
    Element Text Should Be                      css=.nav-item > h6                                                      Last, First 

Successful Login
    Open Browser To Login Page
    Login Page Should Be Open
    Input Username                              test_sample@gmail.com
    Input Password                              sample12
    Click Button                                id=loginbtn
    User Profile Page Should Be Open

Input Username
    [Arguments]                                 ${username}
    Input Text                                  id=loginemail_modal       ${username}

Input Password
    [Arguments]                                 ${password}
    Input Text                                  id=loginpass_modal        ${password}