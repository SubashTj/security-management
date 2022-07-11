export const APP_VARIABLES = {
    payKey:'rzp_test_XAwbRDSItDjjI0',
    userId: 'USERID',
    adminProfile: 'ADMINPROFILE',
    isAccountCreated: 'ACCOUNTCREATED',
    login: 'LOGIN',
    table: {
        filtering: {
            pageSizeOptions: [10, 25, 50],
        }
    },

    config: {
        lang: 'TGLANG',
        dateFormat: 'TGDATEFORMAT',
        dateRawFormat: 'TGDATERAW',
        dateSep: 'TGDATESEP',
        timeFormat: 'TGTIMEFORMAT',
        themeColor: 'TGTHEME',
        themeFont: 'TGFONT',
        studentId: 'STUDENTID', // for parent portal
        academicId : 'ACADEMICYEARID',// for teacher portal
        batchId : 'BATCHID',// for teacher portal
        academicName : 'ACADEMICNAME',// for teacher portal
        batchName : 'BATCHNAME',// for teacher portal
    },

    validators: {
        image: /(.*?)\.(jpg|jpeg|png)$/,
        integer: /^-?(0|[1-9]\d*)?$/,
        decimalTwoDigitOnly: /^\d{1,1000}(\.\d{1,2})?$/, // allows plus value and two digit
        decimal: /^\-?(\d+\.?\d*|\d*\.?\d+)$/, // allows + or - values 
        sixDigitInteger: /^[0-9]{1,6}$/,
        tenDigitInteger: /^[0-9]{10}$/,
        aadharNo: /^[0-9]{12}$/,
        alphaNumeric: /^[0-9a-zA-Z]+$/, // RSDFS3454fgfet 
        lettersOnly: /^[A-Za-z]+$/, // ABCabcRtvd
        imageAndPdf : /(.*?)\.(jpg|jpeg|png|bmp|pdf)$/,
        removeWhitespace : /^[^ ][\w\W ]*[^ ]/ 
    }




}