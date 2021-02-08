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
Search
    Open Website
    Click Element                       css=.nav-item:nth-child(4) > .nav-link
    Wait Until Page Contains Element    css=.card:nth-child(1) .card-title
    Click Element                       id=temporary
    Input Text                          id=temporary    Albana
    Click Element                       id=filter
    Element Text Should Be              css=.card-title    Albana, Natalio

Filter
    Open Website
    Click Element                       css=.nav-item:nth-child(4) > .nav-link
    Wait Until Page Contains Element    css=.card:nth-child(1) .card-title
    Select From List By Index           id=specialization    17
    Click Element                       id=availablity
    Click Element                       id=filter
    Element Text Should Be              css=.card-title    Albana, Natalio


    