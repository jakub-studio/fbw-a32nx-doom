class CDU_DOOMFORK_DoomLoadPage {
    static ShowPage(mcdu) {
        mcdu.clearDisplay();
        mcdu.activeSystem = 'DOOM';
        mcdu.page.Current = mcdu.page.DoomGameLoad;

        mcdu.setTemplate(FormatTemplate([
            [new Column(0, "DOOM LOADER", Column.small)],
            [""],
            [new Column(2, "DOOM 1997", Column.red)],
            [""],
            [new Column(2, "ALL RIGHTS BELONG TO")],
            [""],
            [new Column(2, "ID SOFTWARE.")],
            [""],
            [""],
            [""],
            [new Column(23, "LOAD>", Column.green, Column.right)],
            [""],
            [new Column(0, "<RETURN", Column.cyan)]
        ]));

        mcdu.setScratchpadMessage(NXFictionalMessages.emptyMessage);

        mcdu.rightInputDelay[4] = () => {
            return mcdu.getDelaySwitchPage();
        };
        mcdu.onRightInput[4] = () => {
            CDU_DOOMFORK_DoomGame.ShowPage(mcdu);
        };

        mcdu.leftInputDelay[5] = () => {
            return mcdu.getDelaySwitchPage();
        };
        mcdu.onLeftInput[5] = () => {
            CDUMenuPage.ShowPage(mcdu);
        };
    }
}
