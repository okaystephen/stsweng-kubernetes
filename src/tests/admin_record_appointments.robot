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

*** Test Cases ***
Admin Record of Appointments
    Open Website
    Successful Admin Login    admin@gmail.com    admin123
    Click Element    css=.nav-item:nth-child(3) > .nav-link
    Input Text       id=record_date    12172020
    Click Element    id=signupbtn
    Element Text Should Be    css=.odd:nth-child(1) > td:nth-child(1) > small    LastName, FirstName MiddleName
    Element Text Should Be    css=.even > td:nth-child(1) > small                Villanueva, Ira Nitollano
    Click Element             css=.sorting:nth-child(1)
    Element Text Should Be    css=.odd:nth-child(3) > .sorting_1 > small         Villanueva, Ira Nitollano
    Click Element             css=.sorting:nth-child(2)
    Element Text Should Be    css=.odd:nth-child(1) > .sorting_1 > small         123, Home Address
    Click Element             css=.sorting:nth-child(4)
    Element Text Should Be    css=.odd:nth-child(1) > .sorting_1 > small         2001-04-18
    Click Element             css=.sorting:nth-child(5)
    Element Text Should Be    css=.odd:nth-child(1) > .sorting_1 > small         1:11 pm
    Click Element             css=.sorting:nth-child(6)
    Element Text Should Be    css=.odd:nth-child(1) > .sorting_1 > small         Albana, Natalio
    Input Text                css=label > input                                  Villanueva
    Element Text Should Be    css=td:nth-child(1) > small                        Villanueva, Ira Nitollano
    Input Text                id=record_date    992020
    Click Element             id=signupbtn
    Wait Until Page Contains Element    css=.dataTables_empty