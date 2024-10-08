module.exports = () => {
    console.log('Options:');
    console.log('\t--help');
    console.log('\t\tShow help');
    console.log('');
    console.log('\t--status');
    console.log('\t\tenum');
    console.log('\t\t"down" "up"');
    console.log('\t\tUptime check status');
    console.log('');
    console.log('\t--page');
    console.log('\t\tinteger <int32> >= 1');
    console.log('\t\tDefault: 1');
    console.log('\t\tPage of results');
    console.log('');
    console.log('\t--limit');
    console.log('\t\tinteger <int32> [ 1 .. 100 ]');
    console.log('\t\tDefault: 25');
    console.log('\t\tThe number of uptime checks to return per page');
    console.log('');
    console.log('\t--tags');
    console.log('\t\tstring');
    console.log('\t\tComma separated list of tags assocaited with a check');
    console.log('');
    console.log('\t--matchany');
    console.log('\t\tboolean');
    console.log('\t\tDefault: false');
    console.log('\t\tInclude uptime checks in response that match any specified tag or all tags. This parameter does not take a value. The absence of this paratemer equates to false whilst the presence of thie paramerter equates to true.');
    console.log('');
    console.log('\t--nouptime');
    console.log('\t\tboolean');
    console.log('\t\tDefault: false');
    console.log('\t\tDo not calculate uptime percentages for results. This parameter does not take a value. The absence of this paratemer equates to false whilst the presence of thie paramerter equates to true.');
}
