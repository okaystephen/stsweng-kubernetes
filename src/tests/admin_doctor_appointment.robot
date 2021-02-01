*** Settings ***
Documentation     A test suite with tests for Admin Doctor Appointment.
...
...               This test has a workflow that is created using keywords
...               directly from SeleniumLibrary
Resource          resource.robot

*** Test Cases ***
Admin Doctor Appointment Directory
    Successful Admin Login
    Click Link                          link=Doctors
    Page Should Contain Element         id=filter
    # Name Sort
    Input Text                          id=temporary                                                            Reyes
    Click Element                       id=filter
    Element Text Should Be              css=.card-title                                                         Reyes, Elmer
    # Monday Filter
    Select From List By Index           id=availablity                                                          1
    Click Element                       id=filter
    Element Text Should Be              css=.card:nth-child(1) .card-title                                      Albana, Natalio
    Element Text Should Be              css=.card:nth-child(4) .card-title                                      Bernardo, Orlando
    # Tuesday Filter
    Select From List By Index           id=availablity                                                          2
    Click Element                       id=filter
    Element Text Should Be              css=.card-title                                                         Reyes, Elmer
    # Wednesday Filter
    Select From List By Index           id=availablity                                                          3
    Click Element                       id=filter
    Element Text Should Be              css=.card:nth-child(1) .card-title                                      Bones, James
    Element Text Should Be              css=.card:nth-child(4) .card-title                                      Capito, Roland
    # Thursday Filter
    Select From List By Index           id=availablity                                                          4
    Click Element                       id=filter
    Element Text Should Be              css=.card:nth-child(1) .card-title                                      Albana, Natalio
    Element Text Should Be              css=.card:nth-child(4) .card-title                                      Bernardo, Orlando
    # Friday Filter
    Select From List By Index           id=availablity                                                          5
    Click Element                       id=filter
    Element Text Should Be              css=.card:nth-child(1) .card-title                                      Arcadio, Ramon
    Element Text Should Be              css=.card:nth-child(4) .card-title                                      Jailt, Rekta
    # Saturday Filter
    Select From List By Index           id=availablity                                                          6
    Click Element                       id=filter
    Element Text Should Be              css=.card:nth-child(1) .card-title                                      Arcadio, Ramon
    Element Text Should Be              css=.card:nth-child(4) .card-title                                      Taeyang, Eyes Nose Lips
    # Sunday Filter
    Select From List By Index           id=availablity                                                          7
    Click Element                       id=filter
    Element Text Should Be              css=.card-title                                                         Bernardo, Orlando
    # Anesthesiology Filter
    Select From List By Index           id=specialization                                                       1
    Click Element                       id=filter
    Element Text Should Be              css=.card-title                                                         Bernardo, Orlando
    Element Text Should Be              css=.card-text:nth-child(2)                                             Anesthesiology
    # Dental Medicine Filter
    Select From List By Index           id=specialization                                                       2
    Click Element                       id=filter
    Element Text Should Be              css=.card-title                                                         Dela Cruz, Juan
    Element Text Should Be              css=.card-text:nth-child(2)                                             Dental Medicine
    # Dermatology Filter
    Select From List By Index           id=specialization                                                       3
    Click Element                       id=filter
    Element Text Should Be              css=.card-title                                                         Matology, Der
    Element Text Should Be              css=.card-text:nth-child(2)                                             Dermatology
    # Family Medicine Filter
    Select From List By Index           id=specialization                                                       4
    Click Element                       id=filter
    Element Text Should Be              css=.card-title                                                         Reyes, Elmer
    Element Text Should Be              css=.card-text:nth-child(2)                                             Family Medicine
    # Internal Medicine Filter
    Select From List By Index           id=specialization                                                       5
    Click Element                       id=filter
    Element Text Should Be              css=.card-title                                                         Ernal Med, Int
    Element Text Should Be              css=.card-text:nth-child(2)                                             Internal Medicine
    # Laboratory Medicine Filter
    Select From List By Index           id=specialization                                                       6
    Click Element                       id=filter
    Element Text Should Be              css=.card-title                                                         Kita, Lab
    Element Text Should Be              css=.card-text:nth-child(2)                                             Laboratory Medicine
    # Legal Medicine Filter
    Select From List By Index           id=specialization                                                       7
    Click Element                       id=filter
    Element Text Should Be              css=.card-title                                                         Dela Cruz, Lawyer
    Element Text Should Be              css=.card-text:nth-child(2)                                             Legal Medicine
    # Nuclear Medicine Filter
    Select From List By Index           id=specialization                                                       8
    Click Element                       id=filter
    Element Text Should Be              css=.card-title                                                         Dela Cruz, Boom
    Element Text Should Be              css=.card-text:nth-child(2)                                             Nuclear Medicine
    # Obstetrics and Gynecology Filter
    Select From List By Index           id=specialization                                                       9
    Click Element                       id=filter
    Element Text Should Be              css=.card-title                                                         Capito, Roland
    Element Text Should Be              css=.card-text:nth-child(2)                                             Obstetrics and Gynecology
    # Occupational Medicine Filter
    Select From List By Index           id=specialization                                                       10
    Click Element                       id=filter
    Element Text Should Be              css=.card-title                                                         Ol May Trabaho, Sana
    Element Text Should Be              css=.card-text:nth-child(2)                                             Occupational Medicine
    # Ophthalmology Filter
    Select From List By Index           id=specialization                                                       11
    Click Element                       id=filter
    Element Text Should Be              css=.card-title                                                         On You, Eyes
    Element Text Should Be              css=.card-text:nth-child(2)                                             Ophthalmology
    # Orthopedics Filter
    Select From List By Index           id=specialization                                                       12
    Click Element                       id=filter
    Element Text Should Be              css=.card-title                                                         Bones, James
    Element Text Should Be              css=.card-text:nth-child(2)                                             Orthopedics
    # Otorhinolaryngology Filter
    Select From List By Index           id=specialization                                                       13
    Click Element                       id=filter
    Element Text Should Be              css=.card-title                                                         Taeyang, Eyes Nose Lips
    Element Text Should Be              css=.card-text:nth-child(2)                                             Otorhinolaryngology
    # Pediatrics Filter
    Select From List By Index           id=specialization                                                       14
    Click Element                       id=filter
    Element Text Should Be              css=.card-title                                                         Arcadio, Ramon
    Element Text Should Be              css=.card-text:nth-child(2)                                             Pediatrics
    # Radiology Filter
    Select From List By Index           id=specialization                                                       15
    Click Element                       id=filter
    Element Text Should Be              css=.card-title                                                         Tagubat, Xavier
    Element Text Should Be              css=.card-text:nth-child(2)                                             Radiology
    # Rehabilitation Medicine Filter
    Select From List By Index           id=specialization                                                       16
    Click Element                       id=filter
    Element Text Should Be              css=.card-title                                                         Jailt, Rekta
    Element Text Should Be              css=.card-text:nth-child(2)                                             Rehabilitation Medicine
    # Surgery Filter
    Select From List By Index           id=specialization                                                       17
    Click Element                       id=filter
    Element Text Should Be              css=.card-title                                                         Albana, Natalio
    Element Text Should Be              css=.card-text:nth-child(2)                                             Surgery
    # Invalid Surname
    Input Text                          id=temporary                                                            Asdfghjkl
    Click Element                       id=filter
    Element Text Should Be              css=.alert                                                              No doctor/s were found matching your filter request. Please try again.
    # Filter All
    Click Element                       id=filter
    Click Element                       css=.card:nth-child(1) > .card-body .btn
    Element Text Should Be              id=exampleModalLabel                                                    Albana's Schedule(Department of Surgery)
    Click Element                       css=#a5fd721be0c8b580d5312144b .btn
    # Filter Existing doctor through Availability
    Input Text                          id=temporary                                                            Albana
    Select From List By Index           id=availablity                                                          4
    Click Element                       id=filter
    Element Text Should Be              css=.card-title                                                         Albana, Natalio
    Element Text Should Be              css=.card-text:nth-child(2)                                             Surgery
    # Filter Existing doctor through Availability and Specialization
    Select From List By Index           id=specialization                                                       17
    Select From List By Index           id=availablity                                                          1
    Click Element                       id=filter
    Element Text Should Be              css=.card-title                                                         Albana, Natalio
    Element Text Should Be              css=.card-text:nth-child(2)                                             Surgery
    # Check Add Doctor Button
    Page Should Contain Element         css=.ml-auto > .nav-item:nth-child(1) > .nav-link
    # Check Edit and Delete button
    Mouse Over                          css=.card:nth-child(1) .dropdown > .fas
    Element Should Be Visible           link=Edit
    Element Should Be Visible           link=Delete
    [Teardown]  Close Browser
