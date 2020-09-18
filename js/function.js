// funcrion declaration
// function whatDoYouDo(job,firstname){}

// function expression
var whatDoYouDo = function(job,firstname) {
    switch (job) {
        case 'teacher':
            return firstname + ' teach u how to code';
        case 'driver':
            return firstname + ' drive taxi';
        case 'designer':
            return firstname + ' design beautiful website';
        default:
            return firstname + ' does something else'
            break;
    }
}



console.log(whatDoYouDo())