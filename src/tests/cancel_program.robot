*** Settings ***

Library    SeleniumLibrary

*** Variables ***
${SERVER}       localhost:3001
${BROWSER}      Chrome
${URL}          http://${SERVER}/
${DELAY}        0.2

*** Keywords ***
Open Website
    Open Browser                                ${URL}        ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed                          ${DELAY}

Successful Login
    [Arguments]    ${email}    ${password}
    Click Element    css=.ml-auto > .nav-item:nth-child(1) > .nav-link
    Input Text       id=loginemail_modal    ${email}
    Input Text       id=loginpass_modal     ${password}
    Click Button     id=loginbtn

Join A Program
    Click Element    css=.mr-auto > .nav-item:nth-child(2) > .nav-link
    Click Element    css=.odd:nth-child(1) .btn
    Click Element    id=reason
    Input Text       id=reason    Reason
    Click Element    id=programsave

*** Test Cases ***
Cancel Program
    Open Website
    Successful Login    sample2@gmail.com    sample123
    Join A Program
    Click Element       css=.ml-auto > .nav-item:nth-child(1) > .nav-link
    Click Element       css=small > .btn-danger
    Click Element       id=programsave
    Wait Until Page Contains Element    css=.alert

