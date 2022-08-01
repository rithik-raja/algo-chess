const textStyle = (obj = {}, devices = [true, false, false]) => ({
    fontSize: devices[0] ? "30px" : devices[1] ? "25px" : "20px",
    fontWeight: 100,
    color: "mintcream",
    margin: "0px 0px 0px 0px",
    ...obj
})

const flexStyle = (obj = {}) => ({
    display: "flex",
    ...obj
})

export {textStyle, flexStyle}