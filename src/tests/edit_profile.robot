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

Edit Address
    [Arguments]           ${address}
    Clear Element Text    id=homeAdd
    Input Text            id=homeAdd    ${address}

Edit Phone Number
    [Arguments]           ${phone}
    Clear Element Text    id=phone
    Input Text            id=phone    ${phone}

Edit Name of Emergency Contact Person
    [Arguments]           ${ename}
    Clear Element Text    id=eContactPerson
    Input Text            id=eContactPerson    ${ename}

Edit Relationship
    [Arguments]           ${relationship}
    Clear Element Text    id=relationship
    Input Text            id=relationship    ${relationship}

Edit Emergency Contact Person Number
    [Arguments]           ${phone}
    Clear Element Text    id=eContactNum
    Input Text            id=eContactNum    ${phone}

Edit Password
    [Arguments]           ${password}
    Clear Element Text    id=password
    Input Text            id=password    ${password}

Edit Confirm Password
    [Arguments]           ${password}
    Clear Element Text    id=passwordConfirm
    Input Text            id=passwordConfirm    ${password}

Restore Profile
    Click Element                             css=div:nth-child(2) > center > .btn
    Edit Address                             123, Sample Address
    Edit Phone Number                        09171231234
    Edit Name of Emergency Contact Person    eFirst eLast
    Edit Relationship                        Mother
    Edit Emergency Contact Person Number     09173214321
    Edit Password                            sample123
    Edit Confirm Password                    sample123
    Click Button                             id=profile-saveChanges

*** Test Cases ***
Successful Edit Profile
    Open Website
    Successful Login    sample2@gmail.com    sample123
    Click Element        css=.ml-auto > .nav-item:nth-child(1) > .nav-link
    Click Button         css=div:nth-child(2) > center > .btn
    Edit Address    123, Edited Address
    Edit Phone Number    09175556666
    Edit Name of Emergency Contact Person    Edited Name
    Edit Relationship    Father
    Edit Emergency Contact Person Number    09176665555
    Edit Password    sample321
    Edit Confirm Password    sample321
    Click Button    id=profile-saveChanges
    Element Text Should Be    css=.row:nth-child(3) > .pl-2 > p    09175556666
    Restore Profile

Blank Edit Profile
    Open Website
    Successful Login    sample2@gmail.com    sample123
    Click Element         css=.ml-auto > .nav-item:nth-child(1) > .nav-link
    Click Element         css=div:nth-child(2) > center > .btn
    Clear Element Text    id=homeAdd
    Clear Element Text    id=phone
    Clear Element Text    id=eContactPerson
    Clear Element Text    id=relationship
    Clear Element Text    id=eContactNum
    Clear Element Text    id=password
    Clear Element Text    id=passwordConfirm
    Click Button          id=profile-saveChanges
    Element Text Should Be    id=homeAdd-error    Home Address is required.

Mismatching Passwords
    Open Website
    Successful Login    sample2@gmail.com    sample123
    Click Element        css=.ml-auto > .nav-item:nth-child(1) > .nav-link
    Click Button         css=div:nth-child(2) > center > .btn
    Edit Address        123, Edited Address
    Edit Phone Number    09175556666
    Edit Name of Emergency Contact Person    Edited Name
    Edit Relationship    Father
    Edit Emergency Contact Person Number    09176665555
    Edit Password    sample321
    Edit Confirm Password    sample123
    Click Button    id=profile-saveChanges
    Element Text Should Be    id=passwordConfirm-error    Passwords do not match.

