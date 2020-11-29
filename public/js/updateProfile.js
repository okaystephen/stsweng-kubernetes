$(document).ready(function() {
 
    /* jquery.validate plagin added using cdn. Go to jqueryvalidation.org to see what methods are provided */
    /* Create custom validation method */
    jQuery.validator.addMethod("notEqual", function(value, element, param) {
        return this.optional(element) || value != $(param).val();
    }, "Phone Number and Emergency Contact Number should not match.");
       
  
    $("#updateProfile").validate({
        rules: {
            homeAdd: {
                required: true,
            },
            phone: {
                required: true,
                pattern: /^[0]{1}[9]{1}[0-9]{9}$/
            },
            eContactPerson: {
                required: true,
                pattern: /^[A-Za-z\s]+$/
            },
            relationship: {
                required: true
            },
            eContactNum: {
                required: true,
                pattern: /^[0]{1}[9]{1}[0-9]{9}$/,
                notEqual: "#phone"
            },
            password: {
                minlength: 8,
            },
            passwordConfirm: {
                equalTo: "#password"
            }

        },
    // Custom message for error
        messages: {
            homeAdd: {
                required: "Home Address is required.",
            },
            phone: {
                required: "Please enter a valid PH number.",
                pattern: "Please enter a valid PH number"
            },
            eContactPerson: {
                required: "Contact Person Name is required.",
                pattern: "Contact Person Name should not contain number/s."
            },
            relationship: {
                required: "Empty Field."
            },
            eContactNum: {
                required: "Please enter a valid PH number.",
                pattern: "Please enter a valid PH number."
            },
            password: {
                required: "Please enter a password.",
                minlength: "Password should contain at least 8 characters."
            },
            passwordConfirm: {
                equalTo: "Passwords do not match."
            }
        },
        highlight: function(element, errorClass) {
            $(element).closest(".form-group").addClass("has-error");
        },
        unhighlight: function(element, errorClass) {
            $(element).closest(".form-group").removeClass("has-error");
        },
        errorPlacement: function (error, element) {
            error.appendTo(element.parent().next());
        },
    });

    $('#Others').on('change',function() {
        if(this.checked){
            $('#other_error').text('Empty field.');
            $('#medhistsave').prop('disabled',true);

            $('#medprob_other').keyup(function(){
                var other = $('#medprob_other').val()
               
                if(other == ''){
                    $('#other_error').text('Empty field.');
                    $('#medhistsave').prop('disabled',true);
                }
        
                else{
                    $('#other_error').text('');
                    $('#medhistsave').prop('disabled',false);
                }
            });
        }
        else{
            $('#other_error').text('');
            $('#medhistsave').prop('disabled',false);
        }
    })

});
    