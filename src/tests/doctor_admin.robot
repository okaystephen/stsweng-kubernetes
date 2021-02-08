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

Successful Admin Login
    [Arguments]    ${email}    ${password}
    Click Element    css=.ml-auto > .nav-item:nth-child(1) > .nav-link
    Input Text       id=loginemail_modal    ${email}
    Input Text       id=loginpass_modal     ${password}
    Click Button     id=loginbtn

Delete Doctor
    Click Element    css=.card:nth-child(67) .dropdown > .fas
    Click Element    css=.card:nth-child(67) a:nth-child(2)
    Click Element    css=#deleteDoc6020e26f30a5754378dbd419 .btn-danger
    Wait Until Page Contains Element    css=.alert

*** Test Cases ***
Add Doctor
    Open Website
    Successful Admin Login       admin@gmail.com    admin123
    Click Element                css=.nav-item:nth-child(2) > .nav-link
    Click Element                css=.ml-auto > .nav-item:nth-child(1) > .nav-link
    Input Text                   id=doc_fname    Doctor
    Input Text                   id=doc_lname    ZZZ
    Select From List By Index    id=doc_specialization    1
    Select From List By Index    id=doc_day_0    1
    Input Text                   id=doc_stime_0    900AM
    Input Text                   id=doc_etime_0    1000AM
    Click Element                css=.btn
    Wait Until Page Contains Element    css=.alert
    Element Text Should Be       css=.card:nth-child(67) .card-title    ZZZ, Doctor
    Delete Doctor
