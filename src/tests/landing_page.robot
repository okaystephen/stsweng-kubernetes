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

*** Test Cases ***
Landing Page
    Open Website
    Click Element             css=.col-lg:nth-child(1) > .pt-3 > h2
    Element Text Should Be    css=.h1    Health Programs
    Click Element             css=.navbar-brand
    Click Element             css=.col-lg:nth-child(3) h2
    Wait Until Page Contains Element    id=filter