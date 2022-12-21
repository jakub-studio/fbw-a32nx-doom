class CDU_DOOMFORK_DoomLoadPage {
    static ShowPage(mcdu) {
        mcdu.clearDisplay();
        mcdu.page.Current = mcdu.page.DoomGameLoad;

        mcdu.setTemplate(FormatTemplate([
            [new Column(7, "DOOM LOADER")],
            [""],
            [new Column(4, "DOOM 1993", Column.big, Column.red)],
            [""],
            [new Column(4, "All rights belong to")],
            [""],
            [new Column(4, "their respective owners.")],
            [""],
            [""],
            [""],
            ["test","abc","123"],
            [""],
        ]));

        mcdu.setScratchpadMessage(NXFictionalMessages.emptyMessage);

    }
}
