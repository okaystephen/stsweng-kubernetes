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

Add Doctor
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
    Element Text Should Be       css=.card:nth-child(52) .card-title    ZZZ, Doctor

Delete Doctor
    Click Element    css=.card:nth-child(52) .dropdown > .fas
    Click Element    css=.card:nth-child(52) a:nth-child(2)
    Click Element    xpath=//div[53]/div/div/div[2]/form/div/button[2]
    Wait Until Page Contains Element    css=.alert

*** Test Cases ***
Edit Doctor
    Open Website
    Add Doctor
    Click Element    css=.card:nth-child(52) .dropdown > .fas
    Click Element    css=.card:nth-child(52) a:nth-child(1)
    Clear Element Text    id=doc_fname
    Clear Element Text    id=doc_lname
    Click Element         css=.btn
    Element Text Should Be    css=.needs-validation > .form-row > .col-md-6:nth-child(1) > .invalid-feedback    Enter a first name.
    Element Text Should Be    css=.col-md-6:nth-child(2) > .invalid-feedback                                    Enter a last name.
    Input Text       id=doc_fname    DoctorE
    Input Text       id=doc_lname    ZZZE
    Select From List By Index    id=doc_specialization    2
    Select From List By Index    id=doc_day_0             2
    Click Element                css=.btn
    Wait Until Page Contains Element    css=.alert
    Element Text Should Be    css=.card:nth-child(52) .card-title    ZZZE, DoctorE
    Element Text Should Be    css=.card:nth-child(52) .card-text:nth-child(2)    Dental Medicine
    Delete Doctor
    