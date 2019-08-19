var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    ID: { type: Number },
    UserName: { type: String },
    UserNum: { type: String },  // 工号
    Name: { type: String },     // 姓名
    NameSM: { type: String },
    Sex: { type: String },
    DepNum: { type: Number },
    DepName: { type: String },
    DepName0: { type: String },
    DepName1: { type: String },
    DepName2: { type: String },
    DepName3: { type: String },
    PlaceName: { type: String },
    HigherMan: { type: String },
    HigherManID: { type: Number },
    ZipCode: { type: Number },
    OfficePlace: { type: String },
    RoomNum: { type: String },
    OfficeAddress: { type: String },
    HandPhone: [{ type: String }],
    OfficePhoneMain: { type: String },
    OfficePhoneSplit: { type: String },
    OfficeFax: { type: String },
    FaxNum: { type: String },
    EmailMain: { type: String },
    EmailSplit: { type: String },
    OnLineState: { type: String },
    EditTime: { type: Date },
    EditMan: { type: String },
    QQ: { type: Object },
    Avatar: { type: String },
    LinkManID: { type: String }
});

module.exports = mongoose.model('user', userSchema);