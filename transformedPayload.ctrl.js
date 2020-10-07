let methods = {};

methods.transformJsonData = (mainObj) => {
    try {
        let { payload, referenceData } = mainObj;
        let values = payload.value;
        let finalResp = changeFormat(values, referenceData);
        return finalResp;
    } catch (err) {
        console.log('ERROR++++', err);
        return err;
    }

};

function changeFormat(values, referenceData) {
    values.forEach((value) => {
        if (typeof value.value == 'string') {
            findAndReplace(value, referenceData)
        } else {
            // console.log('else', value.value)
            changeFormat(value.value, referenceData);
        }
    });
    return values
};

function findAndReplace(value, referenceData) {
    let mainval = value.value;
    let val = mainval.split('{').pop().split('}')[0];
    //console.log('Val+++', val)
    //val = val.replace(/\}/g, "");
    if (val in referenceData) {
        value.value = value.value.replace(`{${val}}`, referenceData[val])
    };
    return;
};

module.exports = methods;