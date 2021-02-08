*** Settings ***

Library    SeleniumLibrary

*** Variables ***
${SERVER}       localhost:3001
${BROWSER}      Chrome
${URL}   http://${SERVER}/
${DELAY}        0.2

*** Keywords ***
Open Website to Sign Up Page
    Open Browser                         ${URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed                   ${DELAY}
    Go to Sign Up Page

Go to Sign Up Page
    Click Element    link=Sign Up
    
Input Email
    [Arguments]    ${email}
    Input Text     id=email    ${email}

Input Password
    [Arguments]    ${password}
    Input Text     id=password    ${password}

Input Confirm Password
    [Arguments]    ${cpassword}
    Input Text     id=passwordConfirm    ${cpassword}

Input First Name
    [Arguments]    ${firstname}
    Input Text     id=fname    ${firstname}

Input Last Name
    [Arguments]    ${lastname}
    Input Text     id=lname    ${lastname}

Input Middle Name
    [Arguments]    ${middlename}
    Input Text     id=mname    ${middlename}

Input Home Address
    [Arguments]    ${address}
    Input Text     id=homeAdd    ${address}

Input Birthday
    [Arguments]    ${date}
    Input Text     id=date       ${date}

Input Phone Number
    [Arguments]    ${phone}
    Input Text     id=phone    ${phone}

Select Sex
    Click Element    id=Female

Input Emergency Contact Person
    [Arguments]    ${name}
    Input Text     id=eContactPerson    ${name}

Input Emergency Contact Person Number
    [Arguments]    ${phone}
    Input Text     id=eContactNum    ${phone}

Input Relationship
    [Arguments]    ${rel}
    Input Text     id=relationship    ${rel}

*** Test Cases ***
Valid Sign Up
    Open Website to Sign Up Page
    Input Email    sample2@gmail.com
    Input Password    sample123
    Input Confirm Password    sample123
    Input First Name    First
    Input Last Name    Last
    Input Middle Name    Middle
    Input Home Address    123, Sample Address
    Input Birthday    04182001
    Input Phone Number    09171231234
    Select Sex
    Input Emergency Contact Person    eFirst eLast
    Input Emergency Contact Person Number    09173214321
    Input Relationship    Mother
    Click Button    id=signupbtn
    Element Text Should Be    css=p:nth-child(2)    Here's an overview of your account.

Blank Sign Up
    Open Website to Sign Up Page
    Click Button    id=signupbtn
    Element Text Should Be    css=.form-group:nth-child(1) > p    Please enter a valid email address.

Duplicate Phone Number
    Open Website to Sign Up Page
    Input Email    sample777@gmail.com
    Input Password    sample123
    Input Confirm Password    sample123
    Input First Name    First
    Input Last Name    Last
    Input Middle Name    Middle
    Input Home Address    123, Sample Address
    Input Birthday    04182001
    Input Phone Number    09171231234
    Select Sex
    Input Emergency Contact Person    eFirst eLast
    Input Emergency Contact Person Number    09171231234
    Input Relationship    Mother
    Click Button    id=signupbtn
    Element Text Should Be    css=.col-7 > p    Phone Number and Emergency Contact Number should not match.

Duplicate Email
    Open Website to Sign Up Page
    Input Email    sample2@gmail.com
    Input Password    sample123
    Input Confirm Password    sample123
    Input First Name    First
    Input Last Name    Last
    Input Middle Name    Middle
    Input Home Address    123, Sample Address
    Input Birthday    04182001
    Input Phone Number    09171231233
    Select Sex
    Input Emergency Contact Person    eFirst eLast
    Input Emergency Contact Person Number    09171231234
    Input Relationship    Mother
    Click Button    id=signupbtn
    Element Text Should Be    css=.form-group:nth-child(1) > p    Email address is already in use.

