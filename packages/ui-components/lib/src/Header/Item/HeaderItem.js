"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorous_1 = require("glamorous");
var Container = glamorous_1.default.div(function (_a) {
    var theme = _a.theme, active = _a.active;
    var opacity = 0.1;
    var activeBackground = "rgba(0, 0, 0, " + opacity * 2 + ")";
    return {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing / 4 + "px " + theme.spacing / 2 + "px",
        minHeight: 32,
        borderRadius: 2,
        cursor: "pointer",
        transition: ".1s background-color ease, .05s transform ease",
        userSelect: "none",
        backgroundColor: active ? activeBackground : "transparent",
        ":hover": {
            backgroundColor: "rgba(0, 0, 0, " + opacity + ")"
        },
        "& + &": {
            marginLeft: theme.spacing / 2
        },
        "& > svg": {
            width: 16,
            marginRight: theme.spacing / 2
        }
    };
});
var HeaderItem = function (_a) {
    var style = _a.style, className = _a.className, children = _a.children, onClick = _a.onClick, active = _a.active;
    return (React.createElement(Container, { tabIndex: -1, role: "button", style: style, onClick: onClick, className: className, active: !!active }, children));
};
exports.default = HeaderItem;
//# sourceMappingURL=HeaderItem.js.map