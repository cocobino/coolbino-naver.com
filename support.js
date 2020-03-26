module.exports ={
    regExp : {
        removeComment : new RegExp(/\/\*[\s\S]*?\*\/|\/\/.*/g),
        checkKorean : new RegExp(/[가-힣]/)
    },
    removeComment(str) {
        return str.replace(this.regExp.removeComment, '');
    },
    toArray(str) {
        return str.split('\n');
    },
    checkLiteral(str) {
        if((this.regExp.checkKorean).test(str)) return true;
        return false;
    },
    booleanArr(len) {
        let tmpList = new Array(len);
        tmpList.fill(false);

        return tmpList;
    },
    createErrorList(path, list, errorIdx) {
        let tmpList = [(path)];
        errorIdx.forEach((element, idx) => {
            element ? tmpList.push(`${idx} : `+list[idx]) : '';
        });
        tmpList.push('=============================================================================');
        // console.log(tmpList);

        return tmpList;
    }
};