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

Set An Appointment
    Click Element                   css=.card:nth-child(5) .btn
    Select From List by Index       id=appointment_name     1
    Select From List By Index       id=appointment_day       1
    Input Text                      id=appointment_date      03-01-2021
    Alert Should Be Present         Please choose a day that is Monday.
    Input Text                      id=appointment_date                                                      2021
    Click Element                   id=appointment_reason
    Click Element                   id=appointment_date
    Input Text                      id=appointment_date                                                      0301
    Input Text                      id=appointment_reason    Reason
    Click Element                   id=submit_btn
    Click Element                   id=submit_btn_modal

Delete Appointment
    Click Element    xpath=//small/div[2]/button
    Click Element    css=.cancelDocAppointmentButton

*** Test Cases ***
Reschedule Appointment
    Open Website
    Successful Login                    sample2@gmail.com    sample123
    Set An Appointment
    Click Element                       css=.text-center > small > .btn
    Select From List by Index           id=appointment_name      0
    Select From List By Index           id=appointment_day       2
    Input Text                          id=appointment_time                                                      0300pm
    Input Text                          id=appointment_reason    Reason123
    Click Element                       id=submit_btn
    Click Element                       id=submit_btn_modal
    Wait Until Page Contains Element    css=.alert
    Element Text Should Be              css=#profileapp-table td:nth-child(2)                                    3:00 pm
    Delete Appointment