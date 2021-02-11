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
    Input Text       id=record_date    03222021
    Click Element    id=signupbtn
    Element Text Should Be    css=.odd:nth-child(1) > td:nth-child(1) > small    Silverio, Alysson
    Element Text Should Be    css=.even > td:nth-child(1) > small                Tisbe, Van Christian
    Click Element             css=.sorting:nth-child(1)
    Element Text Should Be    css=.odd:nth-child(1) > .sorting_1 > small         Kuriyama, Mirai
    Click Element             css=.sorting:nth-child(2)
    Element Text Should Be    css=.odd:nth-child(1) > .sorting_1 > small         14, St.
    Click Element             css=.sorting:nth-child(3)
    Element Text Should Be    css=.odd:nth-child(1) > .sorting_1 > small         Female
    Click Element             css=.sorting:nth-child(4)
    Element Text Should Be    css=.odd:nth-child(1) > .sorting_1 > small         1998-03-31
    Click Element             css=.sorting:nth-child(5)
    Element Text Should Be    css=.odd:nth-child(1) > .sorting_1 > small         3:00 pm
    Click Element             css=.sorting:nth-child(6)
    Element Text Should Be    css=.odd:nth-child(1) > .sorting_1 > small         Albana, Natalio
    Input Text                css=label > input                                  Silverio
    Element Text Should Be    css=td:nth-child(1) > small                        Silverio, Alysson
    Input Text                id=record_date    992020
    Click Element             id=signupbtn
    Wait Until Page Contains Element    css=.dataTables_empty