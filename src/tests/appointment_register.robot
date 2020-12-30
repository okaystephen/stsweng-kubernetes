*** Settings ***
Documentation     A test suite with tests for Doctor Appointment.
...
...               This test has a workflow that is created using keywords
...               directly from SeleniumLibrary
Resource          resource.robot

*** Keywords ***
Cancel Appointment
    Successful Login
    User Profile Page Should Be Open
    Element Text Should Be                              css=#profileapp-table td:nth-child(1)                                   Albana, Natalio
    Click Element                                       css=small > .btn-danger
    Element Text Should Be                              css=.cancelDocAppointmentSuccess                                        Are you sure you want to cancel your appointment with Albana, Natalio on January 01, 2021?
    Page Should Contain Element                         css=.btn-secondary
    Click Element                                       css=.btn-secondary
    Click Element                                       css=small > .btn-danger
    Click Link                                          link=Confirm
    Wait Until Page Contains Element                    css=#profileapp-table .dataTables_empty
    Element Text Should Be                              css=.alert                                                              You have successfully cancelled your appointment with Albana, Natalio.\n×
    Click Element                                       css=.alert > .close > span
    Wait Until Page Does Not Contain Element            css=.alert
    [Teardown]  Close All Browsers

*** Test Cases ***
Set Appointment
    Successful Login
    User Profile Page Should Be Open
    Click Link                                          link=Appointments
    Wait Until Page Contains Element                    id=submit_btn
    # Input Invalid
    Click Element                                       id=submit_btn
    Element Text Should Be                              css=.invalid-feedback:nth-child(5)                                       Choose a doctor.
    # Element Text Should Be                              css=.col-md-6:nth-child(1) > .invalid-feedback                           Enter a valid date.
    # Element Text Should Be                              css=.form-group:nth-child(2) > .invalid-feedback                         Enter a valid time.
    # Element Text Should Be                              css=.form-group:nth-child(3) > .invalid-feedback                         Enter reason for appointment.
    # Input Valid
    Select From List By Value                           id=appointment_name                                                      Albana, Natalio
    Select From List By Index                           id=appointment_day                                                       1
    Input Text                                          id=appointment_date                                                      05032021
    Input Text                                          id=appointment_time                                                      0900am
    Input Text                                          id=appointment_reason                                                    test
    Click Element                                       id=submit_btn
    # Check Confirmation modal
    Wait Until Page Contains Element                    css=.btn-secondary
    Element Text Should Be                              id=app-date                                                              2022-01-01
    # Element Text Should Be                              id=app-time                                                              2021-01-01
    Element Text Should Be                              id=app-doc                                                               Albana, Natalio
    Element Text Should Be                              id=app-reason                                                            test
    # Close modal and reopen
    Click Element                                       css=.btn-secondary
    Click Element                                       id=submit_btn
    Click Element                                       id=submit_btn_modal
    # Check User Profile Page
    Wait Until Page Contains Element                    css=#profileapp-table td:nth-child(1)
    Close Browser
    # Cancel Appointment
    Cancel Appointment
